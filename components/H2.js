import React from 'react';
import { fontSizes, fontWeights } from '../lib/styling';
import Text from './Text';

const H2 = props => (
  <Text
    uppercase
    fontWeight={fontWeights.bold}
    fontSize={fontSizes.h2}
    {...props}
  />
);

export default H2;
