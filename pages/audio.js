import React from 'react';
import PropTypes from 'prop-types';
import withRedux from 'next-redux-wrapper';
import initStore from '../lib/initStore';
import Page from '../components/Page';
import { cloudSaveOther } from '../actions/cloud';
import { settingsReplace } from '../actions/settings';
import { filesGetUrlAndPlay } from '../actions/files';
import FileTable from '../components/FileTable';

const Audio = ({
  files,
  settings,
  settingsReplace,
  settingsReplaceAndCloudSaveOther,
  filesGetUrlAndPlay,
}) => (
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
      settingsReplace={audio =>
        settingsReplace({ ...settings, audio })
      }
      settingsReplaceAndCloudSaveOther={audio =>
        settingsReplaceAndCloudSaveOther({ ...settings, audio })
      }
      onRowClick={({ path }) => filesGetUrlAndPlay({ source: 'audio', path })}
    />
  </Page>
);

Audio.propTypes = {
  files: PropTypes.object.isRequired,
  settingsReplace: PropTypes.func.isRequired,
  settingsReplaceAndCloudSaveOther: PropTypes.func.isRequired,
  settings: PropTypes.object.isRequired,
  filesGetUrlAndPlay: PropTypes.func.isRequired,
};

export default withRedux(
  initStore,
  ({ files, settings }) => ({ files, settings }),
  dispatch => ({
    settingsReplace: payload => dispatch(settingsReplace(payload)),
    settingsReplaceAndCloudSaveOther: payload => {
      dispatch(settingsReplace(payload));
      dispatch(cloudSaveOther());
    },
    filesGetUrlAndPlay: payload => dispatch(filesGetUrlAndPlay(payload)),
  }),
)(Audio);
