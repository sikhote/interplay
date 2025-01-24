import { useEffect } from 'react';
import store from 'lib/store';
import { MantineProvider } from '@mantine/core';
import { useColorScheme } from '@mantine/hooks';
import { NotificationsProvider } from '@mantine/notifications';
import Auth from 'components/Auth';
import useNotifications from 'lib/hooks/useNotifications';
import { Provider as ReduxProvider, useDispatch } from 'react-redux';
import * as authActions from 'lib/features/auth';
import { rtlCache } from '../rtl-cache';

const App = ({ Component, pageProps }) => {
  const dispatch = useDispatch();
  useNotifications();

  useEffect(() => {
    dispatch(authActions.startAuth());
  }, [dispatch]);

  return (
    <main>
      <Auth />
      <Component {...{ ...pageProps }} />
    </main>
  );
};

const Providers = (props) => {
  const colorScheme = useColorScheme();

  return (
    <ReduxProvider store={store}>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{ colorScheme, primaryColor: 'teal' }}
        emotionCache={rtlCache}
      >
        <NotificationsProvider position="top-center">
          <App {...props} />
        </NotificationsProvider>
      </MantineProvider>
    </ReduxProvider>
  );
};

export default Providers;
