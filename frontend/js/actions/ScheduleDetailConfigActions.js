import request from 'axios'

export const REQUEST_GET_SCHEDULE_DETAIL_CONFIG = 'REQUEST_GET_SCHEDULE_DETAIL_CONFIG'
export const RECEIVED_GET_SCHEDULE_DETAIL_CONFIG = 'RECEIVED_GET_SCHEDULE_DETAIL_CONFIG'

export const REQUEST_UPDATE_SCHEDULE_DETAIL_CONFIG = 'REQUEST_UPDATE_SCHEDULE_DETAIL_CONFIG'
export const RECEIVED_UPDATE_SCHEDULE_DETAIL_CONFIG = 'RECEIVED_UPDATE_SCHEDULE_DETAIL_CONFIG'

export function requestGetScheduleDetailConfig(id) {
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
  let data = [
    updateData.WW,
    updateData.DB,
    updateData.BL,
    updateData.GR,
    updateData.RE,
    updateData.CCT,
    updateData.Bright
  ]
  // return receivedUpdateScheduleDetailConfig(updateData);
  return (dispatch) => {
    return request
      .post('/rest/schedule/config/update',updateData)
      .then(response => dispatch(receivedUpdateScheduleDetailConfig(data)));
  };
}
export function receivedUpdateScheduleDetailConfig(data) {
  return {
    type: RECEIVED_UPDATE_SCHEDULE_DETAIL_CONFIG,
    data
  }
}
