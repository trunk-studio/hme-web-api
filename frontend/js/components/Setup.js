import React                from 'react';
import { connect } from 'react-redux'
import { requestUpdateSetup, requestGetSetupSetting } from '../actions/SetupActions'
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
      tmpSSID: '',
      tmpPassword: '',
      tmpEmail: '',
      tmpMaster: '',
      timezoneIndex: 0
    }
  }

  componentDidMount() {

  }
  componentWillMount() {
    this.props.requestGetSetupSetting();
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevProps.setupSetting !=  this.props.setupSetting) {
      this.setState({
        tmpSSID: this.props.setupSetting.WIFI.SSID,
        tmpPassword: this.props.setupSetting.WIFI.PASSWORD,
        tmpEmail: this.props.setupSetting.SYSTEM.REPORT_EMAIL,
        tmpMaster: this.props.setupSetting.SYSTEM.MASTER_NAME,
        timezoneIndex: parseInt(this.props.setupSetting.SYSTEM.TIMEZONE_INDEX) || 0
      });
    }
  }

  _handleRadioChanged = (e) => {
    // console.log(e.target.value);
    this.setState({
      type: e.target.value
    });
  };

  _handleTimezoneChanged = (e, index) => {
    // console.log('obj', e);
    this.setState({
      timezoneIndex: index
    });
  };

  _handleApply = (e) => {
    let setting = {};
    console.log(this.refs.timezone);
    setting.WIFI = {
      SSID: this.refs.ssid.getValue(),
      PASSWORD: this.refs.password.getValue()
    };
    setting.SYSTEM = {
      TYPE: this.refs.serverType.getSelectedValue(),
      REPORT_EMAIL: this.refs.adminEmail.getValue(),
      MASTER_NAME: this.refs.connectToMaster.getValue(),
      TIMEZONE_OFFSET: timezones[this.state.timezoneIndex].offset,
      TIMEZONE_INDEX: this.state.timezoneIndex
    };
    console.log(setting);
    this.props.requestUpdateSetup(setting);
  };

  _handleEditSSID = (e) => {
    this.setState({
      tmpSSID: e.target.value
    })
  };

  _handleEditPassword = (e) => {
    this.setState({
      tmpPassword: e.target.value
    })
  };

  _handleEditEmail = (e) => {
    this.setState({
      tmpEmail: e.target.value
    })
  };

  _handleEditMaster = (e) => {
    this.setState({
      tmpMaster: e.target.value
    })
  };


  render() {
    let timezoneList = [];

    for(let timezone of timezones) {
      timezoneList.push({
        payload: timezoneList.length,
        text: timezone.value
      });
    }
    const {loadingStatus} = this.props;
    let setupData = this.props.setupSetting || {
      WIFI: {
        SSID: '',
        PASSWORD: ''
      },
      SYSTEM: {
        HME_SERIAL: '',
        TYPE: '',
        REPORT_EMAIL: '',
        MASTER_NAME: '',
        TIMEZONE_OFFSET: '0'
      }
    };

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
        <label style={{fontSize: '18px', marginTop: '15px'}}>S/N: {setupData.SYSTEM.HME_SERIAL}</label>
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
            type="text"
            value={this.state.tmpSSID}
            onChange={this._handleEditSSID} />
        </div>
        <div className="row">
          <TextField
            ref="password"
            floatingLabelText="Password"
            hintText="Password"
            type="password"
            value={this.state.tmpPassword}
            onChange={this._handleEditPassword} />
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
        <RadioButtonGroup ref="serverType" name="type" defaultSelected={setupData.SYSTEM.TYPE || "slave" } onChange={this._handleRadioChanged}>
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
          type="text"
          onChange={this._handleEditEmail}
          value={this.state.tmpEmail} />
        <TextField
          style={{ display: (this.state.type == 'slave')? 'block' : 'none'}}
          ref="connectToMaster"
          floatingLabelText="Connect to Master"
          hintText="Connect to Master"
          type="text"
          onChange={this._handleEditMaster}
          value={this.state.tmpMaster} />
      </div>
      <div className="row" style={{marginLeft: '25%'}}>
        <label style={{fontSize: '18px', marginTop: '15px'}}>Timezone</label>
      </div>
      <div className="self-center" style={{width: "210px"}}>
        <SelectField ref="timezone" onChange={this._handleTimezoneChanged} menuItems={timezoneList} style={{width: '300px'}} value={this.state.timezoneIndex} />
      </div>
      <div className="self-center" style={{width: "300px"}}>
        <div className='row'>
        <RaisedButton label="APPLY" onTouchTap={this._handleApply} style={{float: 'right', marginBottom: '15px'}} />
          <RefreshIndicator
            size={40}
            left={-10}
            top={0}
            status={this.props.isLoading || 'hide'}
            style={{
              float: 'right',
              display: 'inline-block',
              position: 'relative'}} />
        </div>
      </div>
    </div>
    );
  }
}

function _injectPropsFromStore(state) {
  let { setup } = state;
  console.log('set', setup);
  return {
    isLoading: setup? setup.isLoading : 'hide',
    setupSetting: setup.setupSetting || null
  };
}

const _injectPropsFromActions = {
  // requestLogin
  requestUpdateSetup,
  requestGetSetupSetting
}


export default connect(_injectPropsFromStore, _injectPropsFromActions)( Setup );
