import { combineReducers } from 'redux';
import settings from './settings';
import files from './files';

export default combineReducers({ settings, files });
