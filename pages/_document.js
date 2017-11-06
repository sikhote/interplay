import React from 'react';
import antd from 'antd/dist/antd.min.css';
import Document, { Head, Main, NextScript } from 'next/document';
import flush from 'styled-jsx/server';

export default class extends Document {
  static getInitialProps({ renderPage }) {
    const { html, head, errorHtml, chunks } = renderPage();
    const styles = flush();
    return { html, head, errorHtml, chunks, styles };
  }

  render() {
    const { __NEXT_DATA__ } = this.props;

    return (
      <html lang="en">
        <Head>
          <title>clairic</title>
          <link
            rel="stylesheet"
            type="text/css"
            href={`/static/app.css?${__NEXT_DATA__.buildId}`}
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
