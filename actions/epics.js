import 'rxjs';
import { combineEpics, createEpicMiddleware } from 'redux-observable';
import { epics as filesEpics } from './files';

const epics = [...filesEpics];

export default createEpicMiddleware(combineEpics(...epics));
