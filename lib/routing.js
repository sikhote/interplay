const pathMatch = require('path-match');

const route = pathMatch();

exports.match = route('/:page/:alpha');
exports.pages = ['audio', 'video', 'playlists', 'settings'];
