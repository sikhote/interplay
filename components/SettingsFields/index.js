import React from 'react';
import PropTypes from 'prop-types';
import Cookies from 'js-cookie';
import Router from 'next/router';
import { View } from 'react-native';
import { v4 as uuidv4 } from 'uuid';
import Button from 'components/Button';
import Input from 'components/Input';
import Select from 'components/Select';
import { cloudGet } from 'lib/actions/cloud';
import styles from './styles';
import cloudStatuses from 'lib/cloud-statuses';

const SettingsFields = ({ store, dispatch, style, ...props }) => {
  const {
    cloud: { user, key, path, type, status },
  } = store;

  return (
    <View {...props} style={[styles.root, style]}>
      <Select
        disabled={status === 'connected'}
        icon="cloud"
        value={type}
        options={[{ title: 'Dropbox', value: 'dropbox', key: 'dropbox' }]}
        onValueChange={(value) => {
          Cookies.set('type', value);
          dispatch({
            type: 'cloud-update',
            payload: ['user', value],
          });
        }}
      />
      <Input
        style={styles.marginTop}
        editable={status !== 'connected'}
        icon="user"
        placeholder="Person"
        value={user}
        onChangeText={(text) => {
          Cookies.set('user', text);
          dispatch({
            type: 'cloud-update',
            payload: ['user', text],
          });
        }}
      />
      <Input
        style={styles.marginTop}
        editable={status !== 'connected'}
        icon="key"
        placeholder="ABC123"
        value={key}
        onChangeText={(text) => {
          Cookies.set('key', text);
          dispatch({
            type: 'cloud-update',
            payload: ['key', text],
          });
        }}
      />
      <Input
        style={styles.marginTop}
        editable={status !== 'connected'}
        icon="folder"
        placeholder="itunes/itunes music"
        value={path}
        onChangeText={(text) => {
          Cookies.set('path', text.toLowerCase());
          dispatch({
            type: 'cloud-update',
            payload: ['path', text.toLowerCase()],
          });
        }}
      />
      {status === 'connected' && (
        <Button
          style={styles.marginTop}
          icon="logout"
          onPress={() => {
            dispatch({ type: 'reset' });
            Router.push('/welcome');
          }}
        >
          Log Out
        </Button>
      )}
      {status !== 'connected' && (
        <Button
          style={styles.marginTop}
          icon="login"
          isLoading={status === 'connecting'}
          onPress={() => {
            dispatch({
              type: 'cloud-update',
              payload: ['status', cloudStatuses.connecting],
            });

            cloudGet(store)
              .then((storeUpdates) => {
                Router.push('/').then(() => {
                  dispatch({ type: 'store-update', payload: storeUpdates });
                  dispatch({
                    type: 'notifications-add',
                    payload: {
                      type: 'success',
                      message: 'Successfully downloaded from cloud',
                      id: uuidv4(),
                    },
                  });
                });
              })
              .catch(() => {
                dispatch({
                  type: 'cloud-update',
                  payload: ['status', cloudStatuses.disconnected],
                });
                dispatch({
                  type: 'notifications-add',
                  payload: {
                    type: 'error',
                    message: 'Failed to download from cloud',
                    id: uuidv4(),
                  },
                });
              });
          }}
        >
          Log In
        </Button>
      )}
    </View>
  );
};

SettingsFields.propTypes = {
  store: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  style: PropTypes.any,
};

SettingsFields.defaultProps = {
  style: {},
};

export default SettingsFields;
