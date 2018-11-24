import { cloudSavePlaylists } from './cloud';

export const playlistsAdd = payload => dispatch => {
  dispatch({
    type: 'PLAYLISTS_ADD',
    payload,
  }).then(() => dispatch(cloudSavePlaylists()));
};

export const playlistsRemove = payload => dispatch => {
  dispatch({
    type: 'PLAYLISTS_REMOVE',
    payload,
  }).then(() => dispatch(cloudSavePlaylists()));
};

export const playlistsUpdate = payload => dispatch => {
  dispatch({
    type: 'PLAYLISTS_UPDATE',
    payload,
  }).then(() => dispatch(cloudSavePlaylists()));
};
