import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { set } from 'lodash';
import { connect } from 'react-redux';
import Cookies from 'js-cookie';
import css from 'styled-jsx/css';
import { Button, Input } from 'antd';
import { settingsReplaceLocal } from '../actions/settings';
import { filesSync } from '../actions/files';
import { cloudSaveOther, cloudGet, cloudDelete } from '../actions/cloud';
import { getInitialState } from '../reducers/settings';
import H1 from '../components/H1';
import InputIcon from '../components/InputIcon';
import Spacer from '../components/Spacer';
import Text from '../components/Text';
import Icon from '../components/Icon';
import IconButton from '../components/IconButton';
import { colors, spacing, bps } from '../lib/styling';

const styles = css`
  .container {
    padding: ${spacing.pageVertical}px ${spacing.pageHorizontal}px;
  }
  .inputs {
    max-width: 400px;
  }
  :global(.save) {
    width: 100%;
  }
  .icons {
    display: grid;
    grid-auto-flow: column;
    grid-auto-columns: auto;
    justify-content: start;
    grid-gap: ${spacing.a3}px;
  }
  .icons :global(.ant-btn) {
  }

  @media (max-width: ${bps.a2}px) {
    .container {
      padding: ${spacing.pageA2}px;
    }
  }
`;

const Settings = ({
  filesSync,
  cloudSaveOther,
  cloudGet,
  cloudDelete,
  settings,
  settingsReplaceLocal,
}) => (
  <div className="container">
    <style jsx>{styles}</style>
    <H1>Settings</H1>
    <Spacer />
    <Text>
      This website allows a user to easily create playslists and stream music
      and videos from a Dropbox account. Enter a Dropbox API key and the path to
      the Dropbox folder your media is located in. Optionally, enter a user
      name. All settings and playlists are stored in folder within the specified
      Dropbox folder.
    </Text>
    <Spacer />
    <div className="inputs">
      <Input
        prefix={<InputIcon icon="user" />}
        placeholder="person"
        value={settings.cloud.user}
        onChange={e => {
          Cookies.set('user', e.target.value);
          settingsReplaceLocal(
            set({ ...settings }, 'cloud.user', e.target.value),
          );
        }}
      />
      <Spacer height={spacing.a2} />
      <Input
        prefix={<InputIcon icon="key" />}
        placeholder="abc123"
        value={settings.cloud.key}
        onChange={e => {
          Cookies.set('key', e.target.value);
          settingsReplaceLocal(
            set({ ...settings }, 'cloud.key', e.target.value),
          );
        }}
      />
      <Spacer height={spacing.a2} />
      <Input
        className="input"
        prefix={<InputIcon icon="folder" />}
        placeholder="itunes/itunes music"
        value={settings.cloud.path}
        onChange={e => {
          Cookies.set('path', e.target.value.toLowerCase());
          settingsReplaceLocal(
            set({ ...settings }, 'cloud.path', e.target.value.toLowerCase()),
          );
        }}
      />
      <Spacer height={spacing.a2} />
      <Button className="save" type="primary" onClick={() => cloudGet()}>
        Save
      </Button>
    </div>
    <Spacer />
    <Text>
      {settings.cloud.isConnected ? 'Connected. ' : 'No connection. '}
      {settings.cloud.isConnected && settings.cloud.date
        ? `Synced ${moment(settings.cloud.date).fromNow()}.`
        : 'Never synced.'}
    </Text>
    <Spacer />
    <div className="icons">
      {settings.cloud.status === 'syncing' && (
        <IconButton
          onClick={() =>
            settingsReplaceLocal(
              set({ ...settings }, 'cloud.status', 'cancelled'),
            )
          }
        >
          <Icon icon="cancel" />
        </IconButton>
      )}
      <IconButton
        loading={settings.cloud.status === 'syncing'}
        onClick={() => filesSync()}
      >
        <Icon color={colors.white} icon="arrows-ccw" />
      </IconButton>
      <IconButton onClick={() => cloudSaveOther()}>
        <Icon icon="upload-cloud" />
      </IconButton>
      <IconButton onClick={() => cloudGet()}>
        <Icon icon="download-cloud" />
      </IconButton>
      <IconButton
        onClick={() => {
          Cookies.set('key', '');
          Cookies.set('path', '');
          Cookies.set('user', '');
          settingsReplaceLocal(getInitialState());
          cloudDelete();
        }}
      >
        <Icon icon="trash" />
      </IconButton>
    </div>
  </div>
);

Settings.propTypes = {
  settings: PropTypes.object.isRequired,
  settingsReplaceLocal: PropTypes.func.isRequired,
  filesSync: PropTypes.func.isRequired,
  cloudSaveOther: PropTypes.func.isRequired,
  cloudGet: PropTypes.func.isRequired,
  cloudDelete: PropTypes.func.isRequired,
};

export default connect(
  ({ settings }) => ({ settings }),
  dispatch => ({
    settingsReplaceLocal: payload => dispatch(settingsReplaceLocal(payload)),
    filesSync: () => dispatch(filesSync()),
    cloudSaveOther: () => dispatch(cloudSaveOther()),
    cloudGet: () => dispatch(cloudGet()),
    cloudDelete: () => dispatch(cloudDelete()),
  }),
)(Settings);
