import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import qs from 'query-string';
import { Dropbox } from 'dropbox';

const getInitialState = () => ({
  status: { type: 'disconnected' },
  service: '',
  data: undefined,
  members: undefined,
  memberId: undefined,
});

const clientId = 'nvclnbz5hf59pep';
const getAccessTokenFromUrl = () => qs.parse(location.hash).access_token;

export const startAuth = () => async (dispatch, getState) => {
  const { auth } = getState();
  const accessToken = getAccessTokenFromUrl();

  if (auth.status.type === 'connected') {
    dispatch(checkMembers());
  } else if (accessToken) {
    console.log('saving token!', accessToken);
    dispatch(connected({ data: accessToken, service: 'dropbox' }));
    dispatch(checkMembers());
  } else {
    console.log('niether');
  }
};

export const attemptConnect = createAsyncThunk(
  'auth/attemptConnect',
  async () => {
    const dbx = new Dropbox({ clientId });
    return dbx.auth
      .getAuthenticationUrl('http://localhost:3000')
      .then((authUrl) => {
        window.location = authUrl;
      });
  },
);

export const checkMembers = createAsyncThunk('auth/checkMembers', async () => {
  router.replace('/');

  // See if has team members
  const dbx = new Dropbox({ accessToken: auth.data });
  dbx
    .teamMembersList()
    .then((response) => {
      console.log('teamMembersList');
      console.log(response.result);
    })
    .catch(function (error) {
      console.error(error);
    });
});

export const getFolders = createAsyncThunk('auth/getFolders', async () => {
  const dbx = new Dropbox({ accessToken: auth.data, selectUser: 1 });

  return dbx
    .filesListFolder({ path: '' })
    .then((response) => {
      console.log(response.result.entries);
    })
    .catch(function (error) {
      console.error(error);
    });
});

export const slice = createSlice({
  name: 'auth',
  initialState: getInitialState(),
  reducers: {
    connected: (state, action) => {
      const { service, data } = action.payload;
      Object.assign(state, { type, data, status: { type: 'connected' } });
    },
    members: (state, action) => {
      state.members = action.payload;
    },
    memberId: (state, action) => {
      state.memberId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(attemptConnect.pending, (state) => {
      state.status = { type: 'connecting' };
    });
    builder.addCase(attemptConnect.rejected, (state) => {
      state.status = { type: 'error', error: 'connect' };
    });
    builder.addCase(checkMembers.pending, (state) => {
      state.status = 'connecting';
    });
    builder.addCase(checkMembers.rejected, (state) => {
      state.status = { type: 'error', error: 'member' };
    });
  },
});

export const { disconnected, connecting, connected } = slice.actions;

export default slice.reducer;
