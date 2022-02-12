import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

const getInitialState = () => [];

export const notify =
  ({ type, message }) =>
  async (dispatch) => {
    const notification = { status: 'new', message, id: uuidv4() };

    switch (type) {
      case 'error':
        Object.assign(notification, { title: 'Hmmm!', color: 'red' });
        break;
      case 'success':
        Object.assign(notification, { title: 'Yay!', color: 'teal' });
        break;
      default:
        Object.assign(notification, { title: 'Heads up!' });
    }

    dispatch(add(notification));
  };

export const slice = createSlice({
  name: 'notifications',
  initialState: getInitialState(),
  reducers: {
    add: (state, action) => {
      state.push(action.payload);
    },
    active: (state, action) => {
      const i = state.findIndex(({ id }) => id === action.payload);
      state[i].status = 'active';
    },
    remove: (state, action) => {
      return state.filter(({ id }) => id !== action.payload);
    },
  },
});

export const { add, active, remove } = slice.actions;

export default slice.reducer;
