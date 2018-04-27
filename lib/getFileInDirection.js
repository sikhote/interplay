import getSortedData from './getSortedData';

export default (settings, files) => {
  const { sortBy, sortDirection, player } = settings;
  const { file, source } = player;
  const data = files[source];
  const sortedData = getSortedData(data, sortBy, sortDirection);
  const currentIndex = sortedData.findIndex(({ link }) => link === file.link);
  return data[currentIndex + 1];
};
