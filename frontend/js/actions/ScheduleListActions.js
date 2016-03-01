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
export const UPDATE_LOADING_STATUS = 'UPDATE_LOADING_STATUS'
export const RECEIVED_EASY_SCHEDULE_LIST = 'RECEIVED_EASY_SCHEDULE_LIST'
export const RECEIVED_UPDATE_EASY_SCHEDULE_LIST = 'RECEIVED_UPDATE_EASY_SCHEDULE_LIST'

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
      .then(response => dispatch(requestGetSlaveSchedule(slaveId)));
  };
}

export function requestScheduleDeleteLast(scheduleId, slaveId) {
  return (dispatch) => {
    return request
      .post('/rest/master/schedule/delete/'+scheduleId,{slaveId: slaveId})
      .then(response => dispatch(requestGetSlaveSchedule(slaveId)));
  };
}

export function receivedScheduleCreate(data) {
  return {
    type: RECEIVED_CREATE_SCHEDULE,
    data
  }
}

export function requestUpdateScheduleList(scheduleList, slaveId) {
  return (dispatch) => {
    request.post('/rest/master/simpleSchedule/delete', {slaveId: slaveId});
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
  console.log('!!!!!!!!!!!!!!!!!!!!!!data', data);
  return dispatch => {
    dispatch(updateLoadingStatus('loading'));
    return request
      .post(`/rest/master/schedule/setOnDevice`, data)
      .then(response => {
        dispatch(receivedSetScheduleList(response.data));
        requestGetSlaveSchedule(data.slaveId);
      });
  }
}

export function receivedSetScheduleList(data) {
  return {
    type: RECEIVED_SET_SCHEDULE_LIST,
    data
  }
}

export function requestGetSlaveSchedule(slaveId) {
  return (dispatch) => {
    dispatch(updateLoadingStatus('loading'));
    return request
      .get(`/rest/master/slave/${slaveId}/schedule/findAll`)
      .then(response => {
        dispatch(receivedGetScheduleList(response.data));
        dispatch(updateLoadingStatus('hide'));
      });
  };
}

export function updateLoadingStatus(status) {
  return {
    type: UPDATE_LOADING_STATUS,
    status
  }
}

export function requestGetEasySchedule(slaveId){
  return (dispatch) => {
    dispatch(updateLoadingStatus('loading'));
    return request
      .get(`/rest/master/schedule/easy/${slaveId}`)
      .then(response => {
        dispatch(receivedGetEasyScheduleList(response.data));
        dispatch(updateLoadingStatus('hide'));
      });
  };
}

export function receivedGetEasyScheduleList(data) {
  return {
    type: RECEIVED_EASY_SCHEDULE_LIST,
    data
  }
}

export function requestUpdateEasyScheduleList(data){
  return (dispatch) => {
    dispatch(updateLoadingStatus('loading'));
    return request
      .post(`/rest/master/schedule/easy/create`, data)
      .then(response => {
        dispatch(receivedUpdateEasyScheduleList(response.data));
        dispatch(updateLoadingStatus('hide'));
      });
  };
}

export function receivedUpdateEasyScheduleList(data) {
  return {
    type: RECEIVED_UPDATE_EASY_SCHEDULE_LIST,
    data
  }
}
