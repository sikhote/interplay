import React from 'react';
import PropTypes from 'prop-types';
import Text from '../Text';

// Import { glyphs } from '../../public/font/config';
// const glyphsMap = glyphs.reduce(
//   (acc, cur) => ({
//     ...acc,
//     [cur.css]: cur.code,
//   }),
//   {},
// );

const Icon = ({ icon, ...props }) => (
  <Text color="inherit" {...props}>
    <span className={`icon-${icon}`} />
  </Text>
);

Icon.propTypes = {
  icon: PropTypes.string.isRequired,
};

export default Icon;
