const initialState = [];

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'PLAYLISTS_UPDATE': {
      const newState = state.slice();
      const index = newState.findIndex(
        ({ name }) => name === action.payload.name,
      );
      newState[index] = action.payload;
      return newState;
    }
    case 'PLAYLISTS_ADD': {
      return state.concat(action.payload);
    }
    case 'PLAYLISTS_REMOVE': {
      return state.filter(({ name }) => !action.payload.includes(name));
    }
    default:
      return state;
  }
};

export default reducer;
