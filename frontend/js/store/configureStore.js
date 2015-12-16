import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import rootReducer from '../reducers/auth'

const createStoreWithMiddleware = applyMiddleware(
  thunkMiddleware,
  createLogger()
)(createStore)

export default function configureStore(initialState) {
  const store = createStoreWithMiddleware(rootReducer, initialState)
  console.log('store',store);
  if (module.hot) {
    console.log('im hot');
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers/auth', () => {
      const nextRootReducer = require('../reducers/auth')
      store.replaceReducer(nextRootReducer)
    })
  }
  return store
}
