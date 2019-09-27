import React, { useReducer, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Global } from '@emotion/core';
import Head from 'next/head';
import Navigation from '../Navigation';
import Player from '../Player';
import reducer from '../../lib/reducer';
import getInitialState from '../../lib/get-initial-state';
import { cloudGet } from '../../requests/cloud';
import styles from './styles';

const Page = ({ Component, pageProps }) => {
  const [store, dispatch] = useReducer(reducer, null, getInitialState);
  const {
    cloud: { key, path, status },
  } = store;
  const { playlists } = store;

  useEffect(() => {
    if (status === 'not-tried' && key && path) {
      cloudGet({ store, dispatch });
    }
  }, [store, status, key, path]);

  return (
    <div>
      <Head>
        <link rel="stylesheet" href="/static/css/animation.css" />
        <link rel="stylesheet" href="/static/css/fontello.css" />
      </Head>
      <Global styles={styles.global} />
      <div css={styles.container}>
        <Player {...{ store, dispatch }} />
        <Navigation {...{ playlists, dispatch }} />
        <div css={styles.main}>
          <Component {...{ pageProps, store, dispatch }} />
        </div>
      </div>
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
