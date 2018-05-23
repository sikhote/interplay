import getSortedData from './getSortedData';

export default (settings, files, direction = 'next') => {
  const { sortBy, sortDirection, player } = settings;
  const { file, source } = player;
  const data = files[source];
  const sortedData = getSortedData(data, sortBy, sortDirection);
  const currentIndex = sortedData.findIndex(({ path }) => path === file.path);
  const sortedLength = sortedData.length;

  let newIndex;

  if (direction === 'next') {
    newIndex = currentIndex === sortedLength - 1 ? 0 : currentIndex + 1;
  } else if (direction === 'previous') {
    newIndex = currentIndex === 0 ? sortedLength - 1 : currentIndex - 1;
  } else {
    // Random
    newIndex = Math.floor(Math.random() * (sortedLength - + 1));
  }

  return sortedData[newIndex];
};
