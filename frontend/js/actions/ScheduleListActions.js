import request from 'axios'

export const REQUEST_CREATE_SCHEDULE = 'REQUEST_CREATE_SCHEDULE'
export const RECEIVED_CREATE_SCHEDULE = 'RECEIVED_CREATE_SCHEDULE'

export const REQUEST_SCHEDULE_LIST = 'REQUEST_SCHEDULE_LIST'
export const RECEIVED_SCHEDULE_LIST = 'RECEIVED_SCHEDULE_LIST'

export const REQUEST_UPDATE_SCHEDULE_FIRSTDATE = 'REQUEST_UPDATE_SCHEDULE_FIRSTDATE'
export const RECEIVED_UPDATE_SCHEDULE_FIRSTDATE = 'RECEIVED_UPDATE_SCHEDULE_FIRSTDATE'

export const REQUEST_UPDATE_SCHEDULE_DAY = 'REQUEST_UPDATE_SCHEDULE_DAY'
export const RECEIVED_UPDATE_SCHEDULE_DAY = 'RECEIVED_UPDATE_SCHEDULE_DAY'

export const REQUEST_UPDATE_SCHEDULE_LIST = 'REQUEST_UPDATE_SCHEDULE_LIST'
export const RECEIVED_UPDATE_SCHEDULE_LIST = 'RECEIVED_UPDATE_SCHEDULE_LIST'

export function requestScheduleCreate() {
  return (dispatch) => {
    return request
      .post('/rest/schedule/create')
      .then(response => dispatch(receivedScheduleCreate(response.data)));
  };
}

export function receivedScheduleCreate(data) {
  return {
    type: RECEIVED_CREATE_SCHEDULE,
    data
  }
}

export function requestUpdateScheduleList(scheduleList) {
  return (dispatch) => {
    return request
      .post('/rest/schedule/update/list',scheduleList)
      .then(response => dispatch(receivedUpdateScheduleList(response.data)));
  };
}

export function receivedUpdateScheduleList(data) {
  let scheduleList = formatListDate(data);
  return {
    type: RECEIVED_UPDATE_SCHEDULE_LIST,
    data: scheduleList
  }
}

export function updateScheduleFirstDate(date) {
  return receivedUpdateScheduleFirstDate(date);
}

export function receivedUpdateScheduleFirstDate(data) {
  return {
    type: RECEIVED_UPDATE_SCHEDULE_FIRSTDATE,
    data
  }
}

export function updateScheduleDay(date,index) {
  return receivedUpdateScheduleDay(date,index);
}

export function receivedUpdateScheduleDay(data = null,index = null) {
  return {
    type: RECEIVED_UPDATE_SCHEDULE_DAY,
    data,
    index
  }
}


export function requestGetScheduleList() {
  return (dispatch) => {
    return request
      .get('/rest/schedule/findAll')
      .then(response => dispatch(receivedGetScheduleList(response.data)));
  };
}

export function receivedGetScheduleList(data) {
  let scheduleList = formatListDate(data)
  return {
    type: RECEIVED_SCHEDULE_LIST,
    data: scheduleList
  }
}

export function formatListDate(array){
  let scheduleList = []
  array.forEach((schedule, i) => {
    if(schedule.StartDate){
      if( i == 0){
        schedule.StartDate = new Date(schedule.StartDate);
      }else{
        schedule.StartDate = schedule.StartDate.split("T")[0];
        schedule.StartDate = schedule.StartDate.replace(/\-/g,"/");
      }
    }
    scheduleList.push(schedule);
  });
  return scheduleList
}
