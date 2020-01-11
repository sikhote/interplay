import React from 'react';
import PropTypes from 'prop-types';
import Cookies from 'js-cookie';
import Router from 'next/router';
import Button from '../Button';
import Input from '../Input';
import Select from '../Select';
import { cloudGet } from '../../lib/actions/cloud';
import notifier from '../../lib/notifier';
import styles from './styles';

const SettingsFields = ({ store, dispatch, ...props }) => {
  const {
    cloud: { user, key, path, type, status },
  } = store;

  return (
    <div {...props} css={styles.root}>
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
        disabled={status === 'connected'}
        icon="user"
        placeholder="Person"
        value={user}
        onChange={e => {
          Cookies.set('user', e.target.value);
          dispatch({
            type: 'cloud-update',
            payload: ['user', e.target.value],
          });
        }}
      />
      <Input
        disabled={status === 'connected'}
        icon="key"
        placeholder="ABC123"
        value={key}
        onChange={e => {
          Cookies.set('key', e.target.value);
          dispatch({
            type: 'cloud-update',
            payload: ['key', e.target.value],
          });
        }}
      />
      <Input
        disabled={status === 'connected'}
        icon="folder"
        placeholder="itunes/itunes music"
        value={path}
        onChange={e => {
          Cookies.set('path', e.target.value.toLowerCase());
          dispatch({
            type: 'cloud-update',
            payload: ['path', e.target.value.toLowerCase()],
          });
        }}
      />
      {status === 'connected' && (
        <Button
          icon="logout"
          onClick={() => {
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
          icon="login"
          loading={status === 'connecting'}
          onClick={() => {
            dispatch({
              type: 'cloud-update',
              payload: ['status', 'connecting'],
            });

            cloudGet(store)
              .then(storeUpdates => {
                Router.push('/').then(() => {
                  dispatch({ type: 'store-update', payload: storeUpdates });
                  notifier({
                    type: 'success',
                    message: 'Successfully downloaded from cloud',
                  });
                });
              })
              .catch(() => {
                dispatch({
                  type: 'cloud-update',
                  payload: ['status', 'disconnected'],
                });
                notifier({
                  type: 'error',
                  message: 'Failed to download from cloud',
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
