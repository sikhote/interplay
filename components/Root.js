import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Player from '../components/Player';
import Navigation from '../components/Navigation';
import LoadingBar from '../components/LoadingBar';
import css from '../styles/root';

const Root = ({ children }) => (
  <div className="root">
    <style jsx>{css}</style>
    <LoadingBar />
    <div className="container">
      <div className="navigation">
        <Navigation />
      </div>
      <div className="main">
        <Player />
        {children}
      </div>
    </div>
  </div>
);

Root.propTypes = {
  children: PropTypes.any,
};

Root.defaultProps = {
  children: null,
};

export default connect(
  null,
  null,
)(Root);
