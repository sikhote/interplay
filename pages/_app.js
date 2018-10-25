import React from 'react';
import NextApp, { Container } from 'next/app';
import Router from 'next/router';
import Error from 'next/error';
import { syncRouting, isBrowser, getCurrentPath } from 'parlor';
import Providers from '../components/Providers';
import { matches, pages } from '../lib/routing';
import Empty from '../components/Empty';
import '../static/css/fontello.css';

class App extends NextApp {
  componentDidMount() {
    syncRouting({ matches, pages });
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
