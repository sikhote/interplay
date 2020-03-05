import React from 'react';
import PropTypes from 'prop-types';
import Cookies from 'js-cookie';
import Router from 'next/router';
import uuidv4 from 'uuid/v4';
import Button from '../Button';
import Input from '../Input';
import Select from '../Select';
import { cloudGet } from '../../lib/actions/cloud';
import styles from './styles';

const SettingsFields = ({ store, dispatch, ...props }) => {
  const {
    cloud: { user, key, path, type, status },
  } = store;

  return (
    <div {...props} style={styles.root}>
      <Select
        disabled={status === 'connected'}
        icon="cloud"
        value={type}
        options={[{ title: 'Dropbox', value: 'dropbox', key: 'dropbox' }]}
        onChange={e => {
          Cookies.set('type', e.target.value);
          dispatch({
            type: 'cloud-update',
            payload: ['user', e.target.value],
          });
        }}
      />
      <Input
        style={styles.marginTop}
        editable={status !== 'connected'}
        icon="user"
        placeholder="Person"
        value={user}
        onChangeText={text => {
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
        onChangeText={text => {
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
        onChangeText={text => {
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
            dispatch({
              type: 'cloud-update',
              payload: ['status', 'disconnected'],
            });
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
          loading={status === 'connecting'}
          onPress={() => {
            dispatch({
              type: 'cloud-update',
              payload: ['status', 'connecting'],
            });

            cloudGet(store)
              .then(storeUpdates => {
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
                  payload: ['status', 'disconnected'],
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
    </div>
  );
};

SettingsFields.propTypes = {
  store: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default SettingsFields;
