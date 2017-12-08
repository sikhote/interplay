import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Router from 'next/router';
import { LocaleProvider as Locale } from 'antd';
import enUS from 'antd/lib/locale-provider/en_US';
import { cloudGet } from '../actions/cloud';
import Navigation from './Navigation';

const tryCloudGet = ({ hasCloudStore, cloud: { key, path }, cloudGet }) => {
  if (!hasCloudStore && key && path) {
    cloudGet();
  }
};

class Page extends Component {
  constructor(props) {
    super(props);
    const { hasCloudStore, cloud, cloudGet } = props;
    tryCloudGet({ hasCloudStore, cloud, cloudGet });
  }
  componentDidMount() {
    const currentPath = window.location.pathname.replace(/\/$/, '');

    if (currentPath && Router.route !== currentPath) {
      Router.push(currentPath);
    }
  }
  componentWillReceiveProps(nextProps) {
    const { hasCloudStore, cloud, cloudGet } = nextProps;
    tryCloudGet({ hasCloudStore, cloud, cloudGet });
  }
  render() {
    return (
      <Locale locale={enUS}>
        <div>
          <style jsx>
            {`
              .main {
                display: grid;
                grid: 1fr / 200px 1fr;
                height: 100vh;
              }
            `}
          </style>
          <div className="main">
            <Navigation />
            <div>{this.props.children}</div>
          </div>
        </div>
      </Locale>
    );
  }
}

Page.propTypes = {
  children: PropTypes.any.isRequired,
  cloudGet: PropTypes.func.isRequired,
  cloud: PropTypes.object.isRequired,
  hasCloudStore: PropTypes.bool.isRequired,
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
