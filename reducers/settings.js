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
    case 'SETTINGS_UPDATE': {
      const { settings } = action.payload;
      return settings ? mergeDeepRight(state, settings) : state;
    }

    case 'SETTINGS_DROPBOX_DELETE': {
      return mergeDeepRight(state, { dropbox: initialState.dropbox });
    }

    default:
      return state;
  }
};

export default reducer;
