import { combineReducers } from 'redux';
import { merge } from 'lodash';
import settings from './settings';
import files from './files';
import cloud from './cloud';
import playlists from './playlists';

const appReducer = combineReducers({ settings, files, cloud, playlists });

const rootReducer = (state, action) => {
  if (action.type === 'CLOUD_GET_SUCCESS') {
    const newCloudState = merge(action.payload.cloudState, {
      settings: {
        cloud: {
          editing: false,
        },
        player: {
          loading: false,
        },
      },
    });

    return appReducer(newCloudState, action);
  }

  return appReducer(state, action);
};

export default rootReducer;
