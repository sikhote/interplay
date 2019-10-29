import dropbox from './dropbox';

const sources = { dropbox };

export default store => sources[store.cloud.type](store);
