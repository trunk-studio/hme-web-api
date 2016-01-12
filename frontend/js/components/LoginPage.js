import React                from 'react';
import { connect } from 'react-redux'
import { requestLogin } from '../actions/AuthActions'

import {
  MenuItem, RaisedButton, SelectField, TextField,
  Tabs, Tab, RefreshIndicator
} from 'material-ui';

export default class LoginPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loadingStatus: 'ready',
      role: 'engineer',
      passwordErrorText: ''
    }
  }

  _handleRoleChanged = (e) => {
    this.setState({
      role: e.target.value
    });
  }

  _login = (e) => {
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
      this.setState({passwordErrorText: 'Please fill the password field.'});
      Password.focus();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if('success' in this.props.login) {
      if(this.props.login.success) {
        window.location.href = "/#manage";
      }
      else {
        let Password = this.refs.password;
        Password.focus();
        this.setState({passwordErrorText: 'Wrong Password.'});
      }
    }
  }

  render() {
    let roles = [
       { payload: 'engineer', text: '原廠工程師' },
       { payload: 'admin', text: '主控者' },
       { payload: 'user', text: '操作人員' }
    ];
    let menuItems = [];
    for (let i=0;i<roles.length;i++) {
      menuItems.push(<MenuItem key={i} value={roles[i].payload} primaryText={roles[i].text} />);
    }
    const {loadingStatus} = this.props;
    return (
      <Tabs>
        <Tab label="Login">
          <div className="self-center" style={{width: "210px"}}>
            <div className="row">
              <SelectField value={this.state.role}
                onChange={this._handleRoleChanged} >
                {menuItems}
              </SelectField>
            </div>
            <div className="row">
              <TextField
                ref="password"
                hintText="Password Field"
                errorText={this.state.passwordErrorText}
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
