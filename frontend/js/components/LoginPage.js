import React                from 'react';
import { connect } from 'react-redux'
import { requestLogin } from '../actions/AuthActions'

const RaisedButton = require('material-ui/lib/raised-button');
const SelectField = require('material-ui/lib/select-field');
const TextField = require('material-ui/lib/text-field');
const Tabs = require('material-ui/lib/tabs/tabs');
const Tab = require('material-ui/lib/tabs/tab');


export default class LoginPage extends React.Component {

  constructor(props) {
    super(props);
    this._login = this._login.bind(this);
    this._handleRoleChanged = this._handleRoleChanged.bind(this);
    this.state = {
      role: 'engineer'
    }
  }

  _handleRoleChanged(e) {
    this.setState({
      role: e.target.value
    });
  }

  _login(e) {
    e.preventDefault();
    let Password = this.refs.password;
    let password = Password.getValue();
    if(password.length > 0) {
      this.props.requestLogin({
        role: this.state.role,
        password: password
      });
    }
    else {
      Password.clearValue();
      Password.focus();
      Password.setErrorText('Please fill the password field.');
      // alert('Please fill the password field.');
    }
  }

  componentDidMount() {
    console.log('did');
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.login.success)
      window.location = "#manage";
    else {
      let Password = this.refs.password;
      Password.focus();
      Password.setErrorText('Wrong Password');
    }
  }

  render() {
    let roles = [
       { payload: 'engineer', text: '原廠工程師' },
       { payload: 'admin', text: '主控者' },
       { payload: 'user', text: '操作人員' },
    ];
    return (
      <Tabs>
        <Tab label="Login">
          <div style={{display: 'table-caption'}}>
            <SelectField
              onChange={this._handleRoleChanged}
              menuItems={roles}/>
            <TextField
              ref="password"
              hintText="Password Field"
              type="password" />
            <RaisedButton label="Login" onTouchTap={this._login}/>
        </div>
        </Tab>
      </Tabs>
    );
  }
}

function _injectPropsFromStore(state) {
  console.log('inject',state);
  let { login } = state;
  return {
    login: login
  };
}

const _injectPropsFormActions = {
  requestLogin
}


export default connect(_injectPropsFromStore, _injectPropsFormActions)(LoginPage);
