
require('babel-polyfill');

import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link } from 'react-router';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import App from './containers/app';

const store = configureStore();

ReactDOM.render((
  <Provider store={store}>
    <App />
  </Provider>),
  document.getElementById('react-view')
);
