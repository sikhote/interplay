import {
  createRouterMiddleware,
  initialRouterState,
} from 'connected-next-router';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import combinedReducer from './reducers';
import { HYDRATE, createWrapper } from 'next-redux-wrapper';
import Router from 'next/router';

const reducer = (state, action) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...action.payload, // use server state as base state
      ...state, // layer client state on top
      config: action.payload.config, // apply delta from hydration
    };

    if (typeof window !== 'undefined' && state?.router) {
      // preserve router value on client side navigation
      nextState.router = state.router;
    }

    return nextState;
  }

  return combinedReducer(state, action);
};

const initStore = (context) => {
  const routerMiddleware = createRouterMiddleware();
  const { asPath } = context.ctx || Router.router || {};
  let initialState;

  if (asPath) {
    initialState = {
      router: initialRouterState(asPath),
    };
  }

  return createStore(
    reducer,
    initialState,
    applyMiddleware(thunkMiddleware, routerMiddleware),
  );
};

const wrapper = createWrapper(initStore);

export default wrapper;
