import {
  REQUEST_SETUP_SETTING,
  RECEIVED_SETUP_SETTING
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
    case LOGOUT:
      return {
        ...state,
        role: null,
        isLogin: false,
        success: false,
        jwt: ''
      }
    default:
      return state
  }
}
