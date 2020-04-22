import React from 'react';
import PropTypes from 'prop-types';
import { Text as RNText } from 'react-native';
import {
  colors,
  fontSizes,
  fontFamilies,
  lineHeights,
  fontWeights,
} from '../../lib/styling';

const Text = ({
  children,
  fontSize,
  color,
  fontWeight,
  fontFamily,
  lineHeight,
  textAlign,
  textTransform,
  style,
  ...props
}) => (
  <RNText
    style={{
      fontSize: fontSizes[fontSize],
      color: colors[color],
      fontWeight: fontWeights[fontWeight],
      fontFamily: fontFamilies[fontFamily],
      lineHeight: lineHeights[lineHeight] * fontSizes[fontSize],
      textAlign,
      textTransform,
      ...style,
    }}
    {...props}
  >
    {children}
  </RNText>
);

Text.propTypes = {
  children: PropTypes.any,
  color: PropTypes.string,
  fontSize: PropTypes.string,
  fontWeight: PropTypes.string,
  fontFamily: PropTypes.string,
  lineHeight: PropTypes.string,
  textAlign: PropTypes.string,
  style: PropTypes.object,
  className: PropTypes.string,
  textTransform: PropTypes.string,
};

Text.defaultProps = {
  children: null,
  color: 'text',
  fontSize: 'c',
  fontWeight: 'normal',
  fontFamily: 'normal',
  lineHeight: 'normal',
  textAlign: 'left',
  style: {},
  className: '',
  textTransform: '',
};

export default Text;
