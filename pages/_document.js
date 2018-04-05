import React from 'react';
import Document, { Head, Main, NextScript } from 'next/document';

export default class extends Document {
  render() {
    return (
      <html lang="en">
        <Head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, shrink-to-fit=no"
          />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/static/images/favicons/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/static/images/favicons/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/static/images/favicons/favicon-16x16.png"
          />
          <link
            rel="manifest"
            href="/static/images/favicons/site.webmanifest"
          />
          <link
            rel="mask-icon"
            href="/static/images/favicons/safari-pinned-tab.svg"
            color="#5bbad5"
          />
          <link
            rel="shortcut icon"
            href="/static/images/favicons/favicon.ico"
          />
          <meta name="msapplication-TileColor" content="#da532c" />
          <meta
            name="msapplication-config"
            content="/static/images/favicons/browserconfig.xml"
          />
          <meta name="theme-color" content="#ffffff" />
          <link
            rel="stylesheet"
            href="//cdnjs.cloudflare.com/ajax/libs/antd/3.0.0/antd.min.css"
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
