import React                from 'react';
import { connect } from 'react-redux'
// import { requestLogin } from '../actions/AuthActions'
import {
  RaisedButton,
  SelectField,
  TextField,
  Tabs,
  Tab,
  RefreshIndicator,
  AppBar, IconButton, FlatButton
} from 'material-ui'

const NavigationClose = require('material-ui/lib/svg-icons/navigation/close.js');

export default class  WifiSetting extends React.Component  {

  constructor(props) {
    super(props);
    this.state = {
    }
  }

  componentDidUpdate(prevProps, prevState) {

  }

  render() {
    let roles = [
       { payload: 'engineer', text: '原廠工程師' },
       { payload: 'admin', text: '主控者' },
       { payload: 'user', text: '操作人員' }
    ];
    const {loadingStatus} = this.props;
    return (
      <div>
        <AppBar title="Wifi Setting"
          style={{height: '55px', minHeight: '0px', marginTop: '-9px'}}
          titleStyle={{fontSize: '20px'}}
          iconElementLeft={
            <IconButton onTouchTap={function() {window.location.href = '#/manage/3';}} >
              <NavigationClose />
            </IconButton>
          }
        />
        <div className="self-center" style={{width: "210px"}}>
          <div className="row">
            <TextField
              ref="ssid"
              floatingLabelText="SSID"
              hintText="SSID"
              type="text" />
          </div>
          <div className="row">
            <TextField
              ref="password"
              floatingLabelText="Password"
              hintText="Password"
              type="password" />
          </div>
          <div className="row">
            <TextField
              ref="pinCode"
              floatingLabelText="PIN CODE"
              hintText="PIN CODE"
              type="text" />
          </div>
          <div className='row'>
            <RaisedButton label="APPLY" style={{float: 'right'}}/>
          </div>
        </div>
      </div>
    );
  }
}

function _injectPropsFromStore(state) {
  // let { login, isLoading } = state;
  return {
  };
}

const _injectPropsFromActions = {
  // requestLogin
}


export default connect(_injectPropsFromStore, _injectPropsFromActions)( WifiSetting );
