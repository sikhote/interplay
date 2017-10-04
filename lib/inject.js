import React from 'react';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider as Redux } from 'react-redux';
import thunk from 'redux-thunk';
import { LocaleProvider as Locale } from 'antd';
import enUS from 'antd/lib/locale-provider/en_US';
import { persistStore, autoRehydrate } from 'redux-persist';
import combinedReducer from '../reducers';

const store = createStore(
  combinedReducer,
  undefined,
  compose(applyMiddleware(thunk), autoRehydrate()),
);

persistStore(store, { blacklist: ['files', 'playlists'] });

export default Component => () => (
  <Redux store={store}>
    <Locale locale={enUS}>
      <Component />
    </Locale>
  </Redux>
);
