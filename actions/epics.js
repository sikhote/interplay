import 'rxjs';
import { combineEpics, createEpicMiddleware } from 'redux-observable';
import { epics as cloudEpics } from './cloud';
import { epics as filesEpics } from './files';

const epics = [...cloudEpics, ...filesEpics];

export default createEpicMiddleware(combineEpics(...epics));
