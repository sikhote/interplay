import { set } from 'lodash';

const initialState = {
  hasCloudStore: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CLOUD_GET_SUCCESS': {
      return set({ ...state }, 'hasCloudStore', true);
    }
    default:
      return state;
  }
};

export default reducer;
