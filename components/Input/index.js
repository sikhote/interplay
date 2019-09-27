import React from 'react';
import PropTypes from 'prop-types';
import { merge } from 'lodash';
import Text from '../Text';
import Icon from '../Icon';
import styles from './styles';

const Input = ({ icon, ...props }) => (
  <div css={styles.root}>
    {icon && (
      <Text color="text" css={styles.icon}>
        <Icon icon={icon} />
      </Text>
    )}
    <input
      css={merge({}, styles.input, icon ? styles.inputWithIcon : {})}
      {...props}
    />
  </div>
);

Input.propTypes = {
  icon: PropTypes.string,
};

Input.defaultProps = {
  icon: '',
};

export default Input;
