import React from 'react';
import PropTypes from 'prop-types';
import { View, Picker } from 'react-native';
import Icon from '../Icon';
import Text from '../Text';
import styles from './styles';

const Select = ({ options, value, icon, style, ...props }) => (
  <View style={[styles.root, icon ? styles.rootWithIcon : {}, style]}>
    {Boolean(icon) && (
      <Text style={styles.icon}>
        <Icon icon={icon} />
      </Text>
    )}
    <Picker selectedValue={value} style={styles.select} {...props}>
      <Picker.Item value="" label="" />
      {options.map(({ key, title, value }) => (
        <Picker.Item key={key} value={value} label={title} />
      ))}
    </Picker>
  </View>
);

Select.propTypes = {
  icon: PropTypes.string,
  options: PropTypes.array.isRequired,
  value: PropTypes.any,
  style: PropTypes.any,
};

Select.defaultProps = {
  icon: '',
  value: undefined,
  style: {},
};

export default Select;
