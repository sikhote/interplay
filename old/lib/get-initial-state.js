import Cookies from 'js-cookie';
import packageJson from 'package';

const { version } = packageJson;
const hasCookies = typeof window !== 'undefined';

export default () => ({
  cloud: {
    version,
    status: 'initial',
    type: (hasCookies && Cookies.get('type')) || 'dropbox',
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
      changes: 0,
    },
    other: {
      status: 'not synced',
      date: undefined,
      changes: 0,
    },
  },
  files: [],
  playlists: [],
  options: {
    key: undefined,
    value: undefined,
    context: {},
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
  // All notifications
  notifications: [],
});
