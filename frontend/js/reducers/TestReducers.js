import {
  REQUEST_SCAN,
  RECEIVED_SCAN
} from '../actions/TestActions'

export function testDevice(state = { }, action) {
  switch (action.type) {
    case RECEIVED_SCAN:
      return {
        ...state,
        deviceList: action.data
      };
    default:
      return state
  }
}
