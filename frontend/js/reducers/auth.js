import { combineReducers } from 'redux'
import {
  RECEIVED_LOGIN
} from '../actions/auth'

function auth(state = { }, action) {
  console.log('reducer',action);
  switch (action.type) {
    case RECEIVED_LOGIN:
      console.log('received login next state',Object.assign({}, state,
        action.data
      ));
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
