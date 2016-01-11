import React                from 'react';
import { connect } from 'react-redux'
import {
  requestScan, requestDeviceGroup, requestTestOneDevice,
  requestTestGroupDevices, requestTestAllDevices
} from '../actions/TestActions'

const RaisedButton = require('material-ui/lib/raised-button');
const SelectField = require('material-ui/lib/select-field');
const TextField = require('material-ui/lib/text-field');
const Tabs = require('material-ui/lib/tabs/tabs');
const Tab = require('material-ui/lib/tabs/tab');
const ScheduleList = require('./ScheduleList');

export default class ManagePage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      groupID: 0,
      deviceID: 0
    }
  }

  _handleScan = (e) => {
    this.props.requestScan();
  }

  _testOneDevice = (e) => {
    this.props.requestTestOneDevice(this.state.deviceID);
  }

  _testGroupDevice = (e) => {
    this.props.requestTestGroupDevices(this.state.groupID);
  }

  _deviceMenuIndexChanged = (e, value) => {
    this.setState({
      deviceID: value
    })
  }

  _gruopMenuIndexChanged = (e, value) => {
    this.setState({
      groupID: value
    })
  }

  componentDidMount() {
    this.props.requestScan();
    this.props.requestDeviceGroup();
  }

  componentDidUpdate(prevProps, prevState) {
  }

  render() {

    return (
      <Tabs>
        <Tab label="TEST">
          <div className="self-center" style={{width: '350px'}}>
            <div style={{display: 'table-caption'}}>
              <div style={{display: 'inline-flex'}}>
                <RaisedButton label="SCAN" onTouchTap={this._handleScan}/>
              </div>
              <div style={{display: 'inline-flex'}}>
                <SelectField onChange={this._deviceMenuIndexChanged} ref="deviceMenu" menuItems={this.props.deviceList}/>
                <RaisedButton label="TEST" onTouchTap={this._testOneDevice}/>
              </div>
              <div style={{display: 'inline-flex'}}>
                <SelectField onChange={this._deviceMenuIndexChanged}
                  ref="groupMenu" menuItems={this.props.groupList}/>
                <RaisedButton label="Grouping" onTouchTap={this._testGroupDevice}/>
              </div>
            </div>
          </div>
        </Tab>
        <Tab label="Group Test">
          <div className="self-center" style={{width: '220px'}}>
            <div style={{display: 'table-caption'}}>
              <SelectField menuItems={this.props.groupList}/>
              <RaisedButton label="TEST" />
            </div>
          </div>
        </Tab>
        <Tab label="Report Setting">
          <div className="self-center" style={{width: '200px'}}>
            <div style={{display: 'table-caption'}}>
              <TextField
                hintText="Report Email"
                floatingLabelText="Report Email"
                type="text" />
              <SelectField menuItems={this.props.groupList}/>
              <RaisedButton label="Add in" style={{float: 'right', marginRight:'10%'}}/>
            </div>
          </div>
        </Tab>
        <Tab label='Schedule List'>
          <ScheduleList />
        </Tab>
      </Tabs>
    );
  }
}

function _injectPropsFromStore(state) {
  let { scanDevice } = state;
  let scanResult = [],
      groupList = [];
  if(scanDevice.deviceList) {
    for(let device of scanDevice.deviceList) {
      scanResult.push({payload: device.DevID, text: device.DevID});
    }
  }

  if(scanDevice.groupList) {
    for(let group of scanDevice.groupList) {
      groupList.push({payload: group.id, text: group.id});
    }
  }
  return {
    deviceList: scanResult,
    groupList: groupList
  };
}

const _injectPropsFromActions = {
  requestScan,
  requestDeviceGroup,
  requestTestGroupDevices,
  requestTestAllDevices,
  requestTestOneDevice
}


export default connect(_injectPropsFromStore, _injectPropsFromActions)(ManagePage);
