import React from 'react';
import PropTypes from 'prop-types';
import ReactPlayer from 'react-player';

const Player = ({ settings }) => {
  const { player } = settings;
  const {
    source,
    path,
    volume,
    position,
    playing,
    link,
  } = player;

  return (
    <div>
      <div>{source}</div>
      <div>{path || '-'}</div>
      <div>{position || '-'}</div>
      <div>{playing ? 'playing' : 'pause'}</div>
      <ReactPlayer
        url={link}
        width='200px'
        height='200px'
        volume={volume}
        playing={playing}
      />
    </div>
  );
};

Player.propTypes = {
  // files: PropTypes.object.isRequired,
  // settingsReplace: PropTypes.func.isRequired,
  settings: PropTypes.object.isRequired,
};

export default Player;
