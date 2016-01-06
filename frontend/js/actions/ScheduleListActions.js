import request from 'axios'

export const REQUEST_CREATE_SCHEDULE = 'REQUEST_CREATE_SCHEDULE'
export const RECEIVED_CREATE_SCHEDULE = 'RECEIVED_CREATE_SCHEDULE'

export const REQUEST_SCHEDULE_LIST = 'REQUEST_SCHEDULE_LIST'
export const RECEIVED_SCHEDULE_LIST = 'RECEIVED_SCHEDULE_LIST'

export function requestScheduleCreate() {
  // dispatch(function() {return {type: REQUEST_LOGIN});
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


export function requestGetScheduleList() {
  // dispatch(function() {return {type: REQUEST_LOGIN});
  return (dispatch) => {
    return request
      .get('/rest/schedule/findAll')
      .then(response => dispatch(receivedGetScheduleList(response.data)));
  };
}

export function receivedGetScheduleList(data) {
  return {
    type: RECEIVED_SCHEDULE_LIST,
    data
  }
}
