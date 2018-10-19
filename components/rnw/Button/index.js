import React from 'react';
import PropTypes from 'prop-types';
import { transparentize } from 'polished';
import { snakeCase } from 'lodash';
import { View, TouchableOpacity, Text, ActivityIndicator } from '../';
import styles from './styles';
import {
  colors,
  lineHeights,
  fontSizes,
  fontWeights,
} from '../../../lib/styling';

const Button = ({
  loading,
  onPress,
  title,
  backgroundColor,
  color,
  width,
  disabled,
  style,
  className,
  fontSize,
}) => (
  <TouchableOpacity
    className={className || snakeCase(title)}
    disabled={disabled || loading}
    onPress={onPress}
    style={[
      styles.container,
      {
        ...(width
          ? {
              width: '100%',
              maxWidth: width,
            }
          : {}),
        backgroundColor:
          disabled || loading
            ? transparentize(0.5, backgroundColor)
            : backgroundColor,
      },
      style,
    ]}
  >
    {loading && (
      <View style={styles.loading}>
        <ActivityIndicator />
      </View>
    )}
    <Text
      fontWeight={fontWeights.bold}
      fontSize={fontSize}
      textAlign="center"
      lineHeight={lineHeights.close}
      color={color}
    >
      {loading ? ' ' : title.toUpperCase()}
    </Text>
  </TouchableOpacity>
);

Button.propTypes = {
  color: PropTypes.string,
  backgroundColor: PropTypes.string,
  title: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  width: PropTypes.any,
  disabled: PropTypes.bool,
  style: PropTypes.any,
  className: PropTypes.string,
  fontSize: PropTypes.number,
};

Button.defaultProps = {
  color: colors.white,
  backgroundColor: colors.a2,
  loading: false,
  width: undefined,
  disabled: false,
  style: {},
  className: '',
  fontSize: fontSizes.a3,
};

export default Button;
