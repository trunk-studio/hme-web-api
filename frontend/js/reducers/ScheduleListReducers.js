import { RECEIVED_CREATE_SCHEDULE, RECEIVED_SCHEDULE_LIST,
  RECEIVED_UPDATE_SCHEDULE_FIRSTDATE, RECEIVED_UPDATE_SCHEDULE_DAY,
  RECEIVED_UPDATE_SCHEDULE_LIST, RECEIVED_SET_SCHEDULE_LIST, UPDATE_LOADING_STATUS
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
    case RECEIVED_SET_SCHEDULE_LIST:
      return {
        ...state,
        setDeviceSuccess: action.data
      };
    case UPDATE_LOADING_STATUS:
      return {
        ...state,
        loading: action.status
      };
    // case RECEIVED_UPDATE_SCHEDULE_DAY:
      // let updateScheduleList = [...state.scheduleList]
      // if(action.data)
      //   updateScheduleList.forEach((schedule) => {
      //     if(schedule.id == action.index)
      //       updateScheduleList[action.index].Days = action.data;
      //   });
      // console.log('acdata',action.data, updateScheduleList[action.index]);

      // let slaveId = updateScheduleList[action.index].SlaveId;
      // let nextDate = null;
      // for(let i = 0; i < updateScheduleList.length-1; i++) {
      //   if(updateScheduleList[i].Days && updateScheduleList[i].slaveId === slaveId) {
      //     if(nextDate != null) {
      //       updateScheduleList[i].StartDate = nextDate;
      //     }
      //     let date = new Date(updateScheduleList[i].StartDate);
      //     date.setDate(date.getDate() + parseInt(updateScheduleList[i].Days,10));
      //     nextDate = date;
      //   }
      // };
      // return {
      //   ...state,
      //   scheduleList: updateScheduleList
      // };
    default:
      return state
  }
}
