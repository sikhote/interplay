const initialState = [];

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'PLAYLISTS_UPDATE': {
      const newState = state.slice();
      const index = newState.findIndex(({ id }) => id === action.payload.id);
      newState[index] = action.payload;
      return newState;
    }
    case 'PLAYLISTS_ADD': {
      return state.concat(action.payload);
    }
    case 'PLAYLISTS_REMOVE': {
      const newState = state.slice();
      const index = newState.findIndex(({ id }) => id === action.payload.id);
      newState.splice(index, 1);
      return newState;
    }
    default:
      return state;
  }
};

export default reducer;
