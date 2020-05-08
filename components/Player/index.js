import React, { useState, useEffect, useRef } from 'react';
import { Dimensions, View } from 'react-native';
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
import getStyles from './get-styles';

const prepareFile = throttle((callback) => callback(), 10000, {
  leading: true,
});

const Player = ({ dispatch, store }) => {
  const [played, playedSet] = useState(0);
  const [playedSeconds, playedSecondsSet] = useState(0);
  const [isFullscreen, isFullscreenSet] = useState(false);
  const playerRef = useRef(null);

  const path = get(store, 'player.file.path');

  useEffect(() => {
    playedSet(0);
    playedSecondsSet(0);
  }, [path]);

  useEffect(() => {
    const setIsFullscreen = () => isFullscreenSet(screenfull.isFullscreen);
    screenfull.on('change', () => setIsFullscreen());

    return () => {
      screenfull.off('change', () => setIsFullscreen());
    };
  });

  const dimensions = Dimensions.get('window');
  const { styles, player: playerStyles } = getStyles(dimensions);
  const Divider = () => <Text style={styles.divider}> - </Text>;
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
    style: playerStyles,
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
    ref: playerRef,
    onDuration: () => playerRef.current.seekTo(played),
    onProgress: ({ played, playedSeconds }) => {
      playedSet(played);
      playedSecondsSet(playedSeconds);

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
    onClick: () => screenfull.request(findDOMNode(playerRef.current)),
  };
  const LoopButton = (props) => (
    <Switch
      checkedIcon="loop"
      unCheckedIcon="loop"
      isOn={loop}
      onValueChange={() =>
        dispatch({ type: 'player-update', payload: ['loop', !loop] })
      }
      {...props}
    />
  );
  const ShuffleButton = (props) => (
    <Switch
      checkedIcon="shuffle"
      unCheckedIcon="shuffle"
      isOn={random}
      onValueChange={() =>
        dispatch({ type: 'player-update', payload: ['random', !random] })
      }
      {...props}
    />
  );

  return (
    <View style={styles.root}>
      <ReactPlayer {...config} />
      <View style={styles.main}>
        <View style={styles.info}>
          {path ? (
            <>
              <Text style={styles.name}>{name}</Text>
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
        </View>
        <View style={styles.directions}>
          <LoopButton style={styles.loopDirections} />
          <View style={styles.buttons}>
            <Button
              size="large"
              shape="circle"
              icon="fast-backward"
              onPress={() =>
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
              size="large"
              shape="circle"
              icon={playing ? 'pause' : 'play'}
              isLoading={loading}
              onPress={() => {
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
              size="large"
              shape="circle"
              icon="fast-forward"
              onPress={() =>
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
          </View>
          <ShuffleButton style={styles.shuffleDirections} />
        </View>
        <View style={styles.sound}>
          <View style={styles.switches}>
            <ShuffleButton style={styles.shuffleSound} />
            <LoopButton style={styles.loopSound} />
            <Switch
              color={colors.c}
              checkedIcon="volume"
              unCheckedIcon="mute"
              isOn={!muted}
              onValueChange={() =>
                dispatch({
                  type: 'player-update',
                  payload: ['muted', !muted],
                })
              }
            />
          </View>
          <Slider
            color={colors.c}
            value={volume}
            min={0}
            max={1}
            tip={`Volume: ${Math.round(volume * 100)}%`}
            onChange={(volume) =>
              dispatch({
                type: 'player-update',
                payload: ['volume', volume],
              })
            }
          />
        </View>
        <Slider
          style={styles.progress}
          value={played}
          min={0}
          max={1}
          step={0.01}
          tip={moment(
            // eslint-disable-next-line no-underscore-dangle
            moment.duration(playedSeconds, 'seconds')._data,
          ).format('mm:ss')}
          onChange={(progress) => playerRef.current.seekTo(progress)}
        />
      </View>
    </View>
  );
};

Player.propTypes = {
  store: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default Player;
