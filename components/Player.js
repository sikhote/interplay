import React from 'react';
import PropTypes from 'prop-types';
import ReactPlayer from 'react-player';

const Player = ({ settings }) => {
  const { player } = settings;
  const { source, path, position, playing } = player;

  return (
    <div>
      <div>{source}</div>
      <div>{path || '-'}</div>
      <div>{position || '-'}</div>
      <div>{playing ? 'playing' : 'pause'}</div>
      <ReactPlayer
        url=""
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
