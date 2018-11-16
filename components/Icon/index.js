import React from 'react';
import PropTypes from 'prop-types';
import Text from '../Text';
import styles from './styles';

const Icon = ({ icon, ...props }) => (
	<Text className="text" {...props}>
		<style jsx>{styles}</style>
		<i className={`icon-${icon}`} />
	</Text>
);

Icon.propTypes = {
	icon: PropTypes.string.isRequired,
};

export default Icon;
