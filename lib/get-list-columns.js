export default (source) => {
  switch (source) {
    case 'audio':
      return [
        { title: '#', key: 'track' },
        { title: 'Name', key: 'name' },
        { title: 'Artist', key: 'artist' },
        { title: 'Album', key: 'album' },
      ];
    case 'video':
      return [
        { title: 'Name', key: 'name' },
        { title: 'Category', key: 'category' },
      ];
    case 'recent':
      return [
        { title: 'Date Added', key: 'dateAdded' },
        { title: 'Name', key: 'name' },
        { title: 'Artist', key: 'artist' },
        { title: 'Album', key: 'album' },
      ];
    case 'playlists':
      return [
        { title: 'Name', key: 'name' },
        { title: 'Created', key: 'created' },
        { title: 'Tracks', key: 'tracks' },
      ];
    default:
      return [
        { title: '#', key: 'order' },
        { title: 'Name', key: 'name' },
        { title: 'Artist', key: 'artist' },
        { title: 'Album', key: 'album' },
      ];
  }
};
