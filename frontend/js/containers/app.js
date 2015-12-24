
import React from 'react';
import { Router, Route, Link } from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

const LoginPage = require('../components/LoginPage');
const ManagePage = require('../components/ManagePage');
const LEDColorPage = require('../components/LEDColorPage');
const SettingGraph = require('../components/SettingGraph');
const ScheduleList = require('../components/ScheduleList');
const ScheduleDetail = require('../components/ScheduleDetail');

export default class App extends React.Component {
  render() {
    return (
      <Router>
        <Route path="/" component={LoginPage} />
        <Route path="/manage" component={ManagePage} />
        <Route path="/graph" component={SettingGraph} />
        <Route path="/schedule/list" component={ScheduleList} />
        <Route path="/schedule/edit" component={ScheduleDetail} />
        <Route path="/LEDColor" component={LEDColorPage}/>
      </Router>
    );
  }
}
