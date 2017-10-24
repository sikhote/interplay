import { mergeDeepRight } from 'ramda';

const initialState = {
  hasCloudStore: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CLOUD_GET_SUCCESS': {
      return mergeDeepRight(state, { hasCloudStore: true });
    }
    default:
      return state;
  }
};

export default reducer;
