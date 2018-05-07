const pathMatch = require('path-match');
const isWeb = require('./isWeb');

const route = pathMatch();

exports.match = route('/:page/:alpha');
exports.pages = ['audio', 'video', 'playlists', 'settings'];
exports.getPage = currentPath => currentPath.replace(/^\//, '');
exports.getCurrentPath = () => {
  const path = isWeb && window.location.pathname.replace(/\/$/, '');
  return isWeb ? path || '/' : '';
};
