import React from 'react';
import NextApp, { Container } from 'next/app';
import Page from '../Page';

class App extends NextApp {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  render() {
    const { Component, pageProps } = this.props;

    return (
      <Container>
        <Page {...{ Component, pageProps }} />
      </Container>
    );
  }
}

export default App;
