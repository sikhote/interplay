import React from 'react';
import PropTypes from 'prop-types';
import { Input, Button, Tooltip, Alert, Icon } from 'antd';
import moment from 'moment';
import { set } from 'lodash';
import { connect } from 'react-redux';
import Cookies from 'js-cookie';
import CustomHead from '../components/CustomHead';
import { settingsReplace } from '../actions/settings';
import { filesSync } from '../actions/files';
import { cloudSaveOther, cloudGet } from '../actions/cloud';
import { initialState } from '../reducers/settings';
import style from '../styles/settings';

const Settings = ({
  settingsReplace,
  filesSync,
  cloudSaveOther,
  cloudGet,
  settings,
  cloud,
}) => (
  <div className="root">
    <style jsx>{style}</style>
    <CustomHead />
    <div>
      <h1>Settings</h1>
      This website allows streaming music and videos from a Dropbox account. The
      purpose is to allow an easy way to play media, search, and create
      playlists. To get started, enter a Dropbox API key and the path to the
      Dropbox folder your media is located in. Optionally, enter a user
      name—this allows users of the same Dropbox account to have different
      playlists and settings. Audio files should be within an album folder,
      which should be within an artist folder (iTunes will organize it this way
      automatically). Video files will be categorized by the folder they are
      within. All settings and playlists are stored in a folder within the
      specified Dropbox folder.
    </div>
    <div className="inputs">
      <Input
        className="input"
        prefix={<Icon type="user" />}
        placeholder="default"
        value={settings.cloud.user}
        onChange={({ target: { value } }) => {
          Cookies.set('user', value);
          settingsReplace(set({ ...settings }, 'cloud.user', value));
        }}
      />
      <Input
        className="input"
        prefix={<Icon type="key" />}
        placeholder="ABCD1234"
        value={settings.cloud.key}
        onChange={({ target: { value } }) => {
          Cookies.set('key', value);
          settingsReplace(set({ ...settings }, 'cloud.key', value));
        }}
      />
      <Input
        className="input"
        prefix={<Icon type="folder" />}
        placeholder="itunes/itunes music"
        value={settings.cloud.path}
        onChange={({ target: { value } }) => {
          Cookies.set('path', value.toLowerCase());
          settingsReplace(
            set({ ...settings }, 'cloud.path', value.toLowerCase()),
          );
        }}
      />
      <Alert
        className="alert"
        message={
          (cloud.hasCloudStore ? 'Connected. ' : 'No connection. ') +
          (settings.cloud.date
            ? `Synced ${moment(settings.cloud.date).fromNow()}.`
            : 'Never synced.')
        }
        type={cloud.hasCloudStore ? 'success' : 'error'}
      />
      <div className="actions">
        {settings.cloud.status === 'syncing' && (
          <Tooltip placement="top" title="Cancel sync">
            <Button
              type="danger"
              shape="circle"
              icon="close"
              onClick={() =>
                settingsReplace(
                  set({ ...settings }, 'cloud.status', 'cancelled'),
                )
              }
            />
          </Tooltip>
        )}
        {settings.cloud.key &&
          settings.cloud.path && (
            <Tooltip
              placement="top"
              title={
                settings.cloud.status === 'syncing'
                  ? 'Syncing files'
                  : 'Start files sync'
              }
            >
              <Button
                type="primary"
                shape="circle"
                icon="sync"
                loading={settings.cloud.status === 'syncing'}
                onClick={() => filesSync()}
              />
            </Tooltip>
          )}
        {settings.cloud.key &&
          settings.cloud.path && (
            <Tooltip placement="top" title="Save state to cloud">
              <Button
                type="primary"
                shape="circle"
                icon="cloud-upload"
                onClick={() => cloudSaveOther({ settings, cloud })}
              />
            </Tooltip>
          )}
        {settings.cloud.key &&
          settings.cloud.path && (
            <Tooltip placement="top" title="Download state from cloud">
              <Button
                type="primary"
                shape="circle"
                icon="cloud-download"
                onClick={() => cloudGet()}
              />
            </Tooltip>
          )}
        <Tooltip placement="top" title="Reset local settings">
          <Button
            type="primary"
            shape="circle"
            icon="delete"
            onClick={() => settingsReplace(initialState)}
          />
        </Tooltip>
      </div>
    </div>
  </div>
);

Settings.propTypes = {
  settings: PropTypes.object.isRequired,
  cloud: PropTypes.object.isRequired,
  settingsReplace: PropTypes.func.isRequired,
  filesSync: PropTypes.func.isRequired,
  cloudSaveOther: PropTypes.func.isRequired,
  cloudGet: PropTypes.func.isRequired,
};

export default connect(
  ({ settings, cloud }) => ({ settings, cloud }),
  dispatch => ({
    settingsReplace: payload => dispatch(settingsReplace(payload)),
    filesSync: () => dispatch(filesSync()),
    cloudSaveOther: payload => dispatch(cloudSaveOther(payload)),
    cloudGet: () => dispatch(cloudGet()),
  }),
)(Settings);
