import React                from 'react';
import { connect } from 'react-redux'
import { requestLogin } from '../actions/SetupActions'
import {
  RaisedButton,
  SelectField,
  TextField,
  Tabs,
  Tab,
  RefreshIndicator,
  AppBar, IconButton, FlatButton, RadioButton, RadioButtonGroup
} from 'material-ui'

const NavigationClose = require('material-ui/lib/svg-icons/navigation/close.js');
const timezones = require('../../../timezones.json');
export default class Setup extends React.Component  {

  constructor(props) {
    super(props);
    this.state = {
      type: 'slave',
      timezoneIndex: 0
    }
  }

  componentDidUpdate(prevProps, prevState) {

  }

  _handleRadioChanged = (e) => {
    console.log(e.target.value);
    this.setState({
      type: e.target.value
    });
  };

  _handleTimezoneChanged = (e) => {
    
  };

  _handleApply = (e) => {
    let setting = {};
    console.log(this.refs.timezone);
    setting.wifi = {
      ssid: this.refs.ssid.getValue(),
      password: this.refs.password.getValue()
    };
    setting.system = {
      type: this.refs.serverType.getSelectedValue(),
      reportEmail: this.refs.adminEmail.getValue(),
      masterName: this.refs.connectToMaster.getValue(),
      timezone: timezones[this.state.timezoneIndex]
    };
    console.log(setting);
  };

  render() {
    let timezoneList = [];

    for(let timezone of timezones) {
      timezoneList.push({
        payload: timezone.offset,
        text: timezone.value
      });
    }

    const {loadingStatus} = this.props;

    return (
      <div style={{width: '100%', overflowX: 'hidden'}}>
        <AppBar title="Setup"
          style={{height: '55px', minHeight: '0px', marginTop: '-9px'}}
          titleStyle={{fontSize: '20px'}}
          iconElementLeft={
            <IconButton onTouchTap={function() {window.location.href = '#/manage/3';}} >
              <NavigationClose />
            </IconButton>
          }
        />
      <div className="row" style={{marginLeft: '25%'}}>
        <label style={{fontSize: '18px', marginTop: '15px'}}>S/N: HMEPI001</label>
      </div>
      <div className="row" style={{marginLeft: '25%'}}>
        <label style={{fontSize: '18px', marginTop: '15px'}}>Wifi Setting</label>
      </div>
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
        <div className="row" style={{display: 'none'}}>
          <TextField
            ref="pinCode"
            floatingLabelText="PIN CODE"
            hintText="PIN CODE"
            type="text" />
        </div>
      </div>
      <div className="row" style={{marginLeft: '25%'}}>
        <label style={{fontSize: '18px', marginTop: '15px'}}>System</label>
      </div>
      <div className="self-center" style={{width: "210px"}}>
        <RadioButtonGroup ref="serverType" name="type" defaultSelected="slave" onChange={this._handleRadioChanged}>
          <RadioButton
            value="master"
            label="Master"
          />
          <RadioButton
            value="slave"
            label="Slave"
          />
        </RadioButtonGroup>
        <TextField
          style={{ display: (this.state.type == 'master')? 'block' : 'none'}}
          ref="adminEmail"
          floatingLabelText="Administrator Email"
          hintText="Administrator Email"
          type="text" />
        <TextField
          style={{ display: (this.state.type == 'slave')? 'block' : 'none'}}
          ref="connectToMaster"
          floatingLabelText="Connect to Master"
          hintText="Connect to Master"
          type="text" />
      </div>
      <div className="row" style={{marginLeft: '25%'}}>
        <label style={{fontSize: '18px', marginTop: '15px'}}>Timezone</label>
      </div>
      <div className="self-center" style={{width: "210px"}}>
        <SelectField ref="timezone" menuItems={timezoneList} style={{width: '300px'}}/>
      </div>
      <div className="self-center" style={{width: "300px"}}>
        <div className='row'>
          <RaisedButton label="APPLY" onTouchTap={this._handleApply} style={{float: 'right', marginBottom: '15px'}}/>
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


export default connect(_injectPropsFromStore, _injectPropsFromActions)( Setup );
