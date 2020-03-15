import React, { useState, useEffect, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useWindowDimensions, View } from 'react-native';
import Icon from '../Icon';
import Text from '../Text';
import getStyles from './get-styles';

const halfSteps = [-999, -100, -50, -30, -20, -12, -8, -5, -1];
const steps = [...halfSteps, 0, ...halfSteps.slice().reverse(), -999];
const stepIntervalMs = 15;
const middleIntervalMs = 1000;

const Notifications = ({ notifications, dispatch }) => {
  const dimensions = useWindowDimensions();
  const styles = useMemo(() => getStyles(dimensions), [dimensions]);
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
      if (message.stepIndex === steps.length - 1) {
        dispatch({ type: 'notifications-remove', payload: message.id });
      } else {
        const interval =
          steps[message.stepIndex] === 0 ? middleIntervalMs : stepIntervalMs;
        setTimeout(
          () =>
            updateStepIndex(
              index,
              message.stepIndex ? message.stepIndex + 1 : 1,
            ),
          interval,
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
