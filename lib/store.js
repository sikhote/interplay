import {
  createRouterMiddleware,
  initialRouterState,
} from 'connected-next-router';
import thunkMiddleware from 'redux-thunk';
// import combinedReducer from './reducers';
import { HYDRATE, createWrapper } from 'next-redux-wrapper';
import Router from 'next/router';
import { configureStore } from '@reduxjs/toolkit';
import auth from 'lib/features/auth';
import files from 'lib/features/files';
import notifications from 'lib/features/notifications';
import { routerReducer as router } from 'connected-next-router';

const reducer = (state, action) => {
  // if (action.type === HYDRATE) {
  //   const nextState = {
  //     ...action.payload, // use server state as base state
  //     ...state, // layer client state on top
  //     config: action.payload.config, // apply delta from hydration
  //   };

  //   if (typeof window !== 'undefined' && state?.router) {
  //     // preserve router value on client side navigation
  //     nextState.router = state.router;
  //   }

  //   return nextState;
  // }

  // return combinedReducer(state, action);
  return { auth, notifications, files, router };
};

const makeStore = () =>
  configureStore({
    reducer: { auth, notifications, files, router },
  });

// const initStore = (context) => {
//   const routerMiddleware = createRouterMiddleware();
//   const { asPath } = context.ctx || Router.router || {};
//   let initialState;

//   if (asPath) {
//     initialState = {
//       router: initialRouterState(asPath),
//     };
//   }

//   return configureStore({
//     reducer: reducer(),
//     preloadedState: initialState,
//     middleware: [thunkMiddleware, routerMiddleware],
//   });
// };

// const wrapper = createWrapper(initStore);

export const wrapper = createWrapper(makeStore);

export default wrapper;
