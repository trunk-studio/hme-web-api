import {
  REQUEST_SCAN,
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
    case :
      return {
        ...state,
        groupList: action.data
      }
    default:
      return state
  }
}

export function scanGroup(state = {}, action) {
  switch (action.type) {
    case RECEIVED_DEVICEGROUP:
      
      break;
    default:

  }
}
