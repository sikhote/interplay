import { combineReducers } from 'redux';
import settings from './settings';
import files from './files';
import cloud from './cloud';

const appReducer = combineReducers({ settings, files, cloud });

const rootReducer = (state, action) => {
  if (action.type === 'CLOUD_GET_SUCCESS') {
    return appReducer(action.payload.cloudState, action);
  }

  return appReducer(state, action);
};

export default rootReducer;
