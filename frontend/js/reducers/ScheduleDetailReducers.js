import {
  RECEIVED_SCHEDULE_DETAIL,
  RECEIVED_UPDATED_SCHEDULE_DETAIL,
  MODIFY_SCHEDULE
} from '../actions/ScheduleDetailActions'

export function scheduleDetail(state = { }, action) {
  console.log('test');
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
      // let dailySchedules = {};
      // dailySchedules = Object.assign({}, state.dailySchedules);
      // console.log(dailySchedules);
      // dailySchedules.ScheduleDetails[action.data.index].StartTime = action.data.time;
      // console.log('done',dailySchedules.ScheduleDetails[action.data.index].StartTime);
      // console.log(state.dailySchedules.ScheduleDetails);
      // console.log('data',action.data.time);
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
