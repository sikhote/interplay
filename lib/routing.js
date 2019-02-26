const pathMatch = require('path-match');

const route = pathMatch();
const playlistsMatch = route('/playlists/:id');

module.exports = { playlistsMatch };
