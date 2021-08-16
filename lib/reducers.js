import { combineReducers } from 'redux';
import { routerReducer } from 'connected-next-router';

const combinedReducer = combineReducers({
  misc: {},
  router: routerReducer,
});

export default combinedReducer;
