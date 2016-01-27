import request from 'axios'

export const RECEIVED_REPORT_EMAIL = 'RECEIVED_REPORT_EMAIL'

export function requestReportEmail(loginData) {
  return (dispatch) => {
    return request
      .post('/rest/master/login', loginData)
      .then(response => dispatch(receivedLogin(response.data)));
  };
}

export function requestUpdateReportEmail(newEmail) {
  return (dispatch) => {
    return request
      .post('/rest/master/login', loginData)
      .then(response => dispatch(receivedLogin(response.data)));
  }
}

export function receivedReportEmail(data) {
  return {
    type: RECEIVED_REPORT_EMAIL,
    data
  }
}
