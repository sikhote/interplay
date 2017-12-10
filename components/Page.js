import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Router from 'next/router';
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
      <div className="root">
        <style jsx>
          {`
            .root {
              display: grid;
              height: 100vh;

              @media (max-width: 799px) {
                grid-template-areas: 'children' 'navigation';
                grid-template-columns: 1fr;
                grid-template-rows: 1fr 55px;
              }

              @media (min-width: 800px) {
                grid-template-areas: 'navigation children';
                grid-template-columns: 200px 1fr;
                grid-template-rows: 1fr;
              }
            }
          `}
        </style>
        <div style={{ gridArea: 'navigation' }}>
          <Navigation />
        </div>
        <div style={{ gridArea: 'children' }}>{this.props.children}</div>
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
