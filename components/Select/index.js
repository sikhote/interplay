import React from 'react';
import PropTypes from 'prop-types';
import Text from '../Text';
import styles from './styles';

const Select = ({ options, value, ...props }) => (
  <select css={styles.root} {...props}>
    {options.map(({ key, title, value }) => (
      <option key={key} value={value}>
        <Text>{title}</Text>
      </option>
    ))}
  </select>
);

Select.propTypes = {
  options: PropTypes.array.isRequired,
  value: PropTypes.any,
};

Select.defaultProps = {
  value: undefined,
};

export default Select;
