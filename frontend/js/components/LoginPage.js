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
import configureStore from '../store/configureStore';
const store = configureStore();
export default class LoginPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loadingStatus: 'ready',
      role: 'administrator',
      sendLogin: false
    }
  }

  _handleRoleChanged = (e) => {
    this.setState({
      role: e.target.value,
      sendLogin: false
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
    this.setState({
      sendLogin: true
    });
    localStorage.setItem('HME_manage_tabIndex', 2);
  };

  componentDidUpdate(prevProps, prevState) {
    // if('success' in this.props.login) {
      let Password = this.refs.password;
      if(this.props.login.success && !prevProps.login.success) {
        window.location.href = "/#manage";
      }
      else if( !this.props.login.success && prevState.sendLogin ){
        Password.focus();
        Password.setErrorText('Wrong Password');
      }
    // }
  }

  render() {
    let roles = [
      // { payload: 'operator', text: 'operator' },
      { payload: 'administrator', text: 'administrator' },
      { payload: 'engineer', text: 'engineer' }
    ];
    const {loadingStatus} = this.props;
    return (
      <Tabs className="tabs-container"  tabItemContainerStyle={{backgroundColor: "#032c70", marginTop: '-15px'}} contentContainerStyle={{backgroundColor: 'rgba(0,0,0,0)'}}>
        <Tab label="Login" className="tab-item">
          <div className="tab-content self-center">
            <div className="self-center" style={{width: "210px", paddingTop: '15px'}} >
              <div className="row">
                <SelectField
                  iconStyle={{fill: '#000'}}
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
