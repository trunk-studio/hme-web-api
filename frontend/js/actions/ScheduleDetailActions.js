import request from 'axios'

export const RECEIVED_SCHEDULE_DETAIL = 'RECEIVED_SCHEDULE_DETAIL'
export const RECEIVED_UPDATED_SCHEDULE_DETAILS = 'RECEIVED_UPDATED_SCHEDULE_DETAILS'
// export const SET_SCHEDULE_TIME = 'SET_SCHEDULE_TIME'
// export const SET_SCHEDULE_WEIGHT = 'SET_SCHEDULE_WEIGHT'
export const MODIFY_SCHEDULE = 'MODIFY_SCHEDULE'
export const UPDATE_DETAIL_LOADING = 'UPDATE_DETAIL_LOADING'


export function requestGetScheduleDetail(scheduleID) {
  return (dispatch) => {
    dispatch(updateDetailLoadingStatus('loading'));
    return request
      .get(`/rest/master/schedule/${scheduleID}`)
      .then(response => {
        dispatch(receivedScheduleDetail(response.data))
        dispatch(updateDetailLoadingStatus('hide'));
      });
  };
}

export function receivedScheduleDetail(data) {
  console.log('received',data);
  return {
    type: RECEIVED_SCHEDULE_DETAIL,
    data
  }
}

// modify slider trigger graph redraw
export function modifySchedule(data) {
  return {
    type: MODIFY_SCHEDULE,
    data
  }
}

export function requestUpdateScheduleDetails(scheduleDetailsData) {
  return (dispatch) => {
    dispatch(updateDetailLoadingStatus('loading'));
    return request
      .post('/rest/master/schedule/update/details', scheduleDetailsData)
      .then(response => {
        dispatch(receivedUpdateScheduleDetails(response.data))
        dispatch(updateDetailLoadingStatus('hide'));
      });
  };
}

export function receivedUpdateScheduleDetails(data) {
  return {
    type: RECEIVED_UPDATED_SCHEDULE_DETAILS,
    data
  }
}

export function updateDetailLoadingStatus(status) {
  return {
    type: UPDATE_DETAIL_LOADING,
    status
  }
}
