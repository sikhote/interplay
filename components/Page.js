import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Router from 'next/router';
import { cloudGet } from '../actions/cloud';
import Navigation from './Navigation';

class Page extends Component {
  componentDidMount() {
    const currentPath = window.location.pathname.replace(/\/$/, '');
    console.log('-----------');
    console.log(window.location.pathname);
    console.log(currentPath);
    if (currentPath && Router.route !== currentPath) {
      console.log('here we go!');
      Router.push(currentPath);
    }
  }
  componentWillReceiveProps({ hasCloudStore, cloud, cloudGet }) {
    if (!hasCloudStore && cloud.key && cloud.path) {
      cloudGet();
    }
  }
  render() {
    return (
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
