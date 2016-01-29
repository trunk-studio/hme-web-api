import request from 'axios'

export const REQUEST_GET_SCHEDULE_DETAIL_CONFIG = 'REQUEST_GET_SCHEDULE_DETAIL_CONFIG'
export const RECEIVED_GET_SCHEDULE_DETAIL_CONFIG = 'RECEIVED_GET_SCHEDULE_DETAIL_CONFIG'

export const REQUEST_UPDATE_SCHEDULE_DETAIL_CONFIG = 'REQUEST_UPDATE_SCHEDULE_DETAIL_CONFIG'
export const RECEIVED_UPDATE_SCHEDULE_DETAIL_CONFIG = 'RECEIVED_UPDATE_SCHEDULE_DETAIL_CONFIG'
export const UPDATE_SCHEDULE_DETAIL_CONFIG_LOADING_STATUS = 'UPDATE_SCHEDULE_DETAIL_CONFIG_LOADING_STATUS'
export function requestGetScheduleDetailConfig(id) {
  console.log(id);
  return (dispatch) => {
    dispatch(updateScheduleDetailConfigLoadingStatus('loading'));
    return request
      .get(`/rest/master/schedule/config/${id}`)
      .then(response => {
        dispatch(receivedGetScheduleDetailConfig(response.data));
        dispatch(updateScheduleDetailConfigLoadingStatus('hide'));
      });
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
    dispatch(updateScheduleDetailConfigLoadingStatus('loading'));
    return request
      .post('/rest/master/schedule/config/update',updateData)
      .then(response => {
        dispatch(receivedUpdateScheduleDetailConfig(data))
        dispatch(updateScheduleDetailConfigLoadingStatus('hide'));
      });
  };
}
export function receivedUpdateScheduleDetailConfig(data) {
  return {
    type: RECEIVED_UPDATE_SCHEDULE_DETAIL_CONFIG,
    data
  }
}


export function requestUpdateSlaveDeviceColor(updateData) {
  let data = [
    updateData.WW,
    updateData.DB,
    updateData.BL,
    updateData.GR,
    updateData.RE,
    updateData.CCT,
    updateData.Bright
  ]
  return (dispatch) => {
    return request
      .post(`/rest/slave/:slaveId/setLedDisplay`,data)
      .then(response => dispatch(receivedTestSetLedDisplay(response.data)));
  };
}

export function updateScheduleDetailConfigLoadingStatus(status) {
  return {
    type: UPDATE_SCHEDULE_DETAIL_CONFIG_LOADING_STATUS,
    status
  }
}
