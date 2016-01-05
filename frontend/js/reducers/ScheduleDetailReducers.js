import {
  RECEIVED_SCHEDULE_DETAIL,
  SET_SLIDER_VALUE
} from '../actions/ScheduleDetailActions'

export function scheduleDetail(state = { }, action) {
  console.log('test');
  switch (action.type) {
    case RECEIVED_SCHEDULE_DETAIL:
      return {
        ...state,
        dailySchedules: action.data
      };
    case SET_SLIDER_VALUE:
      console.log('testestsetsestest');
      return {
        ...state,
        currentIndex: action.index
      };
    default:
      return state
  }
}
