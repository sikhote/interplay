import memoizeOne from 'memoize-one';
import { get } from 'lodash';
import listSearchKeys from '../lib/listSearchKeys';

export default memoizeOne((data, source, search) => {
  const searchKeys = listSearchKeys[source] || listSearchKeys.playlists;

  return search
    ? data.filter(entry =>
        searchKeys.find(
          key =>
            get(entry, `[${key}]`, '')
              .toLowerCase()
              .indexOf(search.toLowerCase()) !== -1,
        ),
      )
    : data;
});
