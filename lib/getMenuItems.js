import { bps } from './styling';
import { titleToSlug } from './playlists';

export default (width, playlists) => [
  { key: '/', title: 'Settings', icon: 'cog' },
  { key: '/audio', title: 'Audio', icon: 'audio' },
  { key: '/video', title: 'Video', icon: 'video' },
  ...(width < bps.a3
    ? [
        {
          key: '/playlists',
          title: 'Playlists',
          icon: 'star',
          className: ' playlists',
        },
      ]
    : [
        ...playlists.map(({ name }) => ({
          key: `/playlists/${titleToSlug(name)}`,
          title: name,
          icon: 'star',
          className: 'playlist',
        })),
        {
          key: 'playlists-add',
          title: '',
          icon: 'list-add',
          className: 'playlist-add',
        },
      ]),
];
