import React from 'react';
import { findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';
import ReactPlayer from 'react-player';
import { get, throttle } from 'lodash';
import screenfull from 'screenfull';
import moment from 'moment';
import Button from '../Button';
import Slider from '../Slider';
import Switch from '../Switch';
import Text from '../Text';
import getFileInDirection from '../../lib/get-file-in-direction';
import { filesGetUrl } from '../../lib/actions/files';
import { colors } from '../../lib/styling';
import styles from './styles';

const prepareFile = throttle(callback => callback(), 10000, { leading: true });
const Divider = () => <Text css={styles.divider}> - </Text>;

class Player extends React.Component {
  static getDerivedStateFromProps(nextProps, prevState) {
    const oldPath = get(prevState, 'path');
    const path = get(nextProps, 'store.player.file.path');

    if (oldPath !== path) {
      return {
        played: 0,
        playedSeconds: 0,
        path,
      };
    }

    return null;
  }

  constructor(props) {
    super(props);
    this.state = {
      path: undefined,
      played: 0,
      playedSeconds: 0,
      isFullscreen: false,
    };
  }

  componentDidMount() {
    screenfull.on('change', () => this.setIsFullscreen());
  }

  componentDidUpdate(prevProps) {
    const { store, dispatch } = this.props;
    const { path } = this.state;
    const {
      player: { source, playing },
      cloud: { isConnected },
    } = store;
    const isConnectedPrev = get(prevProps, 'store.cloud.isConnected');

    if (isConnected !== isConnectedPrev && playing && source && path) {
      filesGetUrl({ dispatch, store, source, path, shouldPlay: true });
    }
  }

  componentWillUnmount() {
    screenfull.off('change', () => this.setIsFullscreen());
  }

  setIsFullscreen() {
    this.setState({ isFullscreen: screenfull.isFullscreen });
  }

  render() {
    const { played, playedSeconds, path, isFullscreen } = this.state;
    const { dispatch, store } = this.props;
    const { files, player, playlists, lists } = store;
    const {
      source,
      volume,
      playing,
      loading,
      muted,
      random,
      file = {},
      loop,
    } = player;
    const { url, album, artist, name, type, category } = file;
    const config = {
      css: styles.player,
      loop,
      muted,
      width: type === 'video' ? 124 : 0,
      height: type === 'video' ? 70 : 0,
      progressInterval: 1000,
      playsinline: true,
      controls: isFullscreen,
      volume,
      playing,
      url,
      ref: ref => {
        this.player = ref;
      },
      onDuration: () => this.player.seekTo(played),
      onProgress: ({ played, playedSeconds }) => {
        this.setState({ played, playedSeconds });

        // Get next link once 90% of media is over
        if (playing && played > 0.9) {
          prepareFile(() =>
            filesGetUrl({
              dispatch,
              store,
              ...getFileInDirection({ player, lists, files, playlists }),
              source,
            }),
          );
        }
      },
      onEnded: () =>
        filesGetUrl({
          dispatch,
          store,
          ...getFileInDirection({
            player,
            lists,
            files,
            playlists,
            direction: random ? 'random' : 'next',
          }),
          source,
          shouldPlay: true,
        }),
      // eslint-disable-next-line react/no-find-dom-node
      onClick: () => screenfull.request(findDOMNode(this.player)),
    };
    const LoopButton = props => (
      <Switch
        checkedIcon="loop"
        unCheckedIcon="loop"
        checked={loop}
        onChange={() =>
          dispatch({ type: 'player-update', payload: ['loop', !loop] })
        }
        {...props}
      />
    );
    const ShuffleButton = props => (
      <Switch
        checkedIcon="shuffle"
        unCheckedIcon="shuffle"
        checked={random}
        onChange={() =>
          dispatch({ type: 'player-update', payload: ['random', !random] })
        }
        {...props}
      />
    );

    return (
      <div css={styles.root}>
        <ReactPlayer {...config} />
        <div css={styles.main}>
          <div css={styles.info}>
            {path ? (
              <>
                <Text fontWeight="bold" css={styles.name}>
                  {name}
                </Text>
                {category && (
                  <Text>
                    <Divider />
                    {category}
                  </Text>
                )}
                {artist && (
                  <Text>
                    <Divider />
                    {artist}
                  </Text>
                )}
                {album && (
                  <Text>
                    <Divider />
                    {album}
                  </Text>
                )}
              </>
            ) : (
              <Text>Add credentials and play some media</Text>
            )}
          </div>
          <div css={styles.directions}>
            <LoopButton css={styles.loopDirections} />
            <div css={styles.buttons}>
              <Button
                shape="circle"
                icon="fast-backward"
                onClick={() =>
                  filesGetUrl({
                    dispatch,
                    store,
                    ...getFileInDirection({
                      player,
                      lists,
                      files,
                      playlists,
                      direction: random ? 'random' : 'previous',
                    }),
                    source,
                    shouldPlay: true,
                  })
                }
              />
              <Button
                shape="circle"
                icon={playing ? 'pause' : 'play'}
                loading={loading}
                onClick={() => {
                  if (!playing) {
                    filesGetUrl({
                      dispatch,
                      store,
                      source,
                      path,
                      shouldPlay: true,
                    });
                  }

                  dispatch({
                    type: 'player-update',
                    payload: ['playing', !playing],
                  });
                }}
              />
              <Button
                shape="circle"
                icon="fast-forward"
                onClick={() =>
                  filesGetUrl({
                    dispatch,
                    store,
                    ...getFileInDirection({
                      player,
                      lists,
                      files,
                      playlists,
                      direction: random ? 'random' : 'next',
                    }),
                    source,
                    shouldPlay: true,
                  })
                }
              />
            </div>
            <ShuffleButton css={styles.shuffleDirections} />
          </div>
          <div css={styles.sound}>
            <div css={styles.switches}>
              <ShuffleButton css={styles.shuffleSound} />
              <LoopButton css={styles.loopSound} />
              <Switch
                color={colors.c}
                checkedIcon="volume"
                unCheckedIcon="mute"
                checked={!muted}
                onChange={() =>
                  dispatch({
                    type: 'player-update',
                    payload: ['muted', !muted],
                  })
                }
              />
            </div>
            <Slider
              color={colors.c}
              value={volume}
              min={0}
              max={1}
              tip={`Volume: ${Math.round(volume * 100)}%`}
              onChange={volume =>
                dispatch({
                  type: 'player-update',
                  payload: ['volume', volume],
                })
              }
            />
          </div>
          <Slider
            css={styles.progress}
            value={played}
            min={0}
            max={1}
            step={0.01}
            tip={moment(
              // eslint-disable-next-line no-underscore-dangle
              moment.duration(playedSeconds, 'seconds')._data,
            ).format('mm:ss')}
            onChange={progress => this.player.seekTo(progress)}
          />
        </div>
      </div>
    );
  }
}

Player.propTypes = {
  store: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default Player;
