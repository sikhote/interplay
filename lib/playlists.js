import { words, toLower } from 'lodash';

export const titleToSlug = title => words(toLower(title)).join('-');

export const getNewPlaylist = () => ({
  created: Date.now(),
  updated: Date.now(),
  name: 'New Playlist',
  tracks: [],
});
