import request from 'axios'

export const REQUEST_SCAN = 'REQUEST_SCAN'
export const RECEIVED_SCAN = 'RECEIVED_SCAN'
export const REQUEST_DEVICEGROUP = 'REQUEST_DEVICEGROUP'
export const RECEIVED_DEVICEGROUP = 'RECEIVED_DEVICEGROUP'

export function requestScan() {
  // dispatch(function() {return {type: REQUEST_LOGIN});
  return (dispatch) => {
    return request
      .get('/rest/hme/searchDevice')
      .then(response => dispatch(receivedScan(response.data)));
  };
}

export function receivedScan(data) {
  return {
    type: RECEIVED_SCAN,
    data
  }
}

export function requestDeviceGroup() {
  // dispatch(function() {return {type: REQUEST_LOGIN});
  return (dispatch) => {
    return request
      .get('/rest/hme/deviceGroup/findAll')
      .then(response => dispatch(receivedDeviceGroup(response.data)));
  };
}

export function receivedDeviceGroup(data) {
  return {
    type: RECEIVED_DEVICEGROUP,
    data
  }
}
