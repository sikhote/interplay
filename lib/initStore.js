import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import epics from '../actions/epics';
import combinedReducer from '../reducers';

export default () =>
  createStore(combinedReducer, undefined, applyMiddleware(thunk, epics));
