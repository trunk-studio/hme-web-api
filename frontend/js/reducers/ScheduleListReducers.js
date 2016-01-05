import { RECEIVED_CREATE_SCHEDULE, RECEIVED_SCHEDULE_LIST
} from '../actions/ScheduleListActions'

export function schedule(state = { }, action) {
  switch (action.type) {
    case RECEIVED_CREATE_SCHEDULE:
      let newScheduleList=[];
      return {
        ...state,
        scheduleList: [...state.scheduleList,action.data]
      };
    case RECEIVED_SCHEDULE_LIST:
      return {
        ...state,
        scheduleList: action.data
      };
    default:
      return state
  }
}
