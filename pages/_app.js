import React from 'react';
import App, { Container } from 'next/app';
import withRedux from 'next-redux-wrapper';
import Router from 'next/router';
import qp from 'query-parse';
import Player from '../components/Player';
import Navigation from '../components/Navigation';
import LoadingBar from '../components/LoadingBar';
import makeStore from '../lib/makeStore';
import isBrowser from '../lib/isBrowser';
import { match, getPage, getCurrentPath } from '../lib/routing';
import appStyle from '../styles/app';
import globalStyle from '../styles/global';
import { cloudGet } from '../actions/cloud';

class ReduxApp extends App {
  static async getInitialProps({ Component, ctx }) {
    const pageProps = Component.getInitialProps
      ? await Component.getInitialProps(ctx)
      : {};
    return { pageProps };
  }
  constructor(props) {
    super(props);
    this.tryCloudGet();
  }
  componentDidMount() {
    const currentPath = getCurrentPath();
    const { page = getPage(currentPath), ...params } = match(currentPath);

    if (Router.route !== `/${page}`) {
      Router.push(`/${page}?${qp.toString(params)}`, currentPath);
    }
  }
  componentDidUpdate() {
    this.tryCloudGet();
  }
  tryCloudGet() {
    const { store: { dispatch, getState } } = this.props;
    const {
      cloud: { hasCloudStore },
      settings: { cloud: { key, path } },
    } = getState();

    if (!hasCloudStore && key && path) {
      dispatch(cloudGet());
    }
  }
  render() {
    const { Component, pageProps } = this.props;
    const currentPath = getCurrentPath();
    const { page = getPage(currentPath) } = match(currentPath);

    return (
      <Container>
        <style jsx global>
          {globalStyle}
        </style>
        <style jsx>{appStyle}</style>
        <LoadingBar />
        <div className="root">
          <div className="navigation">
            <Navigation />
          </div>
          <div className="main">
            <Player />
            {isBrowser &&
              Router.route === `/${page}` && <Component {...pageProps} />}
          </div>
        </div>
      </Container>
    );
  }
}

export default withRedux(makeStore)(ReduxApp);
