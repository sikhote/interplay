import React from 'react';
import { fontSizes, lineHeights } from '../lib/styling';
import Text from './Text';

const H1 = props => (
  <Text fontSize={fontSizes.h1} lineHeight={lineHeights.close} {...props} />
);

export default H1;
