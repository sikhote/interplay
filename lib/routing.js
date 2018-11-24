const { matchesGenerator } = require('parlor');

exports.matches = matchesGenerator('/:page/:alpha');
exports.pages = ['', 'audio', 'video', 'playlists'];
