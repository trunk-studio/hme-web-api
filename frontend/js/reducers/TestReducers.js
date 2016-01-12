import {
  RECEIVED_SCAN,
  RECEIVED_DEVICEGROUP,
  RECEIVED_TEST_SET_LED_DISPLAY
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
    case RECEIVED_TEST_SET_LED_DISPLAY:
      return {
        ...state,
        testSetLedDispla: action.data
      }
    default:
      return state
  }
}
