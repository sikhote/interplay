import React from 'react';
import PropTypes from 'prop-types';
import { merge } from 'lodash';
import Text from '../Text';
import Icon from '../Icon';
import styles from './styles';

const Input = ({ icon, size, ...props }) => (
  <div css={styles.root}>
    {icon && (
      <Text
        color="text"
        css={merge({}, styles.icon, size === 'small' ? styles.iconIsSmall : {})}
      >
        <Icon icon={icon} />
      </Text>
    )}
    <input
      css={merge(
        {},
        styles.input,
        icon ? styles.inputWithIcon : {},
        size === 'small' ? styles.inputIsSmall : {},
        size === 'small' && icon ? styles.inputWithIconIsSmall : {},
      )}
      {...props}
    />
  </div>
);

Input.propTypes = {
  icon: PropTypes.string,
  size: PropTypes.string,
};

Input.defaultProps = {
  icon: '',
  size: 'medium',
};

export default Input;
