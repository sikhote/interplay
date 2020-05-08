import React, { useReducer, useEffect, useMemo } from 'react';
import { useWindowDimensions, View } from 'react-native';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { v4 as uuidv4 } from 'uuid';
import Navigation from '../Navigation';
import Player from '../Player';
import Options from '../Options';
import Icon from '../Icon';
import Notifications from '../Notifications';
import reducer from '../../lib/reducer';
import getInitialState from '../../lib/get-initial-state';
import {
  cloudGet,
  cloudSavePlaylists,
  cloudSaveOther,
} from '../../lib/actions/cloud';
import getStyles from './get-styles';

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
    if (status === 'initial') {
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
      } else {
        dispatch({ type: 'cloud-update', payload: ['status', 'disconnected'] });
      }
    }
  }, [status, key, path, user, store]);

  useEffect(() => {
    if (!['initial', 'disconnected'].includes(status)) {
      cloudSavePlaylists(store);
    }
  }, [playlistsChanges, status, store]);

  useEffect(() => {
    if (!['initial', 'disconnected'].includes(status)) {
      cloudSaveOther(store);
    }
  }, [status, store, otherChanges]);

  return (
    <View>
      <Head>
        <style dangerouslySetInnerHTML={{ __html: global }} />
      </Head>
      {status === 'initial' ? (
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
