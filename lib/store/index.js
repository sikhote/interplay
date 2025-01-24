import { useDispatch, useSelector, useStore } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import auth from 'lib/store/features/auth';
import files from 'lib/store/features/files';
import notifications from 'lib/store/features/notifications';

export const makeStore = () =>
  configureStore({ reducer: { auth, notifications, files } });

export const useAppDispatch = useDispatch;
export const useAppSelector = useSelector;
export const useAppStore = useStore;
