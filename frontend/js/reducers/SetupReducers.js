import {
  RECEIVED_SETUP_SETTING,
  UPDATE_SETUP_SETTING_LOADING_STATUS
} from '../actions/SetupActions'

export function setup(state = { isLogin: false }, action) {
  switch (action.type) {
    case UPDATE_SETUP_SETTING_LOADING_STATUS:
      return {
        ...state,
        isLoading: action.status.loading,
        isApply: action.status.update
      }
    case RECEIVED_SETUP_SETTING:
      return {
        ...state,
        setupSetting: action.data
      }
    default:
      return state
  }
}
