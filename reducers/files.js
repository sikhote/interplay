const initialState = {
  audio: [],
  video: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FILES_SYNC_SUCCESS': {
      const { files } = action.payload;
      return files || state;
    }
    default:
      return state;
  }
};

export default reducer;
