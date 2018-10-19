import React from 'react';
import PropTypes from 'prop-types';
import { TextInput as RNWTextInput } from 'react-native-web';
import styles from './styles';
import { View } from '../';
import { colors } from '../../../lib/styling';

const TextInput = ({ style, prefix, ...props }) => (
  <View style={styles.container}>
    {prefix && <View style={styles.prefix}>{prefix}</View>}
    <RNWTextInput
      {...props}
      style={[styles.textInput, style]}
      placeholderTextColor={colors.textInputPlaceholder}
    />
  </View>
);

TextInput.propTypes = {
  style: PropTypes.any,
  prefix: PropTypes.any,
};

TextInput.defaultProps = {
  style: {},
  prefix: undefined,
};

export default TextInput;
