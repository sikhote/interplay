import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { cloudGet } from '../actions/cloud';
import Navigation from './Navigation';

class Page extends PureComponent {
  componentWillReceiveProps({ hasCloudStore, cloud, cloudGet }) {
    if (!hasCloudStore && cloud.key && cloud.path) {
      // dropboxGet();
      console.log('get ittt');
    } else {
      console.log('not getting');
    }
  }
  render() {
    return (
      <div>
        <style jsx>{`
          .main  {
            display: grid;
            grid: 1fr / 200px 1fr;
            height: 100vh;
          }
        `}</style>
        <div className="main">
          <Navigation />
          {this.props.children}
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
    hasCloudStore: state.settings.hasCloudStore,
  }),
  dispatch => ({
    cloudGet: () => dispatch(cloudGet()),
  }),
)(Page);
