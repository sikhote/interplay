import React from 'react';
import PropTypes from 'prop-types';

const Icon = ({ icon, ...props }) => (
  <span {...props}>
    <i className={`icon-${icon}`} />
  </span>
);

Icon.propTypes = {
  icon: PropTypes.string.isRequired,
};

export default Icon;
