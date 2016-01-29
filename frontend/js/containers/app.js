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
