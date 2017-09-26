import { mergeDeepRight } from 'ramda';

const initialState = {
  dropbox: {
    key: '',
    path: '',
    sync: {
      date: null,
      status: null,
    },
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
    case 'ON_SETTINGS': {
      const { settings } = action.payload;
      if (!settings) {
        return state;
      }
      return mergeDeepRight(state, settings);
    }

    default:
      return state;
  }
};

export default reducer;
