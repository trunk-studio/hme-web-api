import { RECEIVED_CREATE_SCHEDULE, RECEIVED_SCHEDULE_LIST,
  RECEIVED_UPDATE_SCHEDULE_FIRSTDATE, RECEIVED_UPDATE_SCHEDULE_DAY,
  RECEIVED_UPDATE_SCHEDULE_LIST
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
    case RECEIVED_UPDATE_SCHEDULE_LIST:
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
      if(action.data)
        updateScheduleList[action.index].Days = action.data;
      for(let i = 0 ; i < updateScheduleList.length-1; i++){
        if(updateScheduleList[i].Days){
          let date = new Date(updateScheduleList[i].StartDate);
          date.setDate(date.getDate() + parseInt(updateScheduleList[i].Days,10));
          let yyyy = date.getFullYear().toString();
          let mm = (date.getMonth()+1).toString(); // getMonth() is zero-based
          let dd  = date.getDate().toString();
          date = yyyy +'/'+ (mm[1]?mm:"0"+mm[0]) +'/'+ dd; // padding
          updateScheduleList[i+1].StartDate = date;
        }
      };
      return {
        ...state,
        scheduleList: updateScheduleList
      };
    default:
      return state
  }
}
