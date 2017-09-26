import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider as Redux } from 'react-redux';
import thunk from 'redux-thunk';
import PropTypes from 'prop-types';
import { LocaleProvider as Locale } from 'antd';
import enUS from 'antd/lib/locale-provider/en_US';
import combinedReducer from '../reducers';

const store = createStore(combinedReducer, applyMiddleware(thunk));

const App = ({ children }) => (
  <Redux store={store}>
    <Locale locale={enUS}>
      <div>{children}</div>
    </Locale>
  </Redux>
);

App.propTypes = {
  children: PropTypes.array.isRequired,
};

export default App;
