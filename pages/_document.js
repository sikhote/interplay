import React from 'react';
import 'antd/dist/antd.css';
import Document, { Head, Main, NextScript } from 'next/document';
import flush from 'styled-jsx/server';

export default class extends Document {
  static getInitialProps({ renderPage }) {
    const { html, head, errorHtml, chunks } = renderPage();
    const styles = flush();
    return { html, head, errorHtml, chunks, styles };
  }

  render() {
    console.log(this.props.__NEXT_DATA);
    return (
      <html lang="en">
        <Head>
          <title>clairic</title>
          <link rel="stylesheet" href={'/static/app.css'} />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
