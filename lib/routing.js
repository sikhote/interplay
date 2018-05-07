const pathMatch = require('path-match');
const isBrowser = require('./isBrowser');

const route = pathMatch();

exports.match = route('/:page/:alpha');
exports.pages = ['audio', 'video', 'playlists', 'settings'];
exports.getPage = currentPath => currentPath.replace(/^\//, '');
exports.getCurrentPath = () => {
  const path = isBrowser && window.location.pathname.replace(/\/$/, '');
  return isBrowser ? path || '/' : '';
};
