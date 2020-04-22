import React from 'react';
import PropTypes from 'prop-types';
import { merge } from 'lodash';
import { View } from 'react-native';
import Icon from '../Icon';
import Text from '../Text';
import styles from './styles';

const Select = ({ options, value, icon, style, ...props }) => (
  <View style={Object.assign({}, styles.root, style)}>
    {Boolean(icon) && (
      <Text color="text" style={styles.icon}>
        <Icon icon={icon} />
      </Text>
    )}
    <select
      value={value}
      style={merge({}, styles.select, icon ? styles.selectWithIcon : {})}
      {...props}
    >
      <option value="">-</option>
      {options.map(({ key, title, value }) => (
        <option key={key} value={value}>
          {title}
        </option>
      ))}
    </select>
  </View>
);

Select.propTypes = {
  icon: PropTypes.string,
  options: PropTypes.array.isRequired,
  value: PropTypes.any,
  style: PropTypes.object,
};

Select.defaultProps = {
  icon: '',
  value: undefined,
  style: {},
};

export default Select;
