import {
  RECEIVED_SCHEDULE_DETAIL,
  RECEIVED_UPDATED_SCHEDULE_DETAIL,
  MODIFY_SCHEDULE
} from '../actions/ScheduleDetailActions'

export function scheduleDetail(state = { }, action) {
  switch (action.type) {
    case RECEIVED_SCHEDULE_DETAIL:
      return {
        ...state,
        dailySchedules: action.data
      };
    case RECEIVED_UPDATED_SCHEDULE_DETAIL:
      return {
        ...state,
        dailySchedules: action.data
      }
    case MODIFY_SCHEDULE:
      return {
        ...state,
        dailySchedules: {
          ...state.dailySchedules,
          ScheduleDetails: action.data.schedules
        }
      }
    default:
      return state
  }
}
