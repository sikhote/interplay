import css from 'styled-jsx/css';
import React from 'react';
import NextApp, { Container } from 'next/app';
import Page from '../components/Page';

const styles = css.global`
	@import url('/static/css/fontello.css');

	* {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
	}
	.icon-play::before,
	.icon-fast-forward::before {
    margin-right: 0;
	}
`;

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
        <style jsx>{styles}</style>
        <Page>
          <Component {...pageProps} />
        </Page>
      </Container>
    );
  }
}

export default App;
