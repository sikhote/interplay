import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Cookies from 'js-cookie';
import { capitalize } from 'lodash';
import Button from '../../Button';
import Input from '../../Input';
import { filesSync } from '../../../requests/files';
import { cloudSaveOther, cloudGet, cloudDelete } from '../../../requests/cloud';
import getInitialState from '../../../lib/get-initial-state';
import H1 from '../../H1';
import Text from '../../Text';
import Icon from '../../Icon';
import styles from './styles';

const Settings = ({ store, dispatch }) => {
  const {
    cloud: { user, key, path, status },
  } = store;

  return (
    <div css={styles.root}>
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
        <Button onClick={() => cloudGet({ dispatch, store })}>
          Download from Cloud
        </Button>
      </div>
      <div css={styles.statuses}>
        {['files', 'playlists', 'other'].map(key => {
          const { status, date } = store.cloud[key];
          const success = ['downloaded', 'synced'].includes(status);

          return (
            <Text key={key} css={styles.statusLine}>
              <Text color={success ? 'a' : 'c'}>
                <Icon icon={success ? 'check' : 'cancel'} />
              </Text>
              {capitalize(key)} {status} {date && moment(date).fromNow()}
            </Text>
          );
        })}
      </div>
      <div css={styles.icons}>
        {status === 'syncing' && (
          <Button
            icon="cancel"
            shape="circle"
            onClick={() =>
              dispatch({
                type: 'cloud-update',
                payload: ['status', 'cancelled'],
              })
            }
          />
        )}
        <Button
          icon="arrows-ccw"
          shape="circle"
          loading={status === 'syncing'}
          onClick={() => filesSync({ dispatch, store })}
        />
        <Button
          icon="upload-cloud"
          shape="circle"
          onClick={() => cloudSaveOther({ store })}
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
        />
      </div>
    </div>
  );
};

Settings.propTypes = {
  store: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default Settings;
