export default (source) => ({
  position: 0,
  sortBy: ['video', 'audio', 'recent', 'playlists'].includes(source)
    ? 'name'
    : 'order',
  sortDirection: true,
  search: '',
});
