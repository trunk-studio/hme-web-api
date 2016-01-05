import request from 'axios'

export const RECEIVED_SCHEDULE_DETAIL = 'RECEIVED_SCHEDULE_DETAIL'
export const RECEIVED_UPDATED_SCHEDULE_DETAIL = 'RECEIVED_UPDATED_SCHEDULE_DETAIL'
export const SET_SLIDER_VALUE = 'SET_SLIDER_VALUE'


export function requestGetScheduleDetail(scheduleID) {
  return (dispatch) => {
    return request
      .get(`/rest/schedule/${scheduleID}`)
      .then(response => dispatch(receivedScheduleDetail(response.data)));
  };
}

export function receivedScheduleDetail(data) {
  console.log('received',data);
  return {
    type: RECEIVED_SCHEDULE_DETAIL,
    data
  }
}

export function requestUpdateScheduleDetail(scheduleDetailData) {
  return (dispatch) => {
    return request
      .post('/rest/schedule/update/detail', scheduleDetailData)
      .then(response => dispatch(receivedScheduleDetail(response.data)));
  };
}
