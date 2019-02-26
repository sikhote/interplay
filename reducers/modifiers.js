export const initialState = {
  selections: [],
  show: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'MODIFIERS_SELECTIONS_TOGGLE': {
      let selections;

      if (state.selections.includes(action.payload)) {
        selections = state.selections.slice();
        const index = selections.findIndex(path => path === action.payload);
        selections.splice(index, 1);
      } else {
        selections = state.selections.concat(action.payload);
      }

      return { ...state, selections };
    }

    case 'MODIFIERS_SELECTIONS_REMOVE_ALL': {
      return { ...state, selections: initialState.selections };
    }

    case 'MODIFIERS_SHOW_UPDATE': {
      return { ...state, show: action.payload };
    }

    default:
      return state;
  }
};

export default reducer;
