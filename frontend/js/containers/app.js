require("jquery");
require('../../../node_modules/bootstrap/dist/css/bootstrap.min.css');
require('../../style/css/graph.css');
require('../../style/css/nv.d3.css');
require('../../style/css/slider.css');

import React from 'react';
import { Router, Route, Link } from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

const LoginPage = require('../components/LoginPage');
const ManagePage = require('../components/ManagePage');
const SettingGraph = require('../components/SettingGraph');
const ScheduleList = require('../components/ScheduleList');
const ScheduleDetail = require('../components/ScheduleDetail');
const ScheduleDetailConfig = require('../components/ScheduleDetailConfig');
import WifiSetting from '../components/WifiSetting';

// export default class RedirectToDefaultValue extends React.Component {
//   willTransitionTo (transition, params) {
//     transition.redirect(`#/manage/1`);
//   }
//   render () { return null; }
// }



export default class App extends React.Component {
  render() {
    return (
      <Router>
        <Route path="/" component={LoginPage} />
        <Route path="/manage/:tabIndex" component={ManagePage} />
        <Route path="/graph" component={SettingGraph} />
        <Route path="/schedule/list" component={ScheduleList} />
        <Route path="/schedule/edit/:scheduleID" component={ScheduleDetail} />
        <Route path="/schedule/:scheduleID/config/:configID" component={ScheduleDetailConfig} />
        <Route path="/wifisetting" component={WifiSetting} />
      </Router>
    );
  }
}
