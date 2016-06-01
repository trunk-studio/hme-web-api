
import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import thunkMiddleware from 'redux-thunk'
// import { combineReducers } from 'redux'
import * as reducers from '../reducers'
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';
import { autoRehydrate, persistStore } from 'redux-persist';

const rootReducer = combineReducers(reducers);
const env = process.env.NODE_ENV || 'development';
let createStoreWithMiddleware;
console.log(env);
if (env === 'development') {
  createStoreWithMiddleware = applyMiddleware(
    thunkMiddleware,
    createLogger()
  )(createStore)
} else {
  createStoreWithMiddleware = applyMiddleware(
    thunkMiddleware,
  )(createStore)
}

export default function configureStore(initialState) {
  const store = autoRehydrate()((dispatch) => (createStoreWithMiddleware(rootReducer, initialState)))(rootReducer);
  persistStore(store);
  //  const store = autoRehydrate()(createStoreWithMiddleware(rootReducer, initialState))(rootReducer)
  // const createStoreWithMiddleware = applyMiddleware(thunk, createLogger())(createStore);
  // const store = compose(autoRehydrate())(createStoreWithMiddleware);
  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers')
      store.replaceReducer(nextRootReducer)
    })
  }
  return store
}
