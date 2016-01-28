import request from 'axios'

export const RECEIVED_REPORT_EMAIL = 'RECEIVED_REPORT_EMAIL'
export const UPDATE_EMAIL_LOADING_STATUS = 'UPDATE_EMAIL_LOADING_STATUS'

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
