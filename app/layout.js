import '@mantine/core/styles.css';
import getMetadata from 'lib/getMetadata';
import { Analytics } from '@vercel/analytics/react';
import { MantineProvider, ColorSchemeScript } from '@mantine/core';
import { theme } from 'lib/theme';
import StoreProvider from 'components/StoreProvider';

export const metadata = getMetadata();

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function Layout({ children }) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript defaultColorScheme="auto" />
      </head>
      <body>
        <StoreProvider>
          <MantineProvider theme={theme} defaultColorScheme="auto">
            <nav>Layout!</nav>
            <main>{children}</main>
          </MantineProvider>
        </StoreProvider>
        <Analytics />
      </body>
    </html>
  );
}
