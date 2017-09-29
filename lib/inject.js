import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider as Redux } from 'react-redux';
import thunk from 'redux-thunk';
import { LocaleProvider as Locale } from 'antd';
import enUS from 'antd/lib/locale-provider/en_US';
import combinedReducer from '../reducers';

const store = createStore(combinedReducer, applyMiddleware(thunk));

export default Component => () => (
  <Redux store={store}>
    <Locale locale={enUS}>
      <Component />
    </Locale>
  </Redux>
);
