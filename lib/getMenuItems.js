import { titleToSlug } from './playlists';

export default playlists => [
  { key: '/', title: 'Settings', icon: 'cog' },
  { key: '/audio', title: 'Audio', icon: 'audio' },
  { key: '/video', title: 'Video', icon: 'video' },
  {
    key: '/playlists',
    title: 'Playlists',
    icon: 'star',
    className: 'playlists',
  },
  ...playlists.map(({ name }) => ({
    key: `/playlists/${titleToSlug(name)}`,
    title: name,
    icon: 'star',
    className: 'playlist',
  })),
  {
    key: 'playlist-add',
    title: '',
    icon: 'list-add',
    className: 'playlist-add',
  },
];
