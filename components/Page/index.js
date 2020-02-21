import React, { useReducer, useEffect } from 'react';
import { useWindowDimensions } from 'react-native';
import PropTypes from 'prop-types';
import Head from 'next/head';
import Navigation from '../Navigation';
import Player from '../Player';
import Icon from '../Icon';
import reducer from '../../lib/reducer';
import notifier from '../../lib/notifier';
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
  const styles = getStyles(dimensions);

  useEffect(() => {
    if (status === 'initial') {
      if (key && path && user) {
        cloudGet(store)
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
      } else {
        dispatch({ type: 'cloud-update', payload: ['status', 'disconnected'] });
      }
    }
  }, [status, key, path, user, store]);

  useEffect(() => {
    if (status !== 'initial') {
      cloudSavePlaylists(store);
    }
  }, [playlistsChanges]);

  useEffect(() => {
    if (status !== 'initial') {
      cloudSaveOther(store);
    }
  }, [otherChanges]);

  return (
    <div>
      <Head>
        <link rel="stylesheet" href="/css/animation.css" />
        <link rel="stylesheet" href="/css/fontello.css" />
      </Head>
      {status === 'initial' ? (
        <div style={styles.loading}>
          <Icon style={styles.icon} icon="loading animate-spin" />
        </div>
      ) : (
        <div style={styles.container}>
          <Player {...{ store, dispatch }} />
          <Navigation {...{ store, dispatch }} />
          <div style={styles.main}>
            <Component {...{ pageProps, store, dispatch }} />
          </div>
        </div>
      )}
    </div>
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
