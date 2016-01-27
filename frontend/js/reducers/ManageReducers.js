import {
  RECEIVED_REPORT_EMAIL
} from '../actions/ManageActions'

export function ManageSettings(state = { }, action) {
  switch (action.type) {
    case RECEIVED_REPORT_EMAIL:
      return {
        ...state,
        reportEmail: action.data
      }
    default:
      return state
  }
}
