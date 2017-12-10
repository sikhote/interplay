import { lensPath, set } from 'ramda';

const ls = typeof window !== 'undefined' && window.localStorage;
const key = (ls && ls.getItem('key')) || '';
const path = (ls && ls.getItem('path')) || '';

const initialState = {
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
