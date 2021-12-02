import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { ConnectedRouter } from 'connected-next-router';
import { v4 as uuidv4 } from 'uuid';
// import Navigation from 'components/Navigation';
// import Player from 'components/Player';
// import Options from 'components/Options';
// import Icon from 'components/Icon';
// import Notifications from 'components/Notifications';
import {
  cloudGet,
  cloudSavePlaylists,
  cloudSaveOther,
} from 'lib/actions/cloud';
import styles from './styles';
import wrapper from 'lib/store';
import { Global } from '@emotion/react';

const App = ({ Component, pageProps }) => (
  <ConnectedRouter>
    <div>
      <Global styles={styles.global} />
      <Component {...{ ...pageProps }} />
    </div>
  </ConnectedRouter>
);

App.propTypes = {
  Component: PropTypes.any.isRequired,
  pageProps: PropTypes.object,
};

App.defaultProps = {
  pageProps: {},
};

const WrappedApp = wrapper.withRedux(App);

export default WrappedApp;
