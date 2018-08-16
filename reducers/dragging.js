const initialState = {
  isDragging: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'DRAGGING_UPDATE': {
      return { ...state, isDragging: action.payload.isDragging };
    }
    default:
      return state;
  }
};

export default reducer;
