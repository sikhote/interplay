import { combineReducers } from 'redux';
import settings from './settings';
import files from './files';
import playlists from './playlists';
import modifiers from './modifiers';

const appReducer = combineReducers({
  settings,
  files,
  playlists,
  modifiers,
});

const rootReducer = (state, action) => {
  if (action.type === 'APP_CHANGE') {
    state = {
      ...state,
      ...action.payload,
      settings: {
        ...state.settings,
        ...action.payload.settings,
      },
    };
  }

  return appReducer(state, action);
};

export default rootReducer;
