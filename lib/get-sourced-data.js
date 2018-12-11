import memoizeOne from 'memoize-one';
import moment from 'moment';

export default memoizeOne((files, source, playlists) => {
  switch (source) {
    case 'playlists':
      return playlists.map(({ created, updated, tracks, ...rest }) => ({
        ...rest,
        created: moment(created).format('YYYY-M-D'),
        updated: moment(updated).format('YYYY-M-D'),
        tracks: tracks.length,
      }));
    case 'video':
    case 'audio':
      return files.filter(({ type }) => type === source);
    // Playlists
    default: {
      const playlist = playlists.find(({ name }) => name === source);
      return playlist.tracks.map((path, index) => ({
        ...files.find(file => file.path === path),
        order: index + 1,
      }));
    }
  }
});
