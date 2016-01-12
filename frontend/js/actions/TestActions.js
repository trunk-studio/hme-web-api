import request from 'axios'

export const REQUEST_SCAN = 'REQUEST_SCAN'
export const RECEIVED_SCAN = 'RECEIVED_SCAN'
export const REQUEST_DEVICEGROUP = 'REQUEST_DEVICEGROUP'
export const RECEIVED_DEVICEGROUP = 'RECEIVED_DEVICEGROUP'

export const RECEIVED_TEST_SET_LED_DISPLAY = 'RECEIVED_TEST_SET_LED_DISPLAY'

export function requestTestSetLedDisplay(data) {
  return (dispatch) => {
    return request
      .post('/rest/slave/test/setLedDisplay',data)
      .then(response => dispatch(receivedTestSetLedDisplay(response.data)));
  };
}

export function receivedTestSetLedDisplay(data) {
  return {
    type: RECEIVED_TEST_SET_LED_DISPLAY,
    data
  }
}

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

export function requestTestOneDevice(deviceID) {
  return (dispatch) => {
    return request
      .get(`/rest/hme/device/test/one/${deviceID}`)
  };
}

export function requestTestAllDevices() {
  return (dispatch) => {
    return request
      .get(`/rest/hme/device/test/all`)
  };
}

export function requestTestGroupDevices(groupID) {
  return (dispatch) => {
    return request
      .get(`/rest/hme/device/test/group/${groupID}`)
  };
}
