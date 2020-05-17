import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import SettingsFields from 'components/SettingsFields';
import H1 from 'components/H1';
import Text from 'components/Text';
import PageTitle from 'components/PageTitle';
import styles from './styles';

const Welcome = ({ store, dispatch }) => (
  <View style={styles.root}>
    <PageTitle title="log in" />
    <H1>Welcome to Interplay!</H1>
    <Text>
      This site allows you to play music and videos from a cloud service.
      {'\n\n'}
      Select a cloud type, enter a name, enter an access key, and specify a
      folder. Settings and playlists are stored in a folder within the specified
      cloud service.
    </Text>
    <SettingsFields {...{ store, dispatch }} style={styles.settingsFields} />
  </View>
);

Welcome.propTypes = {
  store: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default Welcome;
