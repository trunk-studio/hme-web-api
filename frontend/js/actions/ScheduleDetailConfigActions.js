import request from 'axios'

export const REQUEST_GET_SCHEDULE_DETAIL_CONFIG = 'REQUEST_GET_SCHEDULE_DETAIL_CONFIG'
export const RECEIVED_GET_SCHEDULE_DETAIL_CONFIG = 'RECEIVED_GET_SCHEDULE_DETAIL_CONFIG'

export const REQUEST_UPDATE_SCHEDULE_DETAIL_CONFIG = 'REQUEST_UPDATE_SCHEDULE_DETAIL_CONFIG'
export const RECEIVED_UPDATE_SCHEDULE_DETAIL_CONFIG = 'RECEIVED_UPDATE_SCHEDULE_DETAIL_CONFIG'

export function requestGetScheduleDetailConfig(id) {
  // dispatch(function() {return {type: REQUEST_LOGIN});
  console.log(id);
  return (dispatch) => {
    return request
      .get(`/rest/schedule/config/${id}`)
      .then(response => dispatch(receivedGetScheduleDetailConfig(response.data)));
  };
}

export function receivedGetScheduleDetailConfig(data) {
  return {
    type: RECEIVED_GET_SCHEDULE_DETAIL_CONFIG,
    data
  }
}


export function requestUpdateScheduleDetailConfig(updateData) {
  // dispatch(function() {return {type: REQUEST_LOGIN});
  return (dispatch) => {
    return request
      .post('/rest/schedule/config/update',updateData)
      .then(response => dispatch(receivedUpdateScheduleDetailConfig()));
  };
}

export function receivedUpdateScheduleDetailConfig() {
  return {
    type: RECEIVED_UPDATE_SCHEDULE_DETAIL_CONFIG
  }
}
