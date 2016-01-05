import {
  RECEIVED_SCAN,
  RECEIVED_DEVICEGROUP
} from '../actions/TestActions'

export function scanDevice(state = { }, action) {
  switch (action.type) {
    case RECEIVED_SCAN:
      return {
        ...state,
        deviceList: action.data
      };
    case RECEIVED_DEVICEGROUP:
      return {
        ...state,
        groupList: action.data
      }
    default:
      return state
  }
}
