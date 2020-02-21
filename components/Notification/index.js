import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Icon from '../Icon';
import Text from '../Text';
import styles from './styles';

const topValues = [-999, -5, -2, 0, -2, -5, 0, -999];
const intervalMs = 500;

const Notification = ({ children, type }) => {
  const [counter, counterSet] = useState(0);
  const [top, topSet] = useState(topValues[0]);

  // useEffect(() => {
  //   let interval = null;
  //   if (isActive) {
  //     interval = setInterval(() => {
  //       setSeconds(seconds => seconds + 1);
  //     }, 1000);
  //   } else if (!isActive && seconds !== 0) {
  //     clearInterval(interval);
  //   }
  //   return () => clearInterval(interval);
  // }, [isActive, seconds]);

  console.log(counter, top);

  return (
    <Text style={Object.assign({}, styles.root, { top })}>
      <Icon
        style={type === 'success' ? styles.iconSuccess : styles.iconError}
        icon={type === 'success' ? 'check' : 'cancel'}
      />{' '}
      {children}
    </Text>
  );
};

Notification.propTypes = {
  children: PropTypes.any.isRequired,
  type: PropTypes.string.isRequired,
};

export default Notification;
