const ls = typeof window !== 'undefined' && window.localStorage;
const key = (ls && ls.getItem('key')) || '';
const path = (ls && ls.getItem('path')) || '';

export const initialState = {
  cloud: {
    key,
    path,
    date: null,
    status: null,
  },
  audio: {
    position: 0,
    sortBy: 'artist',
    sortDirection: true,
  },
  video: {
    position: 0,
    sortBy: 'name',
    sortDirection: true,
  },
  player: {
    source: null,
    path: null,
    volume: 0.5,
    position: null,
    playing: false,
  }
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
