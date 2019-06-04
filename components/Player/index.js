import React from 'react';
import { findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';
import ReactPlayer from 'react-player';
import { merge, get, throttle } from 'lodash';
import screenfull from 'screenfull';
import moment from 'moment';
import IconButton from '../IconButton';
import Slider from '../Slider';
import Switch from '../Switch';
import Icon from '../Icon';
import Text from '../Text';
import getFileInDirection from '../../lib/get-file-in-direction';
import { settingsReplace } from '../../actions/settings';
import { filesGetUrl } from '../../actions/files';
import { colors, fontSizes } from '../../lib/styling';
import styles from './styles';

const prepareFile = throttle(callback => callback(), 10000, { leading: true });

class Player extends React.Component {
  static getDerivedStateFromProps(nextProps, prevState) {
    const oldPath = get(prevState, 'path');
    const path = get(nextProps, 'settings.player.file.path');

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
    const { settings, filesGetUrl } = this.props;
    const { path } = this.state;
    const source = get(settings, 'player.source');
    const playing = get(settings, 'player.playing');
    const isConnected = get(settings, 'isConnected');
    const isConnectedPrev = get(prevProps.settings, 'isConnected');

    if (isConnected !== isConnectedPrev && playing && source && path) {
      filesGetUrl({ source, path, shouldPlay: true });
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
    const {
      files,
      settings,
      settingsReplace,
      filesGetUrl,
      playlists,
    } = this.props.store;
    const { player } = settings;
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
      className: 'player',
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
              source,
              ...getFileInDirection(settings, files, playlists),
            }),
          );
        }
      },
      onEnded: () =>
        filesGetUrl({
          ...getFileInDirection(
            this.props.settings,
            files,
            playlists,
            random ? 'random' : 'next',
          ),
          source,
          shouldPlay: true,
        }),
      // eslint-disable-next-line react/no-find-dom-node
      onClick: () => screenfull.request(findDOMNode(this.player)),
    };
    const loopButton = (
      <Switch
        className="loop"
        checkedChildren={<Icon icon="loop" />}
        unCheckedChildren={<Icon icon="loop" />}
        checked={loop}
        onChange={() =>
          settingsReplace(
            merge({}, settings, {
              player: { loop: !loop },
            }),
          )
        }
      />
    );
    const shuffleButton = (
      <Switch
        className="shuffle"
        checkedChildren={<Icon icon="shuffle" />}
        unCheckedChildren={<Icon icon="shuffle" />}
        checked={random}
        onChange={() =>
          settingsReplace(
            merge({}, settings, {
              player: { random: !random },
            }),
          )
        }
      />
    );
    const divider = <Text className="divider"> - </Text>;

    return (
      <div className={`container ${type || ''}`}>
        <style jsx>{styles}</style>
        <ReactPlayer {...config} />
        <div className="main">
          <div className="info">
            {path ? (
              <>
                <Text className="name">{name}</Text>
                {category && (
                  <Text>
                    {divider}
                    {category}
                  </Text>
                )}
                {artist && (
                  <Text>
                    {divider}
                    {artist}
                  </Text>
                )}
                {album && (
                  <Text>
                    {divider}
                    {album}
                  </Text>
                )}
              </>
            ) : (
              <Text>Add credentials and play some media</Text>
            )}
          </div>
          <div className="directions">
            {loopButton}
            <div className="buttons">
              <IconButton
                size="large"
                onClick={() =>
                  filesGetUrl({
                    ...getFileInDirection(
                      settings,
                      files,
                      playlists,
                      random ? 'random' : 'previous',
                    ),
                    source,
                    shouldPlay: true,
                  })
                }
              >
                <Icon fontSize={fontSizes.a4} icon="fast-backward" />
              </IconButton>
              <IconButton
                size="large"
                loading={loading}
                onClick={() => {
                  if (!playing) {
                    filesGetUrl({ source, path, shouldPlay: true });
                  }

                  settingsReplace(
                    merge({}, settings, {
                      player: { playing: !playing },
                    }),
                  );
                }}
              >
                <Icon
                  fontSize={fontSizes.a4}
                  icon={playing ? 'pause' : 'play'}
                />
              </IconButton>
              <IconButton
                size="large"
                onClick={() =>
                  filesGetUrl({
                    ...getFileInDirection(
                      settings,
                      files,
                      playlists,
                      random ? 'random' : 'next',
                    ),
                    source,
                    shouldPlay: true,
                  })
                }
              >
                <Icon fontSize={fontSizes.a4} icon="fast-forward" />
              </IconButton>
            </div>
            {shuffleButton}
          </div>
          <div className="sound">
            <div className="switches">
              {shuffleButton}
              {loopButton}
              <Switch
                color={colors.a3}
                checkedChildren={<Icon icon="volume" />}
                unCheckedChildren={<Icon icon="mute" />}
                checked={!muted}
                onChange={() =>
                  settingsReplace(
                    merge({}, settings, {
                      player: { muted: !muted },
                    }),
                  )
                }
              />
            </div>
            <Slider
              className="volume"
              color={colors.a3}
              value={volume}
              min={0}
              max={1}
              step={0.01}
              tipFormatter={volume => `Volume: ${Math.round(volume * 100)}%`}
              onChange={volume =>
                settingsReplace(
                  merge({}, settings, {
                    player: { volume },
                  }),
                )
              }
            />
          </div>
          <div className="progress">
            <Slider
              value={played}
              min={0}
              max={1}
              step={0.01}
              tipFormatter={() =>
                moment(
                  // eslint-disable-next-line no-underscore-dangle
                  moment.duration(playedSeconds, 'seconds')._data,
                ).format('mm:ss')
              }
              onChange={progress => this.player.seekTo(progress)}
            />
          </div>
        </div>
      </div>
    );
  }
}

Player.propTypes = {
  files: PropTypes.array.isRequired,
  settings: PropTypes.object.isRequired,
  settingsReplace: PropTypes.func.isRequired,
  filesGetUrl: PropTypes.func.isRequired,
  playlists: PropTypes.array.isRequired,
};

export default Player;
