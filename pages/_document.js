import Document, { Html, Head, Main, NextScript } from 'next/document';
import * as React from 'react';
// import { createGetInitialProps } from '@mantine/next';

// const getInitialProps = createGetInitialProps();
export default class AppDocument extends Document {
  // static getInitialProps = getInitialProps;

  render() {
    return (
      <Html>
        <Head>
          <link rel="icon" href="/assets/images/favicon.svg" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
