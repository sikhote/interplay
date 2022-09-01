import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import service from 'lib/service';

const getInitialState = () => [];
const serviceFile = '/playlists.json';

export const save = createAsyncThunk(
  'playlists/save',
  async (payload, { getState }) => {
    const state = getState();
    service('upload', state, { file: serviceFile, contents: state.playlists });
  },
);

export const get = createAsyncThunk(
  'playlists/get',
  async (payload, { getState, dispatch, fulfillWithValue }) => {
    const state = getState();

    // Check if service has some stored
    const servicePlaylists = await service(
      'download',
      state,
      serviceFile,
    ).catch(() => null);

    // Save service to redux
    if (servicePlaylists) {
      return fulfillWithValue(servicePlaylists);
    }

    // If no files exist in service then start fresh with existing empty array
  },
);

export const slice = createSlice({
  name: 'playlists',
  initialState: getInitialState(),
  reducers: {
    add: (state, action) => {
      return state.push(action.payload);
    },
    remove: (state, action) => {
      console.log('remove');
    },
    edit: (state, action) => {
      console.log('edit');
    },
    addItem: (state, action) => {
      console.log('add item');
    },
    removeItem: (state, action) => {
      console.log('remove item');
    },
    moveItem: (state, action) => {
      console.log('move item');
    },
  },
  extraReducers: (builder) => {
    builder.addCase(get.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export const { add, remove, edit, addItem, removeItem, moveItem } =
  slice.actions;

export default slice.reducer;
