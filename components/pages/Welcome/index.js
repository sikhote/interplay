import React from 'react';
import PropTypes from 'prop-types';
import SettingsFields from '../../SettingsFields';
import H1 from '../../H1';
import Text from '../../Text';
import PageTitle from '../../PageTitle';
import styles from './styles';

const Welcome = ({ store, dispatch }) => (
  <div css={styles.root}>
    <PageTitle title="log in" />
    <H1>Welcome to Interplay!</H1>
    <Text>
      This site allows you to play music and videos from a cloud service.
      <br />
      <br />
      Select a cloud type, enter a name, enter an access key, and specify a
      folder. Settings and playlists are stored in a folder within the specified
      cloud service.
    </Text>
    <SettingsFields {...{ store, dispatch }} css={styles.settingsFields} />
  </div>
);

Welcome.propTypes = {
  store: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default Welcome;
