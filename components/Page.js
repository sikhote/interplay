import React from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router';
import { connect } from 'react-redux';
import Head from 'next/head';
import qp from 'query-parse';
import Navigation from './Navigation';
import LoadingBar from './LoadingBar';
import { cloudGet } from '../actions/cloud';
import content from '../lib/content';
import { match } from '../lib/routing';
import pageStyle from '../styles/page';
import globalStyle from '../styles/global';

const isWeb = typeof window !== 'undefined';
const getCurrentPath = () => {
  const path = isWeb && window.location.pathname.replace(/\/$/, '');
  return isWeb ? path || '/' : '';
};
const getPage = currentPath => currentPath.replace(/^\//, '');
const tryCloudGet = ({ hasCloudStore, cloud: { key, path }, cloudGet }) => {
  if (!hasCloudStore && key && path) {
    cloudGet();
  }
};

class Page extends React.Component {
  constructor(props) {
    super(props);
    const { hasCloudStore, cloud, cloudGet } = props;
    tryCloudGet({ hasCloudStore, cloud, cloudGet });
  }
  componentDidMount() {
    const currentPath = getCurrentPath();
    const { page = getPage(currentPath), ...params } = match(currentPath);

    if (Router.route !== `/${page}`) {
      Router.push(`/${page}?${qp.toString(params)}`, currentPath);
    }
  }
  componentDidUpdate() {
    const { hasCloudStore, cloud, cloudGet } = this.props;
    tryCloudGet({ hasCloudStore, cloud, cloudGet });
  }
  render() {
    const { title, children, className } = this.props;
    const currentPath = getCurrentPath();
    const { page = getPage(currentPath) } = match(currentPath);

    return (
      <div className={className}>
        <Head>
          <title>
            {content.name}
            {title ? `${content.divider}${title}` : ''}
          </title>
        </Head>
        <style jsx global>
          {globalStyle}
        </style>
        <style jsx>{pageStyle}</style>
        <LoadingBar />
        <div style={{ gridArea: 'navigation' }}>
          <Navigation />
        </div>
        <div style={{ gridArea: 'children' }}>
          {isWeb && Router.route === `/${page}` && children}
        </div>
      </div>
    );
  }
}

Page.propTypes = {
  children: PropTypes.any,
  title: PropTypes.string,
  className: PropTypes.string,
  cloudGet: PropTypes.func.isRequired,
  cloud: PropTypes.object.isRequired,
  hasCloudStore: PropTypes.bool.isRequired,
};

Page.defaultProps = {
  children: null,
  title: '',
  className: 'root',
};

export default connect(
  state => ({
    cloud: state.settings.cloud,
    hasCloudStore: state.cloud.hasCloudStore,
  }),
  dispatch => ({
    cloudGet: () => dispatch(cloudGet()),
  }),
)(Page);
