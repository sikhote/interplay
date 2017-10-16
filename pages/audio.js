import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import inject from '../lib/inject';
import Page from '../components/Page';

const Settings = ({ audio }) => (
  <Page>
    hiiii
    {console.log(audio)}
  </Page>
);

Settings.propTypes = {
  audio: PropTypes.array.isRequired,
};

export default inject(
  connect(state => ({ audio: state.files.audio }))(Settings),
);
