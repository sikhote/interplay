import React from 'react';
import NextApp, { Container } from 'next/app';
import Error from 'next/error';
import { syncRouting, getCurrentPath } from 'parlor';
import css from 'styled-jsx/css';
import { matches, pages } from '../lib/routing';
import Empty from '../components/Empty';
import Page from '../components/Page';

const styles = css.global`
	@import url('/static/css/fontello.css');
	@import url('/static/css/antd.min.css');

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
  constructor(props) {
    super(props);
    this.state = {
      synced: false,
    };
  }

  componentDidMount() {
    syncRouting(matches, pages, () => this.setState({ synced: true }));
  }

  render() {
    const { Component, pageProps } = this.props;
    const { synced } = this.state;
    const currentPath = getCurrentPath();
    const match = matches.find(m => m(currentPath));
    const { page = '' } = match ? match(currentPath) : {};

    return (
      <Container>
        <style jsx>{styles}</style>
        {synced ? (
          !match || !pages.includes(page) ? (
            <Error statusCode={404} />
          ) : (
            <Page>
              <Component {...pageProps} />
            </Page>
          )
        ) : (
          <Page>
            <Empty />
          </Page>
        )}
      </Container>
    );
  }
}

export default App;
