export const getColumnRows = (source) => {
  switch (source) {
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

export const getColumnWidths = (source) => {
  switch (source) {
    case 'video':
      return {
        desktop: ['100%', '100%'],
        mobile: ['100%', '100%'],
      };
    case 'recent':
      return {
        desktop: [160, '100%', '100%', '100%'],
        mobile: [160, '100%', '100%', '100%'],
      };
    case 'playlists':
      return {
        desktop: ['100%', 90, 60],
        mobile: ['100%', 80, 50],
      };
    default:
      return {
        desktop: [40, '100%', '100%', '100%'],
        mobile: [20, '100%', '100%', '100%'],
      };
  }
};
