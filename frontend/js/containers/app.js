require("jquery");
require('../../../node_modules/bootstrap/dist/css/bootstrap.min.css');
require('../../style/css/graph.css');
require('../../style/css/nv.d3.css');
require('../../style/css/slider.css');

import jwtDecode from 'jwt-decode'
import React from 'react';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { Router, Route, Link, IndexRoute } from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { autoRehydrate } from 'redux-persist';
import createLogger from 'redux-logger';
import reducers from '../reducers'
import configureStore from '../store/configureStore';
const store = configureStore();

// const history                   = createBrowserHistory();

injectTapEventPlugin();

import LoginPage from '../components/LoginPage';
import ManagePage from '../components/ManagePage';
import SettingGraph from '../components/SettingGraph';
import ScheduleList from '../components/ScheduleList';
import ScheduleDetail from '../components/ScheduleDetail';
import ScheduleDetailConfig from '../components/ScheduleDetailConfig';
import WifiSetting from '../components/WifiSetting';

// export default class RedirectToDefaultValue extends React.Component {
//   willTransitionTo (transition, params) {
//     transition.redirect(`#/manage/1`);
//   }
//   render () { return null; }
// }



export default class App extends React.Component {

  _requireAuth = (nextState, replaceState) => {
    if(!localStorage.getItem('token') || jwtDecode(localStorage.getItem('token')).aud != 'user') {
      console.log('fail');
      replaceState({}, '/login');
    }
  };

  render() {
    return (
      <Router>
        <Route path="/" component={LoginPage}  onEnter={this._requireAuth}/>
        <Route path="/login" component={LoginPage} />
        <Route path="/manage/:tabIndex" component={ManagePage} onEnter={this._requireAuth}/>
        <Route path="/graph" component={SettingGraph} />
        <Route path="/schedule/list" component={ScheduleList} onEnter={this._requireAuth}/>
        <Route path="/schedule/edit/:scheduleID" component={ScheduleDetail} onEnter={this._requireAuth}/>
        <Route path="/schedule/:scheduleID/config/:configID" component={ScheduleDetailConfig} onEnter={this._requireAuth}/>
        <Route path="/setup" component={WifiSetting} />
      </Router>
    );
  }
}
