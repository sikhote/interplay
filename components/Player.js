import React from 'react';
import PropTypes from 'prop-types';
import ReactPlayer from 'react-player';
import { merge } from 'lodash';
import { Button, Slider, Switch, Icon } from 'antd';
import moment from 'moment';
import style from '../styles/player';
import getFileInDirection from '../lib/getFileInDirection';

class Player extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      played: 0,
      playedSeconds: 0,
    };
  }
  render() {
    const {
      settings,
      settingsReplace,
      files,
      filesGetLinkAndPlay,
    } = this.props;
    const { played, playedSeconds } = this.state;
    const { player } = settings;
    const { volume, position, playing, muted, file = {} } = player;
    const { url } = file;
    const goToFile = direction => {
      const { path } = getFileInDirection(settings, files, direction);
      filesGetLinkAndPlay({ source: 'audio', path });
    };

    const config = {
      loop: true,
      muted,
      width: '100%',
      height: '100%',
      progressInterval: 1000,
      // full screen
      playsinline: false,
      volume,
      playing,
      url,
      ref: ref => {
        this.player = ref;
      },
      onProgress: ({ played, playedSeconds }) =>
        this.setState({ played, playedSeconds }),
      onEnded: () => goToFile('next'),
    };

    return (
      <div className="root">
        <style jsx>{style}</style>
        <div className="directions">
          <Button
            disabled={!url}
            type="primary"
            shape="circle"
            icon="backward"
            size="large"
            onClick={() => goToFile('previous')}
          />
          <Button
            disabled={!url}
            type="primary"
            shape="circle"
            icon={playing ? 'pause' : 'caret-right'}
            size="large"
            onClick={() =>
              settingsReplace(
                merge({}, settings, {
                  player: { playing: !playing },
                }),
              )
            }
          />
          <Button
            disabled={!url}
            type="primary"
            shape="circle"
            icon="forward"
            size="large"
            onClick={() => goToFile('next')}
          />
        </div>
        <div className="volume">
          <Icon type="sound" />
          <Switch
            size="small"
            checked={!muted}
            onChange={() =>
              settingsReplace(
                merge({}, settings, {
                  player: { muted: !muted },
                }),
              )
            }
          />
          <Slider
            value={volume}
            min={0}
            max={1}
            step={0.01}
            tipFormatter={volume => `${Math.round(volume * 100)}%`}
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
          <Icon type="hourglass" />
          <Slider
            value={played}
            min={0}
            max={1}
            step={0.01}
            tipFormatter={() =>
              // eslint-disable-next-line no-underscore-dangle
              moment(moment.duration(playedSeconds, 'seconds')._data).format(
                'mm:ss',
              )
            }
            onChange={progress => this.player.seekTo(progress)}
          />
        </div>
        <ReactPlayer {...config} />
      </div>
    );
  }
}

Player.propTypes = {
  files: PropTypes.object.isRequired,
  settingsReplace: PropTypes.func.isRequired,
  settings: PropTypes.object.isRequired,
  filesGetLinkAndPlay: PropTypes.func.isRequired,
};

export default Player;
