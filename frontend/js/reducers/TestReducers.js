import {
  RECEIVED_SCAN,
  RECEIVED_DEVICEGROUP,
  RECEIVED_TEST_SET_LED_DISPLAY,
  RECEIVED_SLAVE_LIST,
  SCANNING,
  RECEIVED_NEED_UPGRADE,
  RECEIVED_UPGRADE_DOWNLOAD
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
    case RECEIVED_SLAVE_LIST:
      return {
        ...state,
        slaveList: action.data
      }
    case SCANNING:
      return {
        ...state,
        scanning: action.data
      }
    case RECEIVED_NEED_UPGRADE:
      return {
        ...state,
        needUpdate: action.data
      }
    case RECEIVED_UPGRADE_DOWNLOAD:
      return {
        ...state,
        downloadStatus: action.data
      }
    default:
      return state
  }
}
