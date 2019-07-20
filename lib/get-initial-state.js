import Cookies from 'js-cookie';

const hasCookies = typeof window !== 'undefined';

export default () => ({
  files: [],
  playlists: [],
  modifiers: {
    selections: [],
    show: false,
  },
  cloud: {
    status: 'not-tried',
    key: (hasCookies && Cookies.get('key')) || '',
    path: (hasCookies && Cookies.get('path')) || '',
    user: (hasCookies && Cookies.get('user')) || 'default',
    files: {
      status: 'disconnected',
      date: undefined,
    },
    playlists: {
      status: 'disconnected',
      date: undefined,
    },
    other: {
      status: 'disconnected',
      date: undefined,
    },
  },
  player: {
    source: 'audio',
    volume: 0.1,
    muted: false,
    playing: false,
    loop: false,
    random: false,
    file: {},
    played: 0,
    playedSeconds: 0,
  },
  // Stores position, sortBy, sortDirection, search for each list
  lists: {},
});
