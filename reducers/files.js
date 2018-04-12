const initialState = {
  audio: [],
  video: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FILES_GET_LINK_SUCCESS': {
      const {
        source,
        path,
        link,
        linkDate,
        metadata,
      } = action.payload;

      const newState = { ...state };
      const file = newState[source].find((file) => file.path === path);
      console.log('file:');
      console.log(file);

      return newState;
    }
    case 'FILES_SYNC_SUCCESS': {
      const { files } = action.payload;
      return files || state;
    }
    default:
      return state;
  }
};

export default reducer;
