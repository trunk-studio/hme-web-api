import {
  RECEIVED_REPORT_EMAIL,
  UPDATE_EMAIL_LOADING_STATUS
} from '../actions/ManageActions'

export function manageSettings(state = { }, action) {
  switch (action.type) {
    case RECEIVED_REPORT_EMAIL:
      return {
        ...state,
        reportEmail: action.data
      }
    case UPDATE_EMAIL_LOADING_STATUS:
      return {
        ...state,
        loadingEmail: action.status
      }
    default:
      return state
  }
}
