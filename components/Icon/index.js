import React from 'react';
import PropTypes from 'prop-types';
import Text from 'components/Text';
import styles from './styles';

// Import { glyphs } from 'public/font/config';
// const glyphsMap = glyphs.reduce(
//   (acc, cur) => ({
//     ...acc,
//     [cur.css]: cur.code,
//   }),
//   {},
// );

const Icon = ({ icon, style, ...props }) => (
  <Text style={[styles.root, style]} {...props}>
    <span className={`icon-${icon}`} />
  </Text>
);

Icon.propTypes = {
  icon: PropTypes.string.isRequired,
  style: PropTypes.any,
};

Icon.defaultProps = {
  style: {},
};

export default Icon;
