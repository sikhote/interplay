import React from 'react';
import PropTypes from 'prop-types';
import withRedux from 'next-redux-wrapper';
import initStore from '../lib/initStore';
import Page from '../components/Page';
import { settingsReplace } from '../actions/settings';
import FileTable from '../components/FileTable';

const Audio = ({ files, settings, settingsReplace }) => (
  <Page>
    <FileTable
      columns={[
        { title: '#', dataKey: 'track', width: 40 },
        { title: 'Name', dataKey: 'name' },
        { title: 'Artist', dataKey: 'artist' },
        { title: 'Album', dataKey: 'album' },
      ]}
      data={files}
      settings={settings.audio}
      saveSettings={audio => settingsReplace({ ...settings, audio })}
      onRowClick={({ path }) => settingsReplace({
        ...settings,
        player: {
          ...settings.player,
          source: 'audio',
          path,
          position: 0,
          playing: true,
        }
      })}
    />
  </Page>
);

Audio.propTypes = {
  files: PropTypes.array.isRequired,
  settingsReplace: PropTypes.func.isRequired,
  settings: PropTypes.object.isRequired,
};

export default withRedux(
  initStore,
  ({ files, settings }) => ({
    files: files.audio,
    settings,
  }),
  dispatch => ({
    settingsReplace: settings => dispatch(settingsReplace(settings)),
  }),
)(Audio);
