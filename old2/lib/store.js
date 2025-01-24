import { configureStore } from '@reduxjs/toolkit';
import auth from 'lib/features/auth';
import files from 'lib/features/files';
import notifications from 'lib/features/notifications';

const store = configureStore({ reducer: { auth, notifications, files } });

export default store;
