import React, { useReducer, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Global } from '@emotion/core';
import Head from 'next/head';
import { ToastContainer } from 'react-toastify';
import Navigation from '../Navigation';
import Player from '../Player';
import Icon from '../Icon';
import reducer from '../../lib/reducer';
import notifier from '../../lib/notifier';
import getInitialState from '../../lib/get-initial-state';
import { cloudGet } from '../../lib/actions/cloud';
import styles from './styles';

const Page = ({ Component, pageProps }) => {
  const [store, dispatch] = useReducer(reducer, null, getInitialState);
  const {
    cloud: { key, path, user, status },
  } = store;

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

  return (
    <div>
      <Head>
        <link rel="stylesheet" href="/css/animation.css" />
        <link rel="stylesheet" href="/css/fontello.css" />
      </Head>
      <Global styles={styles.global} />
      <ToastContainer />
      {status === 'initial' ? (
        <div css={styles.loading}>
          <Icon css={styles.icon} icon="loading animate-spin" />
        </div>
      ) : (
        <div css={styles.container}>
          <Player {...{ store, dispatch }} />
          <Navigation {...{ store, dispatch }} />
          <div css={styles.main}>
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
