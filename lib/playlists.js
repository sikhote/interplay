import { words, toLower } from 'lodash';

export const titleToSlug = title => words(toLower(title)).join('-');

export const getNewPlaylist = playlists => {
  const getName = nameToCheck =>
    playlists.find(({ name }) => name === nameToCheck)
      ? getName(`${nameToCheck} 2`)
      : nameToCheck;

  return {
    created: Date.now(),
    name: getName('New Playlist'),
    tracks: [],
  };
};
