import { combineReducers } from 'redux';
import { merge, get } from 'lodash';
import settings from './settings';
import files from './files';
import cloud from './cloud';
import playlists from './playlists';
import dragging from './dragging';

const appReducer = combineReducers({
  settings,
  files,
  cloud,
  playlists,
  dragging,
});

const rootReducer = (state, action) => {
  if (action.type === 'CLOUD_GET_SUCCESS') {
    const newCloudState = merge(action.payload.cloudState, {
      settings: {
        cloud: {
          editing: false,
          key: get(state, 'settings.cloud.key', ''),
          path: get(state, 'settings.cloud.path', ''),
          user: get(state, 'settings.cloud.user', ''),
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
