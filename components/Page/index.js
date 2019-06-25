import React, { useReducer } from 'react';
import PropTypes from 'prop-types';
import { Global } from '@emotion/core';
import Head from 'next/head';
import Navigation from '../Navigation';
import Player from '../Player';
import reducer from '../../lib/reducer';
import getInitialState from '../../lib/get-initial-state';
import styles from './styles';

const Page = ({ Component, pageProps }) => {
  const [store, dispatch] = useReducer(reducer, null, getInitialState);

  return (
    <div>
      <Head>
        <link rel="stylesheet" href="/static/css/fontello.css" />
      </Head>
      <Global styles={styles.global} />
      <div css={styles.container}>
        <Player {...{ store, dispatch }} />
        <Navigation {...{ store, dispatch }} />
        <div css={styles.main}>
          <Component {...{ pageProps, store, dispatch }} />
        </div>
      </div>
    </div>
  );
};

Page.propTypes = {
  children: PropTypes.any.isRequired,
  Component: PropTypes.any.isRequired,
  pageProps: PropTypes.object,
};

Page.defaultProps = {
  pageProps: {},
};

export default Page;

// class Page extends React.PureComponent {
//   componentDidMount() {
//     this.tryCloudGet();
//   }

//   tryCloudGet() {
//     const {
//       store: { dispatch, getState },
//     } = this.props;
//     const {
//       settings: {
//         cloud: { key, path, isConnected },
//       },
//     } = getState();

//     if (!isConnected && key && path) {
//       dispatch(cloudGet());
//     }
//   }

//   render() {
//     const { children, store } = this.props;

//     return (
//       <ReduxProvider store={store}>

//       </ReduxProvider>
//     );
//   }
// }
