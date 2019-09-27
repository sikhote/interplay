import React from 'react';
import Text from '../Text';
import styles from './styles';

const H2 = props => (
  <Text
    uppercase
    fontWeight="bold"
    fontSize="h2"
    css={styles.root}
    {...props}
  />
);

export default H2;
