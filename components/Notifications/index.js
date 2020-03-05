import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useWindowDimensions, View } from 'react-native';
import Icon from '../Icon';
import Text from '../Text';
import getStyles from './get-styles';

const steps = [-999, -50, -20, -10, -5, -1, 0, 0, 0, 0, 0, 0, 0, 0, -5, -10, -20, -35, -50, -999];
const intervalMs = 100;

const Notifications = ({ notifications, dispatch }) => {
  const dimensions = useWindowDimensions();
  const styles = getStyles(dimensions);
  const [messages, messagesSet] = useState([]);
  const updateStepIndex = useCallback(
    (index, value) => {
      const newMessages = messages.slice();
      newMessages[index].stepIndex = value;
      messagesSet(newMessages);
    },
    [messages],
  );

  useEffect(() => {
    messagesSet(notifications.slice());
  }, [notifications]);

  useEffect(() => {
    messages.forEach((message, index) => {
      if (message.stepIndex === steps.length) {
        // dispatch({ type: 'notifications-remove', payload: message.id });
      } else {
        setTimeout(
          () =>
            updateStepIndex(
              index,
              message.stepIndex ? message.stepIndex + 1 : 1,
            ),
          intervalMs,
        );
      }
    });
  }, [messages, updateStepIndex, dispatch]);

  return (
    <>
      {messages.map(({ stepIndex = 0, type, message, id }) => (
        <View
          key={id}
          style={Object.assign({}, styles.item, { top: steps[stepIndex] })}
        >
          <View key={id} style={styles.itemInner}>
            <Text>
              <Icon
                style={Object.assign(
                  {},
                  styles.icon,
                  type === 'success' ? styles.iconSuccess : styles.iconError,
                )}
                icon={type === 'success' ? 'check' : 'cancel'}
              />
              {message}
            </Text>
          </View>
        </View>
      ))}
    </>
  );
};

Notifications.propTypes = {
  notifications: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default Notifications;
