import Cookies from 'js-cookie';

const hasCookies = typeof window !== 'undefined';
const key = (hasCookies && Cookies.get('key')) || '';
const path = (hasCookies && Cookies.get('path')) || '';
const user = (hasCookies && Cookies.get('user')) || 'default';

export const initialState = {
  cloud: {
    key,
    path,
    user,
    date: undefined,
    status: undefined,
  },
  audio: {
    scrollPosition: 0,
    sortBy: 'artist',
    sortDirection: true,
  },
  video: {
    scrollPosition: 0,
    sortBy: 'name',
    sortDirection: true,
  },
  player: {
    volume: 0.1,
    muted: false,
    playing: false,
    loop: false,
    random: false,
    file: {},
    played: 0,
    playedSeconds: 0,
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SETTINGS_REPLACE': {
      const { settings } = action.payload;
      return settings || state;
    }
    default:
      return state;
  }
};

export default reducer;
