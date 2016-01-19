import request from 'axios'

export const REQUEST_SCAN = 'REQUEST_SCAN'
export const RECEIVED_SCAN = 'RECEIVED_SCAN'
export const REQUEST_DEVICEGROUP = 'REQUEST_DEVICEGROUP'
export const RECEIVED_DEVICEGROUP = 'RECEIVED_DEVICEGROUP'
export const RECEIVED_SLAVE_LIST = 'RECEIVED_SLAVE_LIST'

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
      .get('/rest/slave/searchDevice')
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
      .get('/rest/slave/findAllDeviceGroups')
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
      .get(`/rest/slave/test/one/${deviceID}`)
  };
}

export function requestTestAllDevices() {
  return (dispatch) => {
    return request
      .get(`/rest/slave/test/all`)
  };
}

export function requestTestGroupDevices(groupID) {
  return (dispatch) => {
    return request
      .get(`/rest/slave/test/group/${groupID}`)
  };
}

export function requestGetCachedDeviceList() {
  return (dispatch) => {
    return request
      .get(`/rest/slave/getCachedDeviceList`)
      .then(response => dispatch(receivedScan(response.data)));
  }
}


export function requestGetCachedSlaveList() {
  return (dispatch) => {
    return request
    .get(`/rest/hme/getCachedSlaveList`)
    .then(response => dispatch(receivedSlaveList(response.data)));
  }
}

export function requestSearchSlave() {
  return (dispatch) => {
    return request
      .get(`/rest/hme/searchSlave`)
      .then(response => dispatch(receivedSlaveList(response.data)));
  }
}

export function receivedSlaveList(data) {
  return {
    type: RECEIVED_SLAVE_LIST,
    data
  }
}
