import {
  RECEIVED_REPORT_EMAIL,
  UPDATE_EMAIL_LOADING_STATUS,
  GET_DEVICE_STATUS
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
    case GET_DEVICE_STATUS:
      return {
        ...state,
        devStatus: action.data
      }
    default:
      return state
  }
}
