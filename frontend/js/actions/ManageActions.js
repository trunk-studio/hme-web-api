import request from 'axios'

export const RECEIVED_REPORT_EMAIL = 'RECEIVED_REPORT_EMAIL'
export const UPDATE_EMAIL_LOADING_STATUS = 'UPDATE_EMAIL_LOADING_STATUS'
export const GET_DEVICE_STATUS = 'GET_DEVICE_STATUS'
export const GET_LOGS = 'GET_LOGS'
export const UPDATE_TEMP_LIMIT = 'UPDATE_TEMP_LIMIT'

export function requestGetReportEmail() {
  return (dispatch) => {
    dispatch(updateEmailLoadingStatus('loading'));
    return request
      .get('/rest/master/loadEmail')
      .then(response => {
        dispatch(receivedReportEmail(response.data.emails))
        dispatch(updateEmailLoadingStatus('hide'));
      });
  };
}

export function requestUpdateReportEmail(emailList) {
  return (dispatch) => {
    dispatch(updateEmailLoadingStatus('loading'));
    return request
      .post('/rest/master/saveEmail', emailList)
      .then( function() {
        requestGetReportEmail();
        dispatch(updateEmailLoadingStatus('hide'));
      });
  }
}

export function receivedReportEmail(data) {
  return {
    type: RECEIVED_REPORT_EMAIL,
    data
  }
}

export function updateEmailLoadingStatus(status) {
  return {
    type: UPDATE_EMAIL_LOADING_STATUS,
    status
  }
}

export function updateTempLimit(value) {
  return {
    type: UPDATE_TEMP_LIMIT,
    value
  }
}

export function requestUpdateTempLimit(value) {
  return (dispatch) => {
    return request
      .post('/rest/hme/tempLimit', {tempLimit: value})
      .then( function() {
        dispatch(updateTempLimit(value));
      });
  }
}

export function requestGetDeviceStatus({slaveId, devId}) {
  // console.log("!!!!!!!!!!",slaveId, devId);
  return (dispatch) => {
    dispatch(updateEmailLoadingStatus('loading'));
    return request
      .get(`/rest/slave/${slaveId}/device/${devId}/getStatus`)
      .then(response => {
        dispatch(receivedGetDeviceStatus(response.data))
        dispatch(updateEmailLoadingStatus('hide'));
      });
  };
}

export function receivedGetDeviceStatus(data) {
  return {
    type: GET_DEVICE_STATUS,
    data
  }
}


export function requestGetLogs() {
  return (dispatch) => {
    return request
      .get(`/rest/master/logs`)
      .then(response => {
        dispatch(receivedGetLogs(response.data))
      });
  };
}

export function receivedGetLogs(data) {
  return {
    type: GET_LOGS,
    data
  }
}
