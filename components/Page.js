import React from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router';
import { connect } from 'react-redux';
import Head from 'next/head';
import qp from 'query-parse';
import Navigation from './Navigation';
import LoadingBar from './LoadingBar';
import Player from './Player';
import { cloudGet } from '../actions/cloud';
import content from '../lib/content';
import { match } from '../lib/routing';
import pageStyle from '../styles/page';
import globalStyle from '../styles/global';
import { settingsReplace } from '../actions/settings';

const isWeb = typeof window !== 'undefined';
const getCurrentPath = () => {
  const path = isWeb && window.location.pathname.replace(/\/$/, '');
  return isWeb ? path || '/' : '';
};
const getPage = currentPath => currentPath.replace(/^\//, '');
const tryCloudGet = ({
  cloud: { hasCloudStore },
  settings: { cloud: { key, path } },
  cloudGet,
}) => {
  if (!hasCloudStore && key && path) {
    cloudGet();
  }
};

class Page extends React.Component {
  constructor(props) {
    super(props);
    const { cloud, settings, cloudGet } = props;
    tryCloudGet({ cloud, settings, cloudGet });
  }
  componentDidMount() {
    const currentPath = getCurrentPath();
    const { page = getPage(currentPath), ...params } = match(currentPath);

    if (Router.route !== `/${page}`) {
      Router.push(`/${page}?${qp.toString(params)}`, currentPath);
    }
  }
  componentDidUpdate() {
    const { cloud, settings, cloudGet } = this.props;
    tryCloudGet({ cloud, settings, cloudGet });
  }
  render() {
    const {
      title,
      children,
      className,
      files,
      settings,
      settingsReplace,
    } = this.props;
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
        <div className="navigation">
          <Navigation />
        </div>
        <div className="main">
          <Player {...{ files, settings, settingsReplace }} />
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
  settingsReplace: PropTypes.func.isRequired,
  cloud: PropTypes.object.isRequired,
  files: PropTypes.object.isRequired,
  settings: PropTypes.object.isRequired,
};

Page.defaultProps = {
  children: null,
  title: '',
  className: 'root',
};

export default connect(
  ({ cloud, files, settings }) => ({ cloud, files, settings }),
  dispatch => ({
    cloudGet: () => dispatch(cloudGet()),
    settingsReplace: settings => dispatch(settingsReplace(settings)),
  }),
)(Page);
