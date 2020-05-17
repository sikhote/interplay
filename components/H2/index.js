import React from 'react';
import PropTypes from 'prop-types';
import Text from 'components/Text';
import styles from './styles';

const H2 = ({ style, ...props }) => (
  <Text style={[styles.root, style]} {...props} />
);

H2.propTypes = {
  style: PropTypes.any,
};

H2.defaultProps = {
  style: {},
};

export default H2;
