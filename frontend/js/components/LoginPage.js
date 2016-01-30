import React                from 'react';
import { connect } from 'react-redux'
import { requestLogin } from '../actions/AuthActions'
import {
  RaisedButton,
  SelectField,
  TextField,
  Tabs,
  Tab,
  RefreshIndicator
} from 'material-ui';

import md5 from 'md5';
export default class LoginPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loadingStatus: 'ready',
      role: 'engineer'
    }
  }

  _handleRoleChanged = (e) => {
    this.setState({
      role: e.target.value
    });
  };

  _login = (e) => {
    e.preventDefault();
    let Password = this.refs.password;
    let password = Password.getValue();
    if(password.length > 0) {
      this.props.requestLogin({
        role: this.state.role,
        password: md5(password)
      });
    }
    else {
      Password.clearValue();
      Password.focus();
      Password.setErrorText('Please fill the password field.');
      // alert('Please fill the password field.');
    }
  };

  componentDidUpdate(prevProps, prevState) {
    if('success' in this.props.login) {
      if(this.props.login.success) {
        window.location.href = "/#manage/0";
      }
      else {
        let Password = this.refs.password;
        Password.focus();
        Password.setErrorText('Wrong Password');
      }
    }
  }

  render() {
    let roles = [
       { payload: 'engineer', text: '原廠工程師' },
       { payload: 'admin', text: '主控者' },
       { payload: 'user', text: '操作人員' }
    ];
    const {loadingStatus} = this.props;
    return (
      <Tabs>
        <Tab label="Login">
          <div className="self-center" style={{width: "210px"}}>
            <div className="row">
              <SelectField
                onChange={this._handleRoleChanged}
                menuItems={roles}/>
            </div>
            <div className="row">
              <TextField
                ref="password"
                hintText="Password Field"
                type="password"
                onEnterKeyDown={this._login}/>
            </div>
            <div className="row" style={{height: '40px'}}>
              <RaisedButton label="Login" onTouchTap={this._login} style={{float:'right', marginRight:'10%'}}/>
              {/*
                this.props.isLoading &&
                <RefreshIndicator size={40} left={100} top={40} status="loading" />
              */}
            </div>
          </div>
        </Tab>
      </Tabs>
    );
  }
}

function _injectPropsFromStore(state) {
  let { login, isLoading } = state;
  return {
    login: login,
    isLoading: isLoading
  };
}

const _injectPropsFromActions = {
  requestLogin
}


export default connect(_injectPropsFromStore, _injectPropsFromActions)(LoginPage);
