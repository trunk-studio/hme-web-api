import { RECEIVED_CREATE, RECEIVED_LIST
} from '../actions/ScheduleListActions'

export function schedule(state = { }, action) {
  switch (action.type) {
    case RECEIVED_CREATE:
      let newScheduleList=[];
      return {
        ...state,
        scheduleList: [...state.scheduleList,action.data]
      };
    case RECEIVED_LIST:
      return {
        ...state,
        scheduleList: action.data
      };
    default:
      return state
  }
}
