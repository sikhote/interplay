import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { useWindowDimensions, View } from 'react-native';
import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';
import { get, capitalize } from 'lodash';
import Button from '../../Button';
import SettingsFields from '../../SettingsFields';
import { filesSync } from '../../../lib/actions/files';
import { cloudSaveFiles } from '../../../lib/actions/cloud';
import H1 from '../../H1';
import Text from '../../Text';
import Icon from '../../Icon';
import PageTitle from '../../PageTitle';
import getStyles from './get-styles';

const Settings = ({ store, dispatch }) => {
  const {
    cloud: { files },
  } = store;
  const dimensions = useWindowDimensions();
  const styles = useMemo(() => getStyles(dimensions), [dimensions]);

  return (
    <View style={styles.root}>
      <PageTitle title="settings" />
      <H1>Settings</H1>
      <SettingsFields {...{ store, dispatch }} />
      <Button
        isAllowingLoadingClicks
        style={styles.sync}
        theme="secondary"
        icon={files.status === 'syncing' ? 'cancel' : 'arrows-ccw'}
        isLoading={files.status === 'syncing'}
        onPress={() => {
          if (files.status === 'syncing') {
            dispatch({
              type: 'cloud-update',
              payload: [
                'files',
                { status: 'sync cancelled', date: Date.now() },
              ],
            });
            return;
          }

          dispatch({
            type: 'cloud-update',
            payload: ['files', { status: 'syncing', date: Date.now() }],
          });

          filesSync(store)
            .then((files) => {
              dispatch({ type: 'files-replace', payload: files });
              dispatch({
                type: 'cloud-update-many',
                payload: {
                  files: { status: 'synced', date: Date.now() },
                  status: 'connected',
                },
              });
              return cloudSaveFiles({ ...store, files });
            })
            .then(() =>
              dispatch({
                type: 'notifications-add',
                payload: {
                  type: 'success',
                  message: 'Synced files successfully',
                  id: uuidv4(),
                },
              }),
            )
            .catch((error) => {
              const errorReason =
                get(error, 'message') === 'sync cancelled'
                  ? 'sync cancelled'
                  : 'sync error';
              dispatch({
                type: 'cloud-update',
                payload: ['files', { status: errorReason, date: Date.now() }],
              });
              dispatch({
                type: 'notifications-add',
                payload: {
                  type: 'error',
                  message: `Failed to sync files due to ${errorReason}`,
                  id: uuidv4(),
                },
              });
            });
        }}
      >
        Sync Files
      </Button>
      <View style={styles.statuses}>
        {[
          { ...store.cloud, key: 'cloud' },
          ...['files', 'playlists', 'other'].map((key) => ({
            ...store.cloud[key],
            key,
          })),
        ].map(({ key, status, date }) => {
          const success = ['connected', 'synced'].includes(status);

          return (
            <Text key={key} style={styles.statusLine}>
              <Text color={success ? 'a' : 'c'}>
                <Icon icon={success ? 'check' : 'cancel'} />
              </Text>
              {capitalize(key)} {status}{' '}
              {success && date && moment(date).fromNow()}
            </Text>
          );
        })}
      </View>
    </View>
  );
};

Settings.propTypes = {
  store: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default Settings;
