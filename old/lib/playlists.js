import { words, toLower } from 'lodash';
import getSortedData from './get-sorted-data';
import getSearchedData from './get-searched-data';
import getSourcedData from './get-sourced-data';
import getDefaultListSettings from './get-default-list-settings';

export const titleToSlug = (title) => words(toLower(title)).join('-');

export const getNewPlaylist = (playlists) => {
  const getName = (nameToCheck) =>
    playlists.find(({ name }) => name === nameToCheck)
      ? getName(`${nameToCheck} 2`)
      : nameToCheck;

  return {
    created: Date.now(),
    name: getName('New Playlist'),
    tracks: [],
  };
};

export const getSortedPlaylist = ({ settings, source, files, playlists }) => {
  const { sortBy, sortDirection, search } =
    settings.lists[source] || getDefaultListSettings(source);
  const sourcedData = getSourcedData(files, source, playlists);
  const searchedData = getSearchedData(sourcedData, source, search);
  const sortedData = getSortedData(searchedData, sortBy, sortDirection);
  return sortedData.map(({ path }) => path);
};
