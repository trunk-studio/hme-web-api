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

export const RECEIVED_SET_SCHEDULE_LIST = 'RECEIVED_SET_SCHEDULE_LIST'

export function requestScheduleCreate(scheduleList, slaveId) {
  let data={};
  if(scheduleList.length > 0) {
    let listLength = scheduleList.length;
    let date = new Date(scheduleList[listLength-1].StartDate);
    date.setDate(date.getDate() + parseInt(scheduleList[listLength-1].Days,10));
    data.StartDate = date;
    data.Days = 1;
    data.SlaveId = slaveId;
  }
  else {
    data = {
      StartDate: new Date(),
      Days: 1,
      SlaveId: slaveId
    }
  }
  return (dispatch) => {
    return request
      .post('/rest/master/schedule/create',data)
      .then(response => dispatch(requestGetScheduleList()));
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
      .post('/rest/master/schedule/update/list',scheduleList)
      .then(response => dispatch(receivedUpdateScheduleList(response.data)));
  };
}

export function receivedUpdateScheduleList(data) {
  // let scheduleList = formatListDate(data);
  return {
    type: RECEIVED_UPDATE_SCHEDULE_LIST,
    data
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
      .get('/rest/master/schedule/findAll')
      .then(response => dispatch(receivedGetScheduleList(response.data)));
  };
}

export function receivedGetScheduleList(data) {
  // let scheduleList = formatListDate(data)
  return {
    type: RECEIVED_SCHEDULE_LIST,
    data
  }
}

export function requestSetScheduleList(data) {
  return request
    .post(`/rest/slave/${data.slaveId}/schedule/setOnDevice`, data)
    .then(response => dispatch(receivedSetScheduleList(response.data)));
}

export function receivedSetScheduleList(data) {
  return {
    type: RECEIVED_SET_SCHEDULE_LIST,
    data
  }
}

export function requestGetSlaveSchedule(slaveId) {
  return (dispatch) => {
    return request
      .get(`/rest/master/slave/${slaveId}/schedule/findAll`)
      .then(response => dispatch(receivedGetScheduleList(response.data)));
  };
}
