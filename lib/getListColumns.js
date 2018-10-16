export default source => {
  switch (source) {
    case 'video':
      return [
        { title: 'Name', dataKey: 'name' },
        { title: 'Category', dataKey: 'category' },
      ];
    case 'playlists':
      return [
        { title: 'Name', dataKey: 'name' },
        { title: 'Created', dataKey: 'created', width: 90 },
        { title: 'Updated', dataKey: 'updated', width: 90 },
        { title: 'Tracks', dataKey: 'tracks', width: 60 },
      ];
    default:
      return [
        { title: '#', dataKey: 'track', width: 40 },
        { title: 'Name', dataKey: 'name' },
        { title: 'Artist', dataKey: 'artist' },
        { title: 'Album', dataKey: 'album' },
      ];
  }
};
