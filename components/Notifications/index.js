import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { differenceBy } from 'lodash';
import Button from '../Button';
import Icon from '../Icon';
import Text from '../Text';
import styles from './styles';

const topValues = [-999, -5, -2, 0, -2, -5, 0, -999];
const intervalMs = 500;

const Notifications = ({ notifications, dispatch }) => {
  const [messages, messagesSet] = useState([]);

  useEffect(() => {
    const newMessages = differenceBy(notifications, messages, 'id');

    newMessages.forEach(message => {
      let interval = null;

      if (isActive) {
        interval = setInterval(() => {
          setSeconds(seconds => seconds + 1);
        }, 1000);
      } else if (!isActive && seconds !== 0) {
        clearInterval(interval);
      }
    });

    messagesSet(notifications);
  }, [notifications]);

  return (
    <div>
      {/* <Text style={styles.root}>
        <Icon
          style={type === 'success' ? styles.iconSuccess : styles.iconError}
          icon={type === 'success' ? 'check' : 'cancel'}
        />{' '}
        {children}
        //{' '}
      </Text> */}
    </div>
  );
};

Notifications.propTypes = {
  notifications: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default Notifications;
