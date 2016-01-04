import React                from 'react';
import { connect } from 'react-redux'
import { requestScan, receivedScan } from '../actions/TestActions'

const RaisedButton = require('material-ui/lib/raised-button');
const SelectField = require('material-ui/lib/select-field');
const TextField = require('material-ui/lib/text-field');
const Tabs = require('material-ui/lib/tabs/tabs');
const Tab = require('material-ui/lib/tabs/tab');
const ScheduleList = require('./ScheduleList');

export default class ManagePage extends React.Component {


  _handleScan = (e) => {
    this.props.requestScan();
  }

  componentDidUpdate(prevProps, prevState) {
    // if(this.props.deviceList.length) {
    //   let scanResult = [];
    //   for(let device of this.props.deviceList) {
    //       scanResult.push({payload: 'DevID', text: 'DevID'});
    //   }
    // }
  }

  render() {

    let groups = [
       { payload: '1', text: 'group1' },
       { payload: '2', text: 'group2' },
       { payload: '3', text: 'group3' },
    ];
    return (
      <Tabs>
        <Tab label="TEST">
          <div className="self-center" style={{width: '350px'}}>
            <div style={{display: 'table-caption'}}>
              <div style={{display: 'inline-flex'}}>
                <RaisedButton label="SCAN" onTouchTap={this._handleScan}/>
              </div>
              <div style={{display: 'inline-flex'}}>
                <SelectField menuItems={this.props.scanResult}/>
                <RaisedButton label="TEST" />
              </div>
              <div style={{display: 'inline-flex'}}>
                <SelectField menuItems={groups}/>
                <RaisedButton label="Grouping" />
              </div>
            </div>
          </div>
        </Tab>
        <Tab label="Group Test">
          <div className="self-center" style={{width: '220px'}}>
            <div style={{display: 'table-caption'}}>
              <SelectField menuItems={groups}/>
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
              <SelectField menuItems={groups}/>
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
  let scanResult = [];
  if(scanDevice.deviceList) {
    for(let device of scanDevice.deviceList) {
      scanResult.push({payload: device.DevID, text: device.DevID});
    }
  }
  return {
    scanResult: scanResult
  };
}

const _injectPropsFromActions = {
  requestScan
}


export default connect(_injectPropsFromStore, _injectPropsFromActions)(ManagePage);
