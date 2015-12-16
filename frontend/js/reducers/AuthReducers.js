import { combineReducers } from 'redux'
import {
  RECEIVED_LOGIN
} from '../actions/AuthActions'

export function login(state = { }, action) {
  switch (action.type) {
    case RECEIVED_LOGIN:
      console.log('received login next state',Object.assign({}, state,
        action.data
      ));
      return {
        ...state,
        ...action.data
      };
      // return action.data
    default:
      return state
  }
}
