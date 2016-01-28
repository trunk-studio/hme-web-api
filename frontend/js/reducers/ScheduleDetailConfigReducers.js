import {
  RECEIVED_GET_SCHEDULE_DETAIL_CONFIG,
  RECEIVED_UPDATE_SCHEDULE_DETAIL_CONFIG,
  UPDATE_SCHEDULE_DETAIL_CONFIG_LOADING_STATUS
} from '../actions/ScheduleDetailConfigActions'

export function scheduleDetailConfig(state = {}, action) {
  switch (action.type) {
    case RECEIVED_GET_SCHEDULE_DETAIL_CONFIG:
      return {
        ...state,
        configData: action.data
      };
    case RECEIVED_UPDATE_SCHEDULE_DETAIL_CONFIG:
      return {
        ...state,
        configData: action.data
      };
    case UPDATE_SCHEDULE_DETAIL_CONFIG_LOADING_STATUS:
      return {
        ...state,
        configLoading: action.status
      };
    default:
      return state
  }
}
