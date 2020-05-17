import React from 'react';
import PropTypes from 'prop-types';
import Text from 'components/Text';
import styles from './styles';

const H1 = ({ style, ...props }) => (
  <Text style={[styles.root, style]} {...props} />
);

H1.propTypes = {
  style: PropTypes.any,
};

H1.defaultProps = {
  style: {},
};

export default H1;
