import request from 'axios'

export const REQUEST_LOGIN = 'REQUEST_LOGIN'
export const RECEIVED_LOGIN = 'RECEIVED_LOGIN'

export function requestLogin(loginData) {
  console.log(loginData);
  // dispatch(function() {return {type: REQUEST_LOGIN});
  return (dispatch) => {
    return request
      .post('http://localhost:3000/rest/hme/login', loginData)
      .then(response => dispatch(receivedLogin(response.data)));
  };
}

export function receivedLogin(data) {
  return {
    type: RECEIVED_LOGIN,
    data
  }
}
