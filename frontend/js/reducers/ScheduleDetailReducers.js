import {
  RECEIVED_SCHEDULE_DETAIL,
  RECEIVED_UPDATED_SCHEDULE_DETAIL,
  SET_SCHEDULE_TIME
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
    case SET_SCHEDULE_TIME:
      let dailySchedules = {};
      dailySchedules = {...state.dailySchedules};
      dailySchedules.ScheduleDetails[action.data.index].StartTimeInteger = action.data.value;
      console.log('done',dailySchedules.ScheduleDetails[action.data.index].StartTimeInteger);
      console.log('data',action.data.value);
      return {
        ...state,
        dailySchedules: dailySchedules
      }
    default:
      return state
  }
}
