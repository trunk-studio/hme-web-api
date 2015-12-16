import { combineReducers } from 'redux'
import {
  RECEIVED_LOGIN
} from '../actions'

function auth(state = { }, action) {
  console.log('reducer',action);
  switch (action.type) {
    case RECEIVED_LOGIN:
      return Object.assign({}, state,
        action.data
      );
    default:
      return state
  }
}

const rootReducer = combineReducers({
  auth
})

export default rootReducer
