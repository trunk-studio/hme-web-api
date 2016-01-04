import request from 'axios'

export const REQUEST_CREATE = 'REQUEST_CREATE'
export const RECEIVED_CREATE = 'RECEIVED_CREATE'

export const REQUEST_LIST = 'REQUEST_LIST'
export const RECEIVED_LIST = 'RECEIVED_LIST'

export function requestCreate() {
  // dispatch(function() {return {type: REQUEST_LOGIN});
  return (dispatch) => {
    return request
      .post('/rest/schedule/create')
      .then(response => dispatch(receivedCreate(response.data)));
  };
}

export function receivedCreate(data) {
  console.log("receivedCreate !!!!!!!!",data);
  return {
    type: RECEIVED_CREATE,
    data
  }
}


export function requestGetList() {
  // dispatch(function() {return {type: REQUEST_LOGIN});
  return (dispatch) => {
    return request
      .get('/rest/schedule/findAll')
      .then(response => dispatch(receivedGetList(response.data)));
  };
}

export function receivedGetList(data) {
  console.log("receivedGetList !!!!!!!!",data);
  return {
    type: RECEIVED_LIST,
    data
  }
}
