import { combineReducers } from 'redux';
import settings from './settings';
import files from './files';
import playlists from './playlists';
import selections from './selections';

const appReducer = combineReducers({
  settings,
  files,
  playlists,
  selections,
});

const rootReducer = (state, action) => {
  if (action.type === 'APP_CHANGE') {
    state = action.payload;
  }

  return appReducer(state, action);
};

export default rootReducer;
