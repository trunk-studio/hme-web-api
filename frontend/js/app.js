import React                from 'react';
import ReactDOM             from 'react-dom';
import { Router, Route, Link } from 'react-router'
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

const FlatButton = require('material-ui/lib/flat-button');
const RaisedButton = require('material-ui/lib/raised-button');
const SelectField = require('material-ui/lib/select-field');
const TextField = require('material-ui/lib/text-field');
const Tabs = require('material-ui/lib/tabs/tabs');
const Tab = require('material-ui/lib/tabs/tab');

const LoginPage = require('./components/LoginPage');
const ManagePage = require('./components/ManagePage');


ReactDOM.render(
  (<Router>
      <Route path="/" component={LoginPage}/>
      <Route path="/manage" component={ManagePage}/>
    </Router>) ,
  document.getElementById('react-view')
);
