import {
  REQUEST_LOGIN,
  RECEIVED_LOGIN
} from '../actions/AuthActions'

export function login(state = { }, action) {
  switch (action.type) {
    case REQUEST_LOGIN:
      return {
        ...state,
        isLoading: true
      }
    case RECEIVED_LOGIN:
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
