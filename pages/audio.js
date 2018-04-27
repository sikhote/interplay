import React from 'react';
import PropTypes from 'prop-types';
import withRedux from 'next-redux-wrapper';
import initStore from '../lib/initStore';
import Page from '../components/Page';
import { settingsReplace } from '../actions/settings';
import { filesGetLinkAndPlay } from '../actions/files';
import FileTable from '../components/FileTable';

const Audio = ({ files, settings, settingsReplace, filesGetLinkAndPlay }) => (
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
      onRowClick={({ path }) => filesGetLinkAndPlay({ source: 'audio', path })}
    />
  </Page>
);

Audio.propTypes = {
  files: PropTypes.object.isRequired,
  settingsReplace: PropTypes.func.isRequired,
  settings: PropTypes.object.isRequired,
  filesGetLinkAndPlay: PropTypes.func.isRequired,
};

export default withRedux(
  initStore,
  ({ files, settings }) => ({ files, settings }),
  dispatch => ({
    settingsReplace: payload => dispatch(settingsReplace(payload)),
    filesGetLinkAndPlay: payload => dispatch(filesGetLinkAndPlay(payload)),
  }),
)(Audio);
