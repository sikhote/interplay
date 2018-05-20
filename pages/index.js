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
}) => (
  <div className="root">
    <style jsx>{style}</style>
    <CustomHead />
    <Alert
      className="alert"
      message={
        settings.cloud.date
          ? `Synced ${moment(settings.cloud.date).fromNow()}`
          : 'Never synced'
      }
      type={settings.cloud.status === 'success' ? 'success' : 'error'}
    />
    <Input
      className="input"
      prefix={<Icon type="user" />}
      placeholder="default"
      value={settings.cloud.profile}
      onChange={({ target: { value } }) => {
        Cookies.set('profile', value);
        settingsReplace(set({ ...settings }, 'cloud.profile', value));
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
    <div className="actions">
      {settings.cloud.status === 'syncing' && (
        <Tooltip placement="top" title="Cancel sync">
          <Button
            type="danger"
            shape="circle"
            icon="close"
            onClick={() =>
              settingsReplace(set({ ...settings }, 'cloud.status', 'cancelled'))
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
              icon="retweet"
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
              onClick={() => cloudSaveOther()}
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
);

Settings.propTypes = {
  settings: PropTypes.object.isRequired,
  settingsReplace: PropTypes.func.isRequired,
  filesSync: PropTypes.func.isRequired,
  cloudSaveOther: PropTypes.func.isRequired,
  cloudGet: PropTypes.func.isRequired,
};

export default connect(
  ({ settings }) => ({ settings }),
  dispatch => ({
    settingsReplace: settings => dispatch(settingsReplace(settings)),
    filesSync: () => dispatch(filesSync()),
    cloudSaveOther: () => dispatch(cloudSaveOther()),
    cloudGet: () => dispatch(cloudGet()),
  }),
)(Settings);
