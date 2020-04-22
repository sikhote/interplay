import React from 'react';
import Text from '../Text';
import styles from './styles';

const H1 = (props) => (
  <Text style={styles.root} fontSize="h1" lineHeight="close" {...props} />
);

export default H1;
