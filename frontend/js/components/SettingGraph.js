import React                from 'react';
import { connect } from 'react-redux'
import { requestLogin } from '../actions/AuthActions'

const RaisedButton = require('material-ui/lib/raised-button');
const SelectField = require('material-ui/lib/select-field');
const TextField = require('material-ui/lib/text-field');
const Tabs = require('material-ui/lib/tabs/tabs');
const Tab = require('material-ui/lib/tabs/tab');
const RefreshIndicator = require('material-ui/lib/refresh-indicator');

export default class LoginPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loadingStatus: 'ready',
      role: 'engineer'
    }
  }

  render() {

    return (
      <div id="chart1" class="chart" />
    );
  }
}

function _injectPropsFromStore(state) {
  // let { login, isLoading } = state;
  return {
  };
}

const _injectPropsFormActions = {
  requestLogin
}


export default connect(_injectPropsFromStore, _injectPropsFormActions)(LoginPage);
