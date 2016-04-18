require("jquery");
require('../../../node_modules/bootstrap/dist/css/bootstrap.min.css');
require('../../style/css/slider.css');
require('../../../node_modules/vertical-rc-slider/assets/index.css');
require('../../style/css/nv.d3.css');
require('../../style/css/graph.css');
require('../../style/css/xxs.css');

import jwtDecode from 'jwt-decode'
import React from 'react';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { browserHistory, Router, Route, Link, IndexRoute } from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import { autoRehydrate } from 'redux-persist';
import createLogger from 'redux-logger';
import reducers from '../reducers'
import configureStore from '../store/configureStore';

const store = configureStore();

// const history                   = createBrowserHistory();

import LoginPage from '../components/LoginPage';
import ManagePage from '../components/ManagePage';
import SettingGraph from '../components/SettingGraph';
import ScheduleList from '../components/ScheduleList';
import ScheduleDetail from '../components/ScheduleDetail';
import ScheduleDetailConfig from '../components/ScheduleDetailConfig';
import Setup from '../components/Setup';

// export default class RedirectToDefaultValue extends React.Component {
//   willTransitionTo (transition, params) {
//     transition.redirect(`#/manage/1`);
//   }
//   render () { return null; }
// }

export default class App extends React.Component {

  // only admin & engineer
  _requireAuth = (nextState, replaceState) => {
    if(!localStorage.getItem('token') || jwtDecode(localStorage.getItem('token')).aud != 'user') {
      replaceState({}, '/login');
    }
    else if(jwtDecode(localStorage.getItem('token')).role != 'engineer' && jwtDecode(localStorage.getItem('token')).role != 'administrator') {
      replaceState({}, '/manage');
    }
  };

  _requireLogin = (nextState, replaceState) => {
    // console.log('====', $('#react-view').data('page'));
    if( $('#react-view').data('page') == 'setup' ) {
      replaceState({}, '/setup');
    }
    else
      if(!localStorage.getItem('token') || jwtDecode(localStorage.getItem('token')).aud != 'user') {
        replaceState({}, '/login');
      }
  };

  _noAuth = (nextState, replaceState) => {
    if(localStorage.getItem('token')) {
      replaceState({}, '/manage');
    }
  };

  _alreadySetup = (nextState, replaceState) => {
    if($('#react-view').data('page') != 'setup' ) {
      replaceState({}, '/manage');
    }
  };

  render() {
    return (
      <Router history={browserHistory} >
        <Route path="/" component={LoginPage}  onEnter={this._requireLogin}/>
        <Route path="/login" component={LoginPage} onEnter={this._noAuth}/>
        <Route path="/manage" component={ManagePage} onEnter={this._requireLogin}/>
        <Route path="/graph" component={SettingGraph} />
        <Route path="/schedule/list" component={ScheduleList} onEnter={this._requireLogin}/>
        <Route path="/slave/:slaveId/schedule/edit/:scheduleID" component={ScheduleDetail} onEnter={this._requireAuth}/>
        <Route path="/slave/:slaveId/schedule/:scheduleID/config/:configID" component={ScheduleDetailConfig} onEnter={this._requireAuth}/>
        <Route path="/setup" component={Setup} onEnter={this._alreadySetup} />
        <Route path="/close" component={LoginPage} />
      </Router>
    );
  }
}
