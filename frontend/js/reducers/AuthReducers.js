import { combineReducers } from 'redux'
import {
  REQUEST_LOGIN,
  RECEIVED_LOGIN
} from '../actions/AuthActions'

export function login(state = { }, action) {
  switch (action.type) {
    case REQUEST_LOGIN:
      console.log('rL');
      return {
        ...state,
        isLoading: true
      }
    case RECEIVED_LOGIN:
      console.log('origin state',state);
      return {
        ...state,
        ...action.data
        // isLoading: false
      };
      // return action.data
    default:
      return state
  }
}
