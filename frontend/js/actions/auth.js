import request from 'axios'

export const REQUEST_LOGIN = 'REQUEST_LOGIN'
export const RECEIVED_LOGIN = 'RECEIVED_LOGIN'

export function requestLogin(loginData) {
  console.log('request params',loginData);
  return (dispatch) => {
    return request
      .post('http://localhost:3000/rest/hme/login',{
        role: 'admin',
        password: 'admin'
      })
      .then((response) => {
        console.log('res',response);
        return dispatch(receivedLogin(response.data));
      });
  }
  // return (dispatch) => {
  // return ProfileApiUtils.loginAdmin(params)
  //   .then((user) => {
  //     return dispatch(receivedProfileData(user));
  //   });
// }
  // console.log(response);

  // return (dispatch) => {
  //   return dispatch(receivedLogin(response));
  // }
  // return {
  //   type: REQUEST_LOGIN,
  //   loginData
  // }
}

export function receivedLogin(data) {
  console.log('received params',data);
  return {
    type: RECEIVED_LOGIN,
    data
  }
}
