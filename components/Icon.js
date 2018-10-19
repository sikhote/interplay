import React from 'react';
import PropTypes from 'prop-types';
import { Text } from './rnw';

const Icon = ({ icon, ...props }) => (
  <Text {...props}>
    <i className={`icon-${icon}`} />
  </Text>
);

Icon.propTypes = {
  icon: PropTypes.string.isRequired,
};

export default Icon;
