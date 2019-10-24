import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Cookies from 'js-cookie';
import { get, capitalize } from 'lodash';
import Button from '../../Button';
import Input from '../../Input';
import { filesSync } from '../../../lib/actions/files';
import { cloudGet, cloudSaveFiles } from '../../../lib/actions/cloud';
import H1 from '../../H1';
import Text from '../../Text';
import Icon from '../../Icon';
import PageTitle from '../../PageTitle';
import notifier from '../../../lib/notifier';
import styles from './styles';

const Settings = ({ store, dispatch }) => {
  const {
    cloud: { user, key, path, status, files },
  } = store;

  return (
    <div css={styles.root}>
      <PageTitle title="settings" />
      <H1>Settings</H1>
      <Text>
        This website allows a user to easily create playslists and stream music
        and videos from a Dropbox account. Enter a Dropbox API key and the path
        to the Dropbox folder your media is located in. Optionally, enter a user
        name. All settings and playlists are stored in folder within the
        specified Dropbox folder.
      </Text>
      <div css={styles.inputs}>
        <Input
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
        <Button
          onClick={() => {
            dispatch({
              type: 'cloud-update',
              payload: ['status', 'connecting'],
            });

            cloudGet({ key, path, user })
              .then(storeUpdates => {
                dispatch({ type: 'store-update', payload: storeUpdates });
                notifier({
                  type: 'success',
                  message: 'Successfully downloaded from cloud',
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
          Connect to Cloud
        </Button>
      </div>
      <div css={styles.statuses}>
        {[
          { ...store.cloud, key: 'cloud' },
          ...['files', 'playlists', 'other'].map(key => ({
            ...store.cloud[key],
            key,
          })),
        ].map(({ key, status, date }) => {
          const success = ['connected', 'synced'].includes(status);

          return (
            <Text key={key} css={styles.statusLine}>
              <Text color={success ? 'a' : 'c'}>
                <Icon icon={success ? 'check' : 'cancel'} />
              </Text>
              {capitalize(key)} {status}{' '}
              {success && date && moment(date).fromNow()}
            </Text>
          );
        })}
      </div>
      <div css={styles.icons}>
        <Button
          allowLoadingClicks
          icon={files.status === 'syncing' ? 'cancel' : 'arrows-ccw'}
          shape="circle"
          loading={files.status === 'syncing'}
          onClick={() => {
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
              .then(files => {
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
                notifier({
                  type: 'success',
                  message: 'Synced files successfully',
                }),
              )
              .catch(error => {
                const errorReason =
                  get(error, 'message') === 'sync cancelled'
                    ? 'sync cancelled'
                    : 'sync error';
                dispatch({
                  type: 'cloud-update',
                  payload: ['files', { status: errorReason, date: Date.now() }],
                });
                notifier({
                  type: 'error',
                  message: `Failed to sync files due to ${errorReason}`,
                });
              });
          }}
        />
        {/* <Button
          icon="upload-cloud"
          shape="circle"
          onClick={() =>
            cloudSaveOther({ store }).catch(() =>
              notifier({
                type: 'error',
                message: 'Failed to save to cloud',
              }),
            )
          }
        />
        <Button
          icon="download-cloud"
          shape="circle"
          onClick={() => cloudGet({ dispatch, store })}
        />
        <Button
          icon="trash"
          shape="circle"
          onClick={() => {
            Cookies.set('key', '');
            Cookies.set('path', '');
            Cookies.set('user', '');
            dispatch({
              type: 'cloud-update-many',
              payload: getInitialState().cloud,
            });
            cloudDelete({ store });
          }}
        /> */}
      </div>
    </div>
  );
};

Settings.propTypes = {
  store: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default Settings;
