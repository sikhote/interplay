import React from 'react';
import NextApp from 'next/app';
import Page from '../Page';

class App extends NextApp {
  render() {
    const { Component, pageProps } = this.props;
    return <Page {...{ Component, pageProps }} />;
  }
}

export default App;
