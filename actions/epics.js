import 'rxjs';
import { combineEpics, createEpicMiddleware } from 'redux-observable';
import { epics as settingsEpics } from './settings';

const epics = [...settingsEpics];

export default createEpicMiddleware(combineEpics(...epics));
