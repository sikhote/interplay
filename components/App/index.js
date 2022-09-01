import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { ConnectedRouter } from 'connected-next-router';
import { v4 as uuidv4 } from 'uuid';
// import Navigation from 'components/Navigation';
// import Player from 'components/Player';
// import Options from 'components/Options';
// import Icon from 'components/Icon';
// import Notifications from 'components/Notifications';
// import {
//   cloudGet,
//   cloudSavePlaylists,
//   cloudSaveOther,
// } from 'lib/actions/cloud';
import wrapper from 'lib/store';
import { MantineProvider } from '@mantine/core';
import { useColorScheme } from '@mantine/hooks';
import { NotificationsProvider } from '@mantine/notifications';
import Auth from 'components/Auth';
import { useSelector } from 'react-redux';
import Notifications from 'components/Notifications';

const App = ({ Component, pageProps }) => {
  const preferredColorScheme = useColorScheme();
  const [colorScheme, setColorScheme] = useState('dark');

  useEffect(() => {
    setColorScheme(preferredColorScheme);
  }, [preferredColorScheme]);

  return (
    <ConnectedRouter>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{ colorScheme, primaryColor: 'teal' }}
      >
        <NotificationsProvider position="top-center">
          <div>
            <Notifications />
            <Auth />
            <Component {...{ ...pageProps }} />
          </div>
        </NotificationsProvider>
      </MantineProvider>
    </ConnectedRouter>
  );
};

App.propTypes = {
  Component: PropTypes.any.isRequired,
  pageProps: PropTypes.object,
};

App.defaultProps = {
  pageProps: {},
};

const WrappedApp = wrapper.withRedux(App);

export default WrappedApp;
