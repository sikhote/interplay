import local from './local';
import dropbox from './dropbox';

const sources = { local, dropbox };

export default ({ source: { type, auth } }) => sources[type](auth);
