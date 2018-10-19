import React from 'react';
import Document, { Head, Main, NextScript } from 'next/document';
import { get } from 'lodash';
import { AppRegistry } from '../components/rnw';

export default class IntlDocument extends Document {
  static async getInitialProps({ renderPage, req }) {
    AppRegistry.registerComponent('Main', () => Main);
    const { getStyleElement } = AppRegistry.getApplication('Main', {});
    const page = renderPage();
    const styles = React.Children.toArray([getStyleElement()]);
    return { ...page, locale: get(req, 'locale'), styles };
  }
  render() {
    const { locale } = this.props;

    return (
      <html lang={locale}>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
