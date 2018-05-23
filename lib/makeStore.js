import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import combinedReducer from '../reducers';

export default () =>
  createStore(combinedReducer, undefined, applyMiddleware(thunk));
