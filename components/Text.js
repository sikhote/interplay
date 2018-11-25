import React from 'react';
import PropTypes from 'prop-types';
import {
  colors,
  fontSizes,
  fontFamilies,
  lineHeights,
  fontWeights,
} from '../lib/styling';
import translations from '../lib/translations';

const Text = ({
  children,
  fontSize,
  color,
  fontWeight,
  fontFamily,
  lineHeight,
  messageId,
  width,
  textAlign,
  style,
  className,
}) => (
  <span
    style={{
      fontSize,
      color,
      fontWeight,
      fontFamily,
      lineHeight,
      width,
      textAlign,
      ...style,
    }}
    className={className || messageId}
  >
    {children}
    {messageId && translations[messageId]}
  </span>
);

Text.propTypes = {
  children: PropTypes.any,
  color: PropTypes.string,
  fontSize: PropTypes.number,
  fontWeight: PropTypes.string,
  fontFamily: PropTypes.string,
  lineHeight: PropTypes.string,
  messageId: PropTypes.string,
  width: PropTypes.any,
  textAlign: PropTypes.string,
  style: PropTypes.object,
  className: PropTypes.string,
};

Text.defaultProps = {
  children: null,
  color: colors.text,
  fontSize: fontSizes.a3,
  fontWeight: fontWeights.normal,
  fontFamily: fontFamilies.normal,
  lineHeight: lineHeights.normal,
  messageId: undefined,
  width: undefined,
  textAlign: 'left',
  style: {},
  className: '',
};

export default Text;
