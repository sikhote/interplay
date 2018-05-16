const initialState = {
  audio: [],
  video: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FILES_UPDATE': {
      const { file: { path, url, urlDate }, source } = action.payload;
      const newState = { ...state };
      const file = newState[source].find(file => file.path === path);
      Object.assign(file, { url, urlDate });
      return newState;
    }
    case 'FILES_REPLACE': {
      const { files } = action.payload;
      return files || state;
    }
    default:
      return state;
  }
};

export default reducer;
