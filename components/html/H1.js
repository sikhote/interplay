import React from 'react';
import { Text } from '../rnw';
import { fontSizes, colors, lineHeights } from '../../lib/styling';

const H1 = props => (
  <Text
    color={colors.h1}
    fontSize={fontSizes.h1}
    lineHeight={lineHeights.close}
    {...props}
  />
);

export default H1;
