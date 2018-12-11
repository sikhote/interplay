export default source => ({
  position: 0,
  sortBy: ['video', 'audio', 'playlists'].includes(source) ? 'name' : 'order',
  sortDirection: true,
  search: '',
});
