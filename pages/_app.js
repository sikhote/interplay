import React from 'react';
import NextApp, { Container } from 'next/app';
import Error from 'next/error';
import { syncRouting, getCurrentPath } from 'parlor';
import Providers from '../components/Providers';
import { matches, pages } from '../lib/routing';
import Empty from '../components/Empty';
import '../static/css/fontello.css';

class App extends NextApp {
  state = {
    synced: false,
  };
  componentDidMount() {
    syncRouting(matches, pages, () => this.setState({ synced: true }));
  }
  render() {
    const { Component, pageProps } = this.props;
    const { synced } = this.state;
    const currentPath = getCurrentPath();
    const match = matches.find(m => m(currentPath));
    const { page = '' } = match ? match(currentPath) : {};

    return (
      <Container>
        <Providers>
          {synced ? (
            !match || !pages.includes(page) ? (
              <Error statusCode={404} />
            ) : (
              <Component {...pageProps} />
            )
          ) : (
            <Empty />
          )}
        </Providers>
      </Container>
    );
  }
}

export default App;
