const ls = typeof window !== 'undefined' && window.localStorage;
const key = (ls && ls.getItem('key')) || '';
const path = (ls && ls.getItem('path')) || '';

export const initialState = {
  cloud: {
    key,
    path,
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
    position: 0,
    playing: false,
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
