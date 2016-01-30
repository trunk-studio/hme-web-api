import {
  REQUEST_LOGIN,
  RECEIVED_LOGIN,
  USER_ROLE
} from '../actions/AuthActions'

export function login(state = { isLogin: false }, action) {
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
    case USER_ROLE:
      return {
        ...state,
        role: action.role,
        isLogin: true
      }
    default:
      return state
  }
}
