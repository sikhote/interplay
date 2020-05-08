import React from 'react';
import PropTypes from 'prop-types';
import { Text as RNText } from 'react-native';
import styles from './styles';

const Text = ({ style, children, ...props }) => (
  <RNText style={[styles.root, style]} {...props}>
    {children}
  </RNText>
);

Text.propTypes = {
  children: PropTypes.any,
  style: PropTypes.any,
};

Text.defaultProps = {
  children: null,
  style: {},
};

export default Text;
