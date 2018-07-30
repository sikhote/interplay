const pathMatch = require('path-match');
const isBrowser = require('./isBrowser');

const route = pathMatch();
const query = '/:page/:alpha';
const matchesGenerator = (query, matches = []) => {
  matches.push(route(query));
  const lastSlash = query.lastIndexOf('/');
  return lastSlash === 0
    ? matches
    : matchesGenerator(query.substring(0, lastSlash), matches);
};
const matches = matchesGenerator(query);
const pages = ['audio', 'video', 'playlists', 'settings'];
const getPage = currentPath => currentPath.split('/')[1];
const getCurrentPath = () => {
  const path = isBrowser && window.location.pathname.replace(/\/$/, '');
  return isBrowser ? path || '/' : '';
};
const getParams = path => {
  const match = matches.find(m => m(path));
  return match ? match(path) : { page: getPage(path) };
};

module.exports = { pages, getCurrentPath, getParams };
