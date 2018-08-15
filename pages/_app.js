import React from 'react';
import App, { Container } from 'next/app';
import withRedux from 'next-redux-wrapper';
import Router from 'next/router';
import qp from 'query-parse';
import Root from '../components/Root';
import makeStore from '../lib/makeStore';
import isBrowser from '../lib/isBrowser';
import { getCurrentPath, getParams } from '../lib/routing';
import globalStyle from '../styles/global';
import { cloudGet } from '../actions/cloud';

class ReduxApp extends App {
  static async getInitialProps({ Component, ctx }) {
    const pageProps = Component.getInitialProps
      ? await Component.getInitialProps(ctx)
      : {};
    return { pageProps };
  }
  componentDidMount() {
    const currentPath = getCurrentPath();
    const { page, ...params } = getParams(currentPath);

    if (Router.route !== `/${page}`) {
      Router.push(`/${page}?${qp.toString(params)}`, currentPath);
    }

    this.tryCloudGet();
  }
  tryCloudGet() {
    const {
      store: { dispatch, getState },
    } = this.props;
    const {
      cloud: { hasCloudStore },
      settings: {
        cloud: { key, path },
      },
    } = getState();

    if (!hasCloudStore && key && path) {
      dispatch(cloudGet());
    }
  }
  render() {
    const { Component, pageProps } = this.props;
    const currentPath = getCurrentPath();
    const { page } = getParams(currentPath);

    return (
      <Container>
        <style jsx global>
          {globalStyle}
        </style>
        <Root>
          {isBrowser &&
            Router.route === `/${page}` && <Component {...pageProps} />}
        </Root>
      </Container>
    );
  }
}

export default withRedux(makeStore)(ReduxApp);
