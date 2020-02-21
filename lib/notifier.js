import React from 'react';
import Notification from '../components/Notification';

const consoleTypes = { success: 'log', error: 'error' };

export default ({ type, message, options = {} }) => {
  // toast[type](() => <Notification {...{ type }}>{message}</Notification>, {
  //   autoClose: 3000,
  //   ...options,
  // });

  // eslint-disable-next-line no-console
  console[consoleTypes[type]](message);
};
