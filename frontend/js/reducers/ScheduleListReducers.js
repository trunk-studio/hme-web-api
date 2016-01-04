import {
  REQUEST_CREATE, RECEIVED_CREATE,
  REQUEST_LIST, RECEIVED_LIST
} from '../actions/ScheduleListActions'

export function schedule(state = { }, action) {
  console.log("action!!!!!!",action, state);
  switch (action.type) {
    case RECEIVED_CREATE:

      let newScheduleList = state.scheduleList? state.scheduleList : {} ;
      newScheduleList.push(action.data);
      console.log('123');
      // console.log(scheduleList, newstate);
      return {
        ...state,
        scheduleList: newScheduleList
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
