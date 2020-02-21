import React from 'react';
import PropTypes from 'prop-types';
import { merge } from 'lodash';
import Icon from '../Icon';
import Text from '../Text';
import styles from './styles';

const Select = ({ options, value, icon, ...props }) => (
  <div style={styles.root}>
    {icon && (
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
  </div>
);

Select.propTypes = {
  icon: PropTypes.string,
  options: PropTypes.array.isRequired,
  value: PropTypes.any,
};

Select.defaultProps = {
  icon: '',
  value: undefined,
};

export default Select;
