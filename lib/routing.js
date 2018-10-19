const pathMatch = require('path-match');
const isBrowser = require('./isBrowser');

const route = pathMatch();
const fullQuery = '/:page/:alpha';
const matchesGenerator = (query, matches = []) => {
  matches.push(route(query));
  const lastSlashIndex = query.lastIndexOf('/');
  return lastSlashIndex === -1
    ? matches
    : matchesGenerator(query.substring(0, lastSlashIndex), matches);
};

exports.matches = matchesGenerator(fullQuery);
exports.pages = ['', 'audio', 'video', 'playlists'];
exports.getCurrentPath = () => {
  const path = isBrowser && window.location.pathname.replace(/\/$/, '');
  return isBrowser ? path || '/' : '';
};
