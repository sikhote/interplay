import { getNewPlaylist } from '../lib/playlists';
import { cloudSavePlaylists } from './cloud';

export const playlistsAdd = () => dispatch => {
  const payload = getNewPlaylist();
  dispatch({
    type: 'PLAYLISTS_ADD',
    payload,
  });
  return Promise.resolve(payload);
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
