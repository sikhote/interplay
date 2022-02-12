import React, { useEffect } from 'react';
import { useNotifications } from '@mantine/notifications';
import { useSelector, useDispatch } from 'react-redux';
import { active, remove } from 'lib/features/notifications';

const Notifications = () => {
  const notifications = useSelector((state) => state.notifications);
  const notificationsSystem = useNotifications();
  const dispatch = useDispatch();

  useEffect(() => {
    const newOnes = notifications.filter(({ status }) => status === 'new');
    const handler = (newOne) => {
      dispatch(active(newOne.id));
      notificationsSystem.showNotification(newOne);
      setTimeout(() => {
        dispatch(remove(newOne.id));
      }, 3000);
    };

    if (newOnes.length > 0) {
      const first = newOnes.shift();
      handler(first);

      newOnes.forEach((newOne, i) => {
        setTimeout(() => handler(newOne), 3000 * (i + 1));
      });
    }
  }, [notifications]);

  return null;
};

export default Notifications;
