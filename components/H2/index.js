import React from 'react';
import Text from '../Text';
import styles from './styles';

const H2 = (props) => (
  <Text fontWeight="bold" fontSize="h2" style={styles.root} {...props} />
);

export default H2;
