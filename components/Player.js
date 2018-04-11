import React from 'react';
import PropTypes from 'prop-types';
import withRedux from 'next-redux-wrapper';
import initStore from '../lib/initStore';
import { settingsReplace } from '../actions/settings';

const Player = ({ settings }) => {
  const { player } = settings;
  const { source, path, position, playing } = player;

  return (
    <div>
      <div>{source}</div>
      <div>{path || '-'}</div>
      <div>{position || '-'}</div>
      <div>{playing ? 'playing' : 'pause'}</div>
    </div>
  );
};

Player.propTypes = {
  // files: PropTypes.object.isRequired,
  // settingsReplace: PropTypes.func.isRequired,
  settings: PropTypes.object.isRequired,
};

export default withRedux(
  initStore,
  ({ files, settings }) => ({ files, settings }),
  dispatch => ({
    settingsReplace: settings => dispatch(settingsReplace(settings)),
  }),
)(Player);
