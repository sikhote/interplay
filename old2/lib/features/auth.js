import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import storage from 'lib/storage';
import { notify } from 'lib/features/notifications';
import differenceInMinutes from 'date-fns/differenceInMinutes';
import serviceRequest from 'lib/service';
import * as filesActions from 'lib/features/files';
import * as playlistsActions from 'lib/features/playlists';

const getInitialState = () => ({
  // starting disconnected connecting connected authing authed
  status: 'starting',
  service: 'dropbox',
  data: undefined,
  members: undefined,
  memberId: undefined,
  user: '',
  folder: '',
  lastSuccess: undefined,
});

export const checkMembers = createAsyncThunk(
  'auth/checkMembers',
  async (
    payload,
    { getState, dispatch, rejectWithValue, fulfillWithValue },
  ) => {
    const state = getState();

    return serviceRequest('checkMembers', state)
      .then((result) => fulfillWithValue(result))
      .catch(({ message, errorCode }) => {
        dispatch(notify({ type: 'error', message }));
        return rejectWithValue(errorCode);
      });
  },
);

export const startAuth = () => async (dispatch) => {
  const accessToken = new URLSearchParams(window.location.search).get(
    'access_token',
  );
  console.log({ accessToken });
  const storedAuthInfo = (await storage.getItem('auth')) || {};

  // If coming from a dropbox redirect
  if (accessToken) {
    dispatch(
      connected({
        ...(storedAuthInfo || {}),
        data: accessToken,
        service: 'dropbox',
      }),
    );
    dispatch(checkMembers());
  } else if (storedAuthInfo) {
    dispatch(connected(storedAuthInfo));
    dispatch(checkFolder());
  } else {
    dispatch(status('disconnected'));
  }
};

export const attemptConnect = createAsyncThunk(
  'auth/attemptConnect',
  async (service) => serviceRequest('attemptConnect', { auth: { service } }),
);

export const checkFolder = createAsyncThunk(
  'auth/checkFolder',
  async (
    payload,
    { getState, dispatch, rejectWithValue, fulfillWithValue },
  ) => {
    const state = getState();
    const { auth } = state;
    const onSuccess = async () => {
      dispatch(filesActions.get());
      dispatch(playlistsActions.get());
    };

    // Exit early if recently successful to prevent spamming service
    if (
      auth.lastSuccess &&
      differenceInMinutes(Date.now(), auth.lastSuccess) <= 10
    ) {
      onSuccess();
      return fulfillWithValue();
    }

    return serviceRequest('checkFolder', state)
      .then(() => {
        const lastSuccess = Date.now();
        storage.setItem('auth', { ...auth, lastSuccess });
        onSuccess();
        return fulfillWithValue(lastSuccess);
      })
      .catch(({ message, errorCode }) => {
        dispatch(notify({ type: 'error', message }));
        return rejectWithValue(errorCode);
      });
  },
);

export const slice = createSlice({
  name: 'auth',
  initialState: getInitialState(),
  reducers: {
    status: (state, action) => {
      state.status = action.payload;
    },
    connected: (state, action) => {
      const {
        service,
        data,
        memberId,
        members,
        lastSuccess,
        user = '',
        folder = '',
      } = action.payload;
      Object.assign(state, {
        data,
        folder,
        lastSuccess,
        memberId,
        members,
        service,
        user,
      });
    },
    service: (state, action) => {
      state.service = action.payload;
    },
    user: (state, action) => {
      state.user = action.payload;
    },
    folder: (state, action) => {
      state.folder = action.payload;
    },
    memberId: (state, action) => {
      state.memberId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(checkFolder.pending, (state) => {
      if (state.status !== 'starting') {
        state.status = 'authing';
      }
    });
    builder.addCase(checkFolder.rejected, (state, action) => {
      if (action.payload === 'access-token-expired') {
        state.status = 'disconnected';
      } else {
        state.status = 'connected';
      }
    });
    builder.addCase(checkFolder.fulfilled, (state, action) => {
      state.lastSuccess = action.payload;
      state.status = 'authed';
    });
    builder.addCase(checkMembers.pending, (state) => {
      if (state.status !== 'starting') {
        state.status = 'connecting';
      }
    });
    builder.addCase(checkMembers.rejected, (state) => {
      state.status = 'disconnected';
    });
    builder.addCase(checkMembers.fulfilled, (state, action) => {
      state.status = 'connected';
      state.members = action.payload;
    });
  },
});

export default slice.reducer;

export const { status, connected, members, service, user, folder, memberId } =
  slice.actions;
