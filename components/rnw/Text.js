import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Text as RNWText } from 'react-native-web';
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
  messageId,
  messageValues,
  width,
  textAlign,
  numberOfLines,
  style,
}) => (
  <RNWText
    style={[{
      fontSize,
      color,
      fontWeight,
      fontFamily,
      lineHeight,
      width,
      textAlign,
    }].concat(style)}
    numberOfLines={numberOfLines}
    className={messageId}
  >
    {children}
    {!!messageId && <FormattedMessage id={messageId} values={messageValues} />}
  </RNWText>
);

Text.propTypes = {
  children: PropTypes.any,
  color: PropTypes.string,
  fontSize: PropTypes.number,
  fontWeight: PropTypes.string,
  fontFamily: PropTypes.string,
  lineHeight: PropTypes.string,
  messageId: PropTypes.string,
  messageValues: PropTypes.object,
  width: PropTypes.any,
  textAlign: PropTypes.string,
  numberOfLines: PropTypes.number,
  style: PropTypes.object,
};

Text.defaultProps = {
  children: null,
  color: colors.text,
  fontSize: fontSizes.a3,
  fontWeight: fontWeights.normal,
  fontFamily: fontFamilies.normal,
  lineHeight: lineHeights.normal,
  messageId: undefined,
  messageValues: undefined,
  width: undefined,
  textAlign: 'left',
  numberOfLines: undefined,
  style: {},
};

export default Text;
