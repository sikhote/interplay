import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import inject from '../lib/inject';
import Page from '../components/Page';
import { settingsReplace } from '../actions/settings';
import FileTable from '../components/FileTable';

const Video = ({ video, settings, settingsReplace }) => (
  <Page>
    <FileTable
      columns={[{ title: 'Name', dataKey: 'name' }]}
      data={video}
      settings={settings.video}
      saveSettings={video => settingsReplace({ ...settings, video })}
    />
  </Page>
);

Video.propTypes = {
  video: PropTypes.array.isRequired,
  settingsReplace: PropTypes.func.isRequired,
  settings: PropTypes.object.isRequired,
};

export default inject(connect(
  state => ({
    video: state.files.video,
    settings: state.settings,
  }),
  dispatch => ({
    settingsReplace: settings => dispatch(settingsReplace(settings)),
  }),
)(Video));
