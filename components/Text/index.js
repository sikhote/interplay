import React from 'react';
import PropTypes from 'prop-types';
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
  width,
  textAlign,
  textTransform,
  ...props
}) => (
  <div
    css={{
      fontSize: fontSizes[fontSize],
      color: colors[color],
      fontWeight: fontWeights[fontWeight],
      fontFamily: fontFamilies[fontFamily],
      lineHeight: lineHeights[lineHeight],
      width,
      textAlign,
      textTransform,
    }}
    {...props}
  >
    {children}
  </div>
);

Text.propTypes = {
  children: PropTypes.any,
  color: PropTypes.string,
  fontSize: PropTypes.string,
  fontWeight: PropTypes.string,
  fontFamily: PropTypes.string,
  lineHeight: PropTypes.string,
  width: PropTypes.any,
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
  width: undefined,
  textAlign: 'left',
  style: {},
  className: '',
  textTransform: '',
};

export default Text;
