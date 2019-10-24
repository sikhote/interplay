import Cookies from 'js-cookie';

const hasCookies = typeof window !== 'undefined';

export default () => ({
  cloud: {
    status: 'initial',
    key: (hasCookies && Cookies.get('key')) || '',
    path: (hasCookies && Cookies.get('path')) || '',
    user: (hasCookies && Cookies.get('user')) || 'default',
    files: {
      status: 'not synced',
      date: undefined,
    },
    playlists: {
      status: 'not synced',
      date: undefined,
    },
    other: {
      status: 'not synced',
      date: undefined,
    },
  },
  files: [],
  playlists: [],
  modifiers: {
    selections: [],
    show: false,
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
