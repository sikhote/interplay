import React from 'react';
import PropTypes from 'prop-types';
import withRedux from 'next-redux-wrapper';
import initStore from '../lib/initStore';
import Page from '../components/Page';
import { settingsReplace } from '../actions/settings';
import { filesGetLink } from '../actions/files';
import FileTable from '../components/FileTable';

const Audio = ({ files, settings, settingsReplace, filesGetLink }) => (
  <Page>
    <FileTable
      columns={[
        { title: '#', dataKey: 'track', width: 40 },
        { title: 'Name', dataKey: 'name' },
        { title: 'Artist', dataKey: 'artist' },
        { title: 'Album', dataKey: 'album' },
      ]}
      data={files.audio}
      settings={settings.audio}
      saveSettings={audio => settingsReplace({ ...settings, audio })}
      onRowClick={({ path }) => {
        settingsReplace({
          ...settings,
          player: {
            ...settings.player,
            source: 'audio',
            path,
            position: 0,
            playing: true,
          },
        });
        filesGetLink({ source: 'audio', path });
      }}
    />
  </Page>
);

Audio.propTypes = {
  files: PropTypes.object.isRequired,
  settingsReplace: PropTypes.func.isRequired,
  settings: PropTypes.object.isRequired,
  filesGetLink: PropTypes.func.isRequired,
};

export default withRedux(
  initStore,
  ({ files, settings }) => ({ files, settings }),
  dispatch => ({
    settingsReplace: settings => dispatch(settingsReplace(settings)),
    filesGetLink: payload => dispatch(filesGetLink(payload)),
  }),
)(Audio);
