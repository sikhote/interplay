import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';

const IconButton = ({ loading, children, ...props }) => (
  <Button shape="circle" loading={loading} type="primary" {...props}>
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
