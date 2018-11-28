import { getNewPlaylist } from '../lib/playlists';
import { cloudSavePlaylists } from './cloud';

export const playlistsAdd = () => (dispatch, getState) => {
  const { playlists } = getState();
  const payload = getNewPlaylist(playlists);
  dispatch({
    type: 'PLAYLISTS_ADD',
    payload,
  });
  dispatch(cloudSavePlaylists());
};

export const playlistsRemove = payload => dispatch => {
  dispatch({
    type: 'PLAYLISTS_REMOVE',
    payload,
  });
  dispatch(cloudSavePlaylists());
};

export const playlistsUpdate = payload => dispatch => {
  dispatch({
    type: 'PLAYLISTS_UPDATE',
    payload,
  });
  dispatch(cloudSavePlaylists());
};
