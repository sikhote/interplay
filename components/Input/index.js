import React from 'react';
import PropTypes from 'prop-types';
import { merge } from 'lodash';
import { TextInput, View } from 'react-native';
import Text from '../Text';
import Icon from '../Icon';
import styles from './styles';

const Input = ({ icon, size, style, ...props }) => (
  <View style={Object.assign({}, styles.root, style)}>
    {Boolean(icon) && (
      <Text
        color="text"
        style={merge(
          {},
          styles.icon,
          size === 'small' ? styles.iconIsSmall : {},
        )}
      >
        <Icon icon={icon} />
      </Text>
    )}
    <TextInput
      style={merge(
        {},
        styles.input,
        icon ? styles.inputWithIcon : {},
        size === 'small' ? styles.inputIsSmall : {},
        size === 'small' && icon ? styles.inputWithIconIsSmall : {},
      )}
      {...props}
    />
  </View>
);

Input.propTypes = {
  icon: PropTypes.string,
  size: PropTypes.string,
  style: PropTypes.object,
};

Input.defaultProps = {
  icon: '',
  size: 'medium',
  style: {},
};

export default Input;
