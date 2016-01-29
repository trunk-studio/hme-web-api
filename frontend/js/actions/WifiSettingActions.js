import request from 'axios'

export const REQUEST_WIFI_SETTING = 'REQUEST_WIFI_SETTING'
export const RECEIVED_WIFI_SETTING = 'RECEIVED_WIFI_SETTING'
export const UPDATE_WIFI_SETTING_LOADING_STATUS = 'UPDATE_WIFI_SETTING_LOADING_STATUS'

export function requestGetWifiSetting(loginData) {
  return (dispatch) => {
    dispatch(updateWifiSettingLoadingStatus('loading'));
    return request
      .post('/rest/master/login', loginData)
      .then(response => {
        dispatch(receivedLogin(response.data));
        dispatch(updateWifiSettingLoadingStatus('hide'));        
      });
  };
}

export function requestUpdateWifiSetting(setting) {
  return (dispatch) => {
    dispatch(updateWifiSettingLoadingStatus('loading'));
    return request
      .post('', setting)
      .then(response => {
        requestGetWifiSetting();
        dispatch(updateWifiSettingLoadingStatus('hide'));
      });
  }
}

export function receivedWifiSetting(data) {
  return {
    type: RECEIVED_LOGIN,
    data
  }
}


export function updateWifiSettingLoadingStatus(status) {
  return {
    type: UPDATE_WIFI_SETTING_LOADING_STATUS,
    status
  }
}
