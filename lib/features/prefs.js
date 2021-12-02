import { createSlice } from '@reduxjs/toolkit';

const getInitialState = () => ({
  user: 'main',
  folder: '',
});

export const slice = createSlice({
  name: 'prefs',
  initialState: getInitialState(),
  reducers: {
    user: (state, action) => {
      state.user = action.payload.user;
    },
    folder: (state, action) => {
      state.folder = action.payload.folder;
    },
  },
});

export const { user, folder } = slice.actions;

export default slice.reducer;
