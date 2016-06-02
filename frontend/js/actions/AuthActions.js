import request from 'axios'

export const REQUEST_LOGIN = 'REQUEST_LOGIN'
export const RECEIVED_LOGIN = 'RECEIVED_LOGIN'
export const USER_ROLE = 'USER_ROLE'
export const LOGOUT = 'LOGOUT'
import jwtDecode from 'jwt-decode'

export function requestLogin(loginData) {
  return (dispatch) => {
    return request
      .post('/rest/master/login', loginData)
      .then(response => {
        dispatch(receivedLogin(response.data))
        if(response.data.success) {
          getRole();
        }
      });
  };
}

export function receivedLogin(data) {
  if(data.success) {
    // console.log('data', data);
    localStorage.setItem('token', data.jwt);
  }
  return {
    type: RECEIVED_LOGIN,
    data
  }
}

export function getRole() {
    const user = jwtDecode(localStorage.getItem('token'));
    const role = user.role;
    return (dispatch) => {
      dispatch({type: USER_ROLE,role});
    }
}


export function logout() {
  localStorage.removeItem('token');
  return (dispatch) => {
    dispatch({type: LOGOUT});
  }
}

// export function clearLoginStatus() {
//   return {
//     type: LOGOUT
//   };
// }
