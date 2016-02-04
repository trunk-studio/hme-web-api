
require('babel-polyfill');

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import App from './containers/app';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

const store = configureStore();

ReactDOM.render((
  <Provider store={store}>
    <App />
  </Provider>),
  document.getElementById('react-view')
);
