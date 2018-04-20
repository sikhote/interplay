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
    volume: 0.1,
    position: undefined,
    playing: false,
    file: undefined
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
