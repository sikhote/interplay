import { lensPath, set } from 'ramda';

const initialState = {
  hasCloudStore: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CLOUD_GET_SUCCESS': {
      return set(lensPath(['hasCloudStore']), true, state);
    }
    default:
      return state;
  }
};

export default reducer;
