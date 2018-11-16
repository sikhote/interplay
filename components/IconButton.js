import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';

const IconButton = ({ loading, children, ...props }) => (
	<Button loading={loading} {...props}>
		{!loading && children}
	</Button>
);

IconButton.propTypes = {
	loading: PropTypes.bool,
	children: PropTypes.any.isRequired,
};

IconButton.defaultProps = {
	loading: false,
};

export default IconButton;
