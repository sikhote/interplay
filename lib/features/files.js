import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import storage from 'lib/storage';
import { notify } from 'lib/features/notifications';
import service from 'lib/service';

const getInitialState = () => ({
  entries: [],
  status: 'pending',
  lastSuccess: undefined,
});
const serviceFile = '/files.json';

export const sync = createAsyncThunk(
  'files/sync',
  async (
    payload,
    { getState, dispatch, rejectWithValue, fulfillWithValue },
  ) => {
    const state = getState();

    return service('syncFiles', state)
      .then((entries) => {
        const files = {
          ...state.files,
          status: 'done',
          entries,
          lastSuccess: Date.now(),
        };
        storage.setItem('files', files);
        service('upload', state, { file: serviceFile, contents: files });
        return fulfillWithValue(files);
      })
      .catch(({ message, errorCode }) => {
        dispatch(notify({ type: 'error', message }));
        return rejectWithValue(errorCode);
      });
  },
);

export const get = createAsyncThunk(
  'files/get',
  async (payload, { getState, dispatch, fulfillWithValue }) => {
    const state = getState();
    const localFiles = await storage.getItem('files');

    // Save local to redux
    if (localFiles && localFiles.status === 'done') {
      return fulfillWithValue(localFiles);
    }

    // If no files exist in localstorage, check if service has some stored
    const serviceFiles = await service('download', state, serviceFile).catch(
      () => null,
    );

    // Save service to redux and localstorage
    if (serviceFiles) {
      storage.setItem('files', serviceFiles);
      return fulfillWithValue(serviceFiles);
    }

    // If no files exist in service then start fresh
    dispatch(sync());
  },
);

export const slice = createSlice({
  name: 'files',
  initialState: getInitialState(),
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(sync.pending, (state) => {
      state.status = 'pending';
    });
    builder.addCase(sync.rejected, (state) => {
      state.status = 'done';
      state.entries = [];
      state.lastSuccess = undefined;
    });
    builder.addCase(sync.fulfilled, (state, action) => {
      state.status = 'done';
      state.entries = action.payload.entries;
      state.lastSuccess = action.payload.lastSuccess;
    });
    builder.addCase(get.fulfilled, (state, action) => {
      return { ...action.payload, status: 'done' };
    });
  },
});

// export const { } = slice.actions;

export default slice.reducer;
