import React from 'react';
import Document, { Head, Main, NextScript } from 'next/document';

export default class extends Document {
  render() {
    return (
      <html lang="en">
        <Head>
          <title>clairic</title>
          <link
            rel="stylesheet"
            href="//cdnjs.cloudflare.com/ajax/libs/antd/2.13.11/antd.min.css"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
