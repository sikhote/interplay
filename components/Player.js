import React from 'react';
import PropTypes from 'prop-types';
import ReactPlayer from 'react-player';
import { merge, get, throttle } from 'lodash';
import { Button, Slider, Switch, Icon, Tooltip } from 'antd';
import moment from 'moment';
import { connect } from 'react-redux';
import style from '../styles/player';
import getFileInDirection from '../lib/getFileInDirection';
import { cloudSaveOther } from '../actions/cloud';
import { settingsReplace } from '../actions/settings';
import { filesGetUrl } from '../actions/files';

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
  state = {
    path: undefined,
    played: 0,
    playedSeconds: 0,
    isFullScreen: true,
  };
  componentDidMount() {
    const { settings, filesGetUrl } = this.props;
    const { path } = this.state;
    const source = get(settings, 'player.source');

    if (source && path) {
      filesGetUrl({ source, path, shouldPlay: true });
    }
  }
  getFileInDirection(direction) {
    const { settings, files } = this.props;
    const source = get(settings, 'player.source');
    const { path } = getFileInDirection(settings, files, direction);
    return { source, path };
  }
  render() {
    const { played, playedSeconds, path, isFullScreen } = this.state;
    const {
      settings,
      settingsReplace,
      settingsReplaceAndCloudSaveOther,
      filesGetUrl,
    } = this.props;
    const { player } = settings;
    const { volume, playing, muted, random, file = {}, loop } = player;
    const { url, album, artist, name, type, category } = file;

    const config = {
      className: 'player',
      loop,
      muted,
      width: 'auto',
      height: 'auto',
      progressInterval: 1000,
      playsinline: !isFullScreen,
      controls: isFullScreen,
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
          prepareFile(() => filesGetUrl(this.getFileInDirection('next')));
        }
      },
      onEnded: () =>
        filesGetUrl({
          ...this.getFileInDirection(random ? 'random' : 'next'),
          shouldPlay: true,
        }),
      onClick: () => this.setState({ isFullScreen: !isFullScreen }),
    };

    return (
      <div
        className={`root ${type || ''} ${isFullScreen ? 'is-full-screen' : ''}`}
      >
        <style jsx>{style}</style>
        <ReactPlayer {...config} />
        <div className="main">
          <div className="directions">
            <Button
              size="large"
              type="primary"
              shape="circle"
              icon="backward"
              onClick={() =>
                filesGetUrl({
                  ...this.getFileInDirection(random ? 'random' : 'previous'),
                  shouldPlay: true,
                })
              }
            />
            <Button
              size="large"
              disabled={!url}
              type="primary"
              shape="circle"
              icon={playing ? 'pause' : 'caret-right'}
              onClick={() =>
                settingsReplaceAndCloudSaveOther(
                  merge({}, settings, {
                    player: { playing: !playing },
                  }),
                )
              }
            />
            <Button
              size="large"
              type="primary"
              shape="circle"
              icon="forward"
              onClick={() =>
                filesGetUrl({
                  ...this.getFileInDirection(random ? 'random' : 'next'),
                  shouldPlay: true,
                })
              }
            />
          </div>
          <div className="control sound">
            <Tooltip placement="top" title="Mute">
              <Switch
                checkedChildren={<Icon type="sound" />}
                unCheckedChildren={<Icon type="sound" />}
                checked={!muted}
                onChange={() =>
                  settingsReplaceAndCloudSaveOther(
                    merge({}, settings, {
                      player: { muted: !muted },
                    }),
                  )
                }
              />
            </Tooltip>
            <Slider
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
          <div className="control progress">
            <Tooltip placement="top" title="Loop">
              <Switch
                checkedChildren={<Icon type="retweet" />}
                unCheckedChildren={<Icon type="retweet" />}
                checked={loop}
                onChange={() =>
                  settingsReplaceAndCloudSaveOther(
                    merge({}, settings, {
                      player: { loop: !loop },
                    }),
                  )
                }
              />
            </Tooltip>
            <Tooltip placement="top" title="Random">
              <Switch
                checkedChildren={<Icon type="question" />}
                unCheckedChildren={<Icon type="question" />}
                checked={random}
                onChange={() =>
                  settingsReplaceAndCloudSaveOther(
                    merge({}, settings, {
                      player: { random: !random },
                    }),
                  )
                }
              />
            </Tooltip>
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
          <div className="info">
            {path
              ? (category ? `${category} — ` : '') +
                (artist ? `${artist} — ` : '') +
                (album ? `${album} — ` : '') +
                name
              : 'Add credentials and play some media'}
          </div>
        </div>
      </div>
    );
  }
} // ${artist} - ${album} - ${name}

Player.propTypes = {
  files: PropTypes.object.isRequired,
  settings: PropTypes.object.isRequired,
  settingsReplace: PropTypes.func.isRequired,
  settingsReplaceAndCloudSaveOther: PropTypes.func.isRequired,
  filesGetUrl: PropTypes.func.isRequired,
};

export default connect(
  ({ files, settings }) => ({ files, settings }),
  dispatch => ({
    settingsReplaceAndCloudSaveOther: payload => {
      dispatch(settingsReplace(payload));
      dispatch(cloudSaveOther());
    },
    settingsReplace: payload => dispatch(settingsReplace(payload)),
    filesGetUrl: payload => dispatch(filesGetUrl(payload)),
  }),
)(Player);
