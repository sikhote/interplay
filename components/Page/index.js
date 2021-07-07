import React, { useReducer, useEffect, useMemo } from 'react';
import { useWindowDimensions, View } from 'react-native';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import Navigation from 'components/Navigation';
import Player from 'components/Player';
import Options from 'components/Options';
import Icon from 'components/Icon';
import Notifications from 'components/Notifications';
import reducer from 'lib/reducer';
import getInitialState from 'lib/get-initial-state';
import {
  cloudGet,
  cloudSavePlaylists,
  cloudSaveOther,
} from 'lib/actions/cloud';
import getStyles from './get-styles';
import storage from 'lib/storage';
import cloudStatuses from 'lib/cloud-statuses';

const Page = ({ Component, pageProps }) => {
  const [store, dispatch] = useReducer(reducer, null, getInitialState);
  const {
    cloud: {
      key,
      path,
      user,
      status,
      playlists: { changes: playlistsChanges },
      other: { changes: otherChanges },
    },
  } = store;
  const dimensions = useWindowDimensions();
  const styles = useMemo(() => getStyles(dimensions), [dimensions]);

  useEffect(() => {
    storage.multiGet(['type', 'key', 'path', 'user']).then((pairs) => {
      const data = pairs.reduce((data, [key, value]) => {
        switch (key) {
          case 'type':
            data[key] = value || 'dropbox';
            break;
          case 'user':
            data[key] = value || 'default';
            break;
          default:
            data[key] = value || '';
        }

        return data;
      }, {});

      dispatch({
        type: 'cloud-update-many',
        payload: { status: cloudStatuses.readyToGet, ...data },
      });
    });
  }, []);

  useEffect(() => {
    if (status === cloudStatuses.readyToGet) {
      if (key && path && user) {
        cloudGet(store)
          .then((storeUpdates) => {
            dispatch({ type: 'store-update', payload: storeUpdates });
            dispatch({
              type: 'notifications-add',
              payload: {
                type: 'success',
                message: 'Successfully downloaded from cloud',
                id: uuidv4(),
              },
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
      } else {
        dispatch({
          type: 'cloud-update',
          payload: ['status', cloudStatuses.disconnected],
        });
      }
    }
  }, [status, key, path, user, store]);

  useEffect(() => {
    if (
      ![
        cloudStatuses.readyToGet,
        cloudStatuses.initial,
        cloudStatuses.disconnected,
      ].includes(status)
    ) {
      cloudSavePlaylists(store);
    }
  }, [playlistsChanges, status, store]);

  useEffect(() => {
    if (
      ![
        cloudStatuses.readyToGet,
        cloudStatuses.initial,
        cloudStatuses.disconnected,
      ].includes(status)
    ) {
      cloudSaveOther(store);
    }
  }, [status, store, otherChanges]);

  return (
    <View>
      {[cloudStatuses.readyToGet, cloudStatuses.initial].includes(status) ? (
        <View style={styles.loading}>
          <Icon style={styles.icon} icon="loading animate-spin" />
        </View>
      ) : (
        <View style={styles.container}>
          <Options {...{ store, dispatch }} />
          <Player {...{ store, dispatch }} />
          <Navigation
            {...{
              playlists: store.playlists,
              status: store.cloud.status,
              dispatch,
            }}
          />
          <View style={styles.main}>
            <Component {...{ pageProps, store, dispatch }} />
          </View>
        </View>
      )}
      <Notifications {...{ notifications: store.notifications, dispatch }} />
    </View>
  );
};

Page.propTypes = {
  Component: PropTypes.any.isRequired,
  pageProps: PropTypes.object,
};

Page.defaultProps = {
  pageProps: {},
};

export default Page;
