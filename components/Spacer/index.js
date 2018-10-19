import React from 'react';
import PropTypes from 'prop-types';
import { View } from '../rnw';
import { spacing } from '../../lib/styling';
import styles from './styles';

const Spacer = ({ height }) => <View style={[styles.spacer, { height }]} />;

Spacer.propTypes = {
  height: PropTypes.number,
};

Spacer.defaultProps = {
  height: spacing.a5,
};

export default Spacer;
