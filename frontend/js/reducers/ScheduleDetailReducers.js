import {
  RECEIVED_SCHEDULE_DETAIL
} from '../actions/ScheduleDetailActions'

export function scheduleDetail(state = { }, action) {
  console.log('test');
  switch (action.type) {
    case RECEIVED_SCHEDULE_DETAIL:
      return {
        ...state,
        dailySchedules: action.data
      };
    default:
      return state
  }
}
