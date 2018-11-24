import React from 'react';
import { fontSizes, colors, lineHeights } from '../lib/styling';
import Text from './Text';

const H1 = props => (
  <Text
    color={colors.h1}
    fontSize={fontSizes.h1}
    lineHeight={lineHeights.close}
    {...props}
  />
);

export default H1;
