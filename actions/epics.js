import 'rxjs';
import { combineEpics, createEpicMiddleware } from 'redux-observable';
import { epics as cloudEpics } from './cloud';

const epics = [...cloudEpics];

export default createEpicMiddleware(combineEpics(...epics));
