import React from 'react';
import PropTypes from 'prop-types';
import withRedux from 'next-redux-wrapper';
import initStore from '../lib/initStore';
import Page from '../components/Page';
import { settingsReplace } from '../actions/settings';
import FileTable from '../components/FileTable';

const Video = ({ files, settings, settingsReplace }) => (
  <Page>
    <FileTable
      columns={[{ title: 'Name', dataKey: 'name' }]}
      data={files}
      settings={settings.video}
      saveSettings={video => settingsReplace({ ...settings, video })}
    />
  </Page>
);

Video.propTypes = {
  files: PropTypes.array.isRequired,
  settingsReplace: PropTypes.func.isRequired,
  settings: PropTypes.object.isRequired,
};

export default withRedux(
  initStore,
  ({ files, settings }) => ({
    files: files.video,
    settings,
  }),
  dispatch => ({
    settingsReplace: payload => dispatch(settingsReplace(payload)),
  }),
)(Video);
