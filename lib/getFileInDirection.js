import getSortedData from './getSortedData';
import getSourcedData from './getSourcedData';
import getSearchedData from './getSearchedData';
import getDefaulListSettings from './getDefaulListSettings';

export default (settings, files, playlists, direction = 'next') => {
  const { player } = settings;
  const { file, source } = player;
  const { sortBy, sortDirection, search } =
    settings.lists[source] || getDefaulListSettings();
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
