import { RECEIVED_GET_SCHEDULE_DETAIL_CONFIG, RECEIVED_UPDATE_SCHEDULE_DETAIL_CONFIG
} from '../actions/ScheduleDetailConfigActions'

export function scheduleDetailConfig(state = { }, action) {
  console.log("action!!!!!!!!!!",action);
  switch (action.type) {
    case RECEIVED_GET_SCHEDULE_DETAIL_CONFIG:
      return {
        ...state,
        configData: action.data
      };
    case RECEIVED_UPDATE_SCHEDULE_DETAIL_CONFIG:
      return {
        ...state
      };
    default:
      return state
  }
}
