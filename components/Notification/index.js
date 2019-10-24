import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../Icon';
import Text from '../Text';
import styles from './styles';

const Notification = ({ children, type }) => (
  <Text css={styles.root}>
    <Icon
      css={type === 'success' ? styles.iconSuccess : styles.iconError}
      icon={type === 'success' ? 'check' : 'cancel'}
    />{' '}
    {children}
  </Text>
);

Notification.propTypes = {
  children: PropTypes.any.isRequired,
  type: PropTypes.string.isRequired,
};

export default Notification;
