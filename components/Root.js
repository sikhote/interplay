import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import css from '../styles/root';
import Player from './Player';
import Navigation from './Navigation';
import LoadingBar from './LoadingBar';

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
