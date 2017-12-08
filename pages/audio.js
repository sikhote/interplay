import React from 'react';
import PropTypes from 'prop-types';
import withRedux from 'next-redux-wrapper';
import initStore from '../lib/initStore';
import Page from '../components/Page';
import { settingsReplace } from '../actions/settings';
import FileTable from '../components/FileTable';

const Audio = ({ audio, settings, settingsReplace }) => (
  <Page>
    <FileTable
      columns={[
        { title: '#', dataKey: 'track', width: 40 },
        { title: 'Name', dataKey: 'name' },
        { title: 'Artist', dataKey: 'artist' },
        { title: 'Album', dataKey: 'album' },
      ]}
      data={audio}
      settings={settings.audio}
      saveSettings={audio => settingsReplace({ ...settings, audio })}
    />
  </Page>
);

Audio.propTypes = {
  audio: PropTypes.array.isRequired,
  settingsReplace: PropTypes.func.isRequired,
  settings: PropTypes.object.isRequired,
};

export default withRedux(
  initStore,
  state => ({
    audio: state.files.audio,
    settings: state.settings,
  }),
  dispatch => ({
    settingsReplace: settings => dispatch(settingsReplace(settings)),
  }),
)(Audio);
