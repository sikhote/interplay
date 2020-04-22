import memoizeOne from 'memoize-one';
import firstBy from 'thenby';

export default memoizeOne((data, sortBy, sortDirection) => {
  const options = { ignoreCase: true, direction: sortDirection ? 1 : -1 };

  switch (sortBy) {
    case 'track':
      return data.sort(
        firstBy(sortBy, options)
          .thenBy('artist', options)
          .thenBy('album', options)
          .thenBy('name', options),
      );
    case 'dateAdded':
      return data.sort(
        firstBy(sortBy, options)
          .thenBy('artist', options)
          .thenBy('album', options)
          .thenBy('name', options),
      );
    case 'artist':
      return data.sort(
        firstBy(sortBy, options)
          .thenBy('album', options)
          .thenBy('track', options)
          .thenBy('name', options),
      );
    case 'album':
      return data.sort(
        firstBy(sortBy, options)
          .thenBy('artist', options)
          .thenBy('track', options)
          .thenBy('name', options),
      );
    default:
      return data.sort(firstBy(sortBy, options));
  }
});
