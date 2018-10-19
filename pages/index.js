import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { set } from 'lodash';
import { connect } from 'react-redux';
import Cookies from 'js-cookie';
import { settingsReplaceLocal } from '../actions/settings';
import { filesSync } from '../actions/files';
import { cloudSaveOther, cloudGet, cloudDelete } from '../actions/cloud';
import { getInitialState } from '../reducers/settings';
import Page from '../components/Page';
import { Text, TextInput, View, Button } from '../components/rnw';
import H1 from '../components/html/H1';
import Icon from '../components/Icon';
import IconButton from '../components/IconButton';
import Spacer from '../components/Spacer';
import { fontSizes, spacing } from '../lib/styling';

const styles = {
  inputs: {
    maxWidth: 400,
  },
  icons: {
    flexDirection: 'row',
  },
  icon: {
    marginRight: spacing.a4,
  },
};

const Settings = ({
  filesSync,
  cloudSaveOther,
  cloudGet,
  cloudDelete,
  settings,
  cloud,
  settingsReplaceLocal,
}) => (
  <Page horizontalPadding verticalPadding>
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
    <View style={styles.inputs}>
      <TextInput
        className="user"
        prefix={<Icon icon="user" fontSize={fontSizes.a4} />}
        placeholder="default"
        value={settings.cloud.user}
        onChange={({ target: { value } }) => {
          Cookies.set('user', value);
          settingsReplaceLocal(set({ ...settings }, 'cloud.user', value));
        }}
      />
      <Spacer height={spacing.a2} />
      <TextInput
        className="input"
        prefix={<Icon icon="key" />}
        placeholder="ABCD1234"
        value={settings.cloud.key}
        onChange={({ target: { value } }) => {
          Cookies.set('key', value);
          settingsReplaceLocal(set({ ...settings }, 'cloud.key', value));
        }}
      />
      <Spacer height={spacing.a2} />
      <TextInput
        className="input"
        prefix={<Icon icon="folder" />}
        placeholder="itunes/itunes music"
        value={settings.cloud.path}
        onChange={({ target: { value } }) => {
          Cookies.set('path', value.toLowerCase());
          settingsReplaceLocal(
            set({ ...settings }, 'cloud.path', value.toLowerCase()),
          );
        }}
      />
      <Spacer height={spacing.a2} />
      <Button title="Save" onPress={() => cloudGet()} />
    </View>
    <Spacer />
    <Text>
      {(cloud.hasCloudStore ? 'Connected. ' : 'No connection. ') +
        (settings.cloud.date
          ? `Synced ${moment(settings.cloud.date).fromNow()}.`
          : 'Never synced.')}
    </Text>
    <Spacer />
    <View style={styles.icons}>
      {settings.cloud.status === 'syncing' && (
        <IconButton
          style={styles.icon}
          icon="cancel"
          onPress={() =>
            settingsReplaceLocal(
              set({ ...settings }, 'cloud.status', 'cancelled'),
            )
          }
        />
      )}
      {!!(settings.cloud.key && settings.cloud.path) && (
        <IconButton
          style={styles.icon}
          icon="arrows-ccw"
          loading={settings.cloud.status === 'syncing'}
          onPress={() => filesSync()}
        />
      )}
      {!!(settings.cloud.key && settings.cloud.path) && (
        <IconButton
          style={styles.icon}
          icon="upload-cloud"
          onPress={() => cloudSaveOther({ settings, cloud })}
        />
      )}
      {!!(settings.cloud.key && settings.cloud.path) && (
        <IconButton
          style={styles.icon}
          icon="download-cloud"
          onPress={() => cloudGet()}
        />
      )}
      <IconButton
        icon="trash"
        onPress={() => {
          Cookies.set('key', '');
          Cookies.set('path', '');
          Cookies.set('user', '');
          settingsReplaceLocal(getInitialState());
          cloudDelete();
        }}
      />
    </View>
  </Page>
);

Settings.propTypes = {
  settings: PropTypes.object.isRequired,
  cloud: PropTypes.object.isRequired,
  settingsReplaceLocal: PropTypes.func.isRequired,
  filesSync: PropTypes.func.isRequired,
  cloudSaveOther: PropTypes.func.isRequired,
  cloudGet: PropTypes.func.isRequired,
  cloudDelete: PropTypes.func.isRequired,
};

export default connect(
  ({ settings, cloud }) => ({ settings, cloud }),
  dispatch => ({
    settingsReplaceLocal: payload => dispatch(settingsReplaceLocal(payload)),
    filesSync: () => dispatch(filesSync()),
    cloudSaveOther: payload => dispatch(cloudSaveOther(payload)),
    cloudGet: () => dispatch(cloudGet()),
    cloudDelete: () => dispatch(cloudDelete()),
  }),
)(Settings);
