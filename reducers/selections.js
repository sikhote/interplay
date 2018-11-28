const initialState = [];

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SELECTIONS_TOGGLE': {
      if (state.includes(action.payload)) {
        const newState = state.slice();
        const index = newState.findIndex(path => path === action.payload);
        newState.splice(index, 1);
        return newState;
      }

      return state.concat(action.payload);
    }
    case 'SELECTIONS_REMOVE_ALL': {
      return initialState;
    }
    default:
      return state;
  }
};

export default reducer;
