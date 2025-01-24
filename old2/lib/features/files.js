import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
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

    // Check if service has some stored
    const serviceFiles = await service('download', state, serviceFile).catch(
      () => null,
    );

    // Save service to redux
    if (serviceFiles) {
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
