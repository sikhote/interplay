import React from 'react';
import antd from 'antd/dist/antd.css';
import Document, { Head, Main, NextScript } from 'next/document';
import flush from 'styled-jsx/server';
// https://github.com/zeit/next.js/blob/fe1b3e89f1d6253726074ee21755422b0c664197/examples/with-global-stylesheet/next.config.js
export default class extends Document {
  static getInitialProps({ renderPage }) {
    const { html, head, errorHtml, chunks } = renderPage();
    const styles = flush();
    return { html, head, errorHtml, chunks, styles };
  }

  render() {
    return (
      <html lang="en">
        <Head>
          <style dangerouslySetInnerHTML={{ __html: antd }} />
          <style>{`
            body {
              background: grey;
            }
          `}</style>
        </Head>
        <body className="custom_class">
          {this.props.customValue}
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
