import React from 'react';
import NextApp, { Container } from 'next/app';
import Router from 'next/router';
import Error from 'next/error';
import Providers from '../components/Providers';
import isBrowser from '../lib/isBrowser';
import { matches, getCurrentPath, pages } from '../lib/routing';
import syncRouting from '../lib/syncRouting';
import Empty from '../components/Empty';
import '../static/css/fontello.css';

class App extends NextApp {
  static async getInitialProps({ Component, ctx }) {
    const pageProps = Component.getInitialProps
      ? await Component.getInitialProps(ctx)
      : {};
    return { pageProps };
  }
  componentDidMount() {
    syncRouting();
  }
  render() {
    const { Component, pageProps } = this.props;
    const currentPath = getCurrentPath();
    const match = matches.find(m => m(currentPath));
    const { page = '' } = match ? match(currentPath) : {};

    return (
      <Container>
        <Providers>
          {isBrowser &&
            (!match || !pages.includes(page) ? (
              <Error statusCode={404} />
            ) : isBrowser && Router.pathname === currentPath ? (
              <Component {...pageProps} />
            ) : (
              <Empty />
            ))}
        </Providers>
      </Container>
    );
  }
}

export default App;
