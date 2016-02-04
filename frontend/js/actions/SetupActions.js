import request from 'axios'

export const REQUEST_SETUP_SETTING = 'REQUEST_SETUP_SETTING'
export const RECEIVED_SETUP_SETTING = 'RECEIVED_SETUP_SETTING'
export const UPDATE_SETUP_SETTING_LOADING_STATUS = 'UPDATE_SETUP_SETTING_LOADING_STATUS'

export function requestGetSetupSetting(loginData) {
  return (dispatch) => {
    dispatch(updateSetupSettingLoadingStatus('loading'));
    return request
      .get('/rest/setup')
      .then(response => {
        dispatch(receivedSetupData(response.data));
        dispatch(updateSetupSettingLoadingStatus('hide'));
      });
  };
}

export function requestUpdateSetup(setting) {
  return (dispatch) => {
    dispatch(updateSetupSettingLoadingStatus('loading'));
    return request
      .post('/rest/hme/setup/update', setting)
      .then(response => {
        // requestGetSetupSetting();
        dispatch(updateSetupSettingLoadingStatus('hide'));
      });
  }
}

export function receivedSetupData(data) {
  return {
    type: RECEIVED_SETUP_SETTING,
    data
  };
}

export function updateSetupSettingLoadingStatus(status) {
  return {
    type: UPDATE_SETUP_SETTING_LOADING_STATUS,
    status
  }
}
