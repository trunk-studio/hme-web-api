import { RECEIVED_CREATE_SCHEDULE, RECEIVED_SCHEDULE_LIST,
  RECEIVED_UPDATE_SCHEDULE_FIRSTDATE, RECEIVED_UPDATE_SCHEDULE_DAY
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
    case RECEIVED_UPDATE_SCHEDULE_FIRSTDATE:
      let updateFirstDate = [...state.scheduleList]
      updateFirstDate[0].StartDate = action.data
      return {
        ...state,
        scheduleList: updateFirstDate
      };
    case RECEIVED_UPDATE_SCHEDULE_DAY:
      let updateScheduleList = [...state.scheduleList]
      updateScheduleList[action.index].Days = action.data;
      let date = new Date(updateScheduleList[action.index].StartDate);
      date.setDate(date.getDate() + parseInt(action.data,10));
      date = date.getFullYear()+'/' + (date.getMonth()+1) + '/'+date.getDate();
      updateScheduleList[action.index+1].StartDate = date;
      return {
        ...state,
        scheduleList: updateScheduleList
      };
    default:
      return state
  }
}
