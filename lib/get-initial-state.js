import Cookies from 'js-cookie';

const hasCookies = false; // Typeof window !== 'undefined';

export default () => ({
  files: [],
  playlists: [],
  modifiers: {
    selections: [],
    show: false,
  },
  cloud: {
    key: (hasCookies && Cookies.get('key')) || 'sdsdsd',
    path: (hasCookies && Cookies.get('path')) || '',
    user: (hasCookies && Cookies.get('user')) || 'default',
    date: undefined,
    status: undefined,
    isConnected: false,
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
