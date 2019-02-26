const initialState = [];

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FILES_UPDATE': {
      const {
        file: { path, url, urlDate },
      } = action.payload;
      const newState = state.slice();
      const file = newState.find(file => file.path === path);
      Object.assign(file, { url, urlDate });
      return newState;
    }

    case 'FILES_REPLACE': {
      return action.payload || state;
    }

    default:
      return state;
  }
};

export default reducer;
