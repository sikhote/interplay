import getSortedData from './get-sorted-data';
import getSourcedData from './get-sourced-data';
import getSearchedData from './get-searched-data';
import getDefaultListSettings from './get-default-list-settings';

export default (player, lists, files, playlists, direction = 'next') => {
  const { file, source } = player;
  const { sortBy, sortDirection, search } =
    lists[source] || getDefaultListSettings(source);
  const sourcedData = getSourcedData(files, source, playlists);
  const searchedData = getSearchedData(sourcedData, source, search);
  const sortedData = getSortedData(searchedData, sortBy, sortDirection);
  const currentIndex = sortedData.findIndex(({ path }) => path === file.path);
  const sortedLength = sortedData.length;
  let newIndex;

  if (direction === 'next') {
    newIndex = currentIndex === sortedLength - 1 ? 0 : currentIndex + 1;
  } else if (direction === 'previous') {
    newIndex = currentIndex === 0 ? sortedLength - 1 : currentIndex - 1;
  } else {
    newIndex = Math.floor(Math.random() * (sortedLength + 1));
  }

  return sortedData[newIndex];
};
