import React                from 'react';
import { connect } from 'react-redux'
import {
  requestScan, requestDeviceGroup, requestTestOneDevice,
  requestTestGroupDevices, requestTestAllDevices,
  requestTestSetLedDisplay, requestGetCachedDeviceList,
  requestSearchSlave, requestGetCachedSlaveList,
  requestSearchSlaveAndDevice, requestGetSlaveAndDeviceList
} from '../actions/TestActions'

import {
  logout, getRole
} from '../actions/AuthActions'

import {
  requestGetReportEmail, requestUpdateReportEmail,
  requestGetDeviceStatus
} from '../actions/ManageActions'

// import ThemeManager from 'material-ui/lib/styles/theme-manager';
// import HmeTheme from '../hme_theme';
const RaisedButton = require('material-ui/lib/raised-button');
const SelectField = require('material-ui/lib/select-field');
const TextField = require('material-ui/lib/text-field');
const Tabs = require('material-ui/lib/tabs/tabs');
const Tab = require('material-ui/lib/tabs/tab');
const ScheduleList = require('./ScheduleList');
const LineChart = require("react-chartjs").Line;

import { Slider } from 'material-ui';
import SliderRc from 'rc-slider';
import RefreshIndicator from 'material-ui/lib/refresh-indicator';

export default class ManagePage extends React.Component {

  // childContextTypes() {
  //   muiTheme: React.PropTypes.object
  // }
  //
  // getChildContext() {
  //   return {
  //     muiTheme: ThemeManager.getMuiTheme(HmeTheme),
  //   };
  // };

  constructor(props) {
    super(props);
    this.state = {
      cctSliderStyle: 'slider',
      currentIndex: 0,
      DB: [0 ,0 ,0 ,0 ,0 ,0.001011122 ,0.005055612 ,0.008088979 ,0.018200202 ,0.037411527 ,0.072800809 ,0.127401416 ,0.209302326 ,0.323559151 ,0.477249747 ,0.649140546 ,0.68958544 ,0.649140546 ,0.520728008 ,0.416582406 ,0.333670374 ,0.260869565 ,0.209302326 ,0.164812942 ,0.128412538 ,0.098078868 ,0.072800809 ,0.053589484 ,0.038422649 ,0.026289181 ,0.018200202 ,0.012133468 ,0.008088979 ,0.005055612 ,0.003033367 ,0.002022245 ,0.002022245 ,0.002022245 ,0.001011122 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0],
      BL: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.001011122, 0.004044489, 0.006066734, 0.014155713, 0.03033367, 0.057633974, 0.102123357, 0.166835187, 0.258847321, 0.381193124, 0.519716886, 0.552072801, 0.519716886, 0.416582406, 0.332659252, 0.266936299, 0.209302326, 0.166835187, 0.131445905, 0.102123357, 0.077856421, 0.058645096, 0.042467139, 0.03033367, 0.021233569, 0.014155713, 0.009100101, 0.006066734, 0.004044489, 0.003033367, 0.002022245, 0.001011122, 0.001011122, 0.001011122, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      GR: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.001011122, 0.001011122, 0.003033367, 0.005055612, 0.008088979, 0.015166835, 0.024266936, 0.037411527, 0.056622851, 0.080889788, 0.11223458, 0.15065723, 0.196157735, 0.251769464, 0.317492417, 0.39231547, 0.480283114, 0.547017189, 0.583417594, 0.613751264, 0.637007078, 0.623862487, 0.62082912, 0.628918099, 0.648129424, 0.648129424, 0.62082912, 0.586450961, 0.543983822, 0.468149646, 0.399393327, 0.337714863, 0.282103134, 0.234580384, 0.192113246, 0.155712841, 0.124368049, 0.09908999, 0.076845298, 0.058645096, 0.044489383, 0.032355915, 0.022244692, 0.015166835, 0.010111223, 0.007077856, 0.004044489, 0.003033367, 0.002022245, 0.001011122, 0.001011122, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      RE: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.001011122, 0.002022245, 0.003033367, 0.007077856, 0.012133468, 0.022244692, 0.03437816, 0.052578362, 0.076845298, 0.110212336, 0.144590495, 0.164812942, 0.174924166, 0.157735086, 0.161779575, 0.188068756, 0.233569262, 0.299292214, 0.382204247, 0.481294237, 0.563195147, 0.584428716, 0.537917088, 0.336703741, 0.193124368, 0.098078868, 0.041456016, 0.012133468, 0.003033367, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      WW: [0, 0, 0, 0, 0, 0, 0.001011122, 0.003033367, 0.006066734, 0.01314459, 0.026289181, 0.04752275, 0.077856421, 0.119312437, 0.176946411, 0.240647118, 0.256825076, 0.242669363, 0.196157735, 0.159757331, 0.131445905, 0.108190091, 0.094034378, 0.083923155, 0.077856421, 0.075834176, 0.077856421, 0.083923155, 0.093023256, 0.106167846, 0.121334681, 0.140546006, 0.161779575, 0.184024267, 0.205257836, 0.227502528, 0.251769464, 0.277047523, 0.302325581, 0.324570273, 0.346814965, 0.368048534, 0.386248736, 0.404448938, 0.420626896, 0.438827098, 0.459049545, 0.481294237, 0.507583418, 0.534883721, 0.562184024, 0.585439838, 0.609706775, 0.633973711, 0.656218402, 0.675429727, 0.688574317, 0.691607685, 0.68958544, 0.682507583, 0.67239636, 0.65520728, 0.635995956, 0.609706775, 0.584428716, 0.55611729, 0.526794742, 0.496461072, 0.466127401, 0.436804853, 0.406471183, 0.378159757, 0.348837209, 0.321536906, 0.295247725, 0.270980789, 0.247724975, 0.225480283, 0.205257836, 0.186046512, 0.168857432, 0.152679474, 0.138523761, 0.125379171, 0.113245703, 0.102123357, 0.093023256, 0.083923155, 0.075834176, 0.067745197, 0.059656218, 0.05156724, 0.042467139, 0.032355915, 0.025278059, 0.019211325, 0.014155713, 0.010111223, 0.007077856, 0.005055612, 0.003033367],
      SUM:[],
      wwValue: 100,
      dbValue: 100,
      blValue: 100,
      grValue: 100,
      reValue: 100,
      cctValue: 2500,
      brightValue: 100,
      groupID: 0,
      deviceID: 0,
      slaveID: 0,
      tabIndex: 0,
      tmpEmail: '',
      setupTestSlaveId: 0,
      setupTestDeviceId: 0,
      reportSlaveID: 0,
      reportDeviceId: 0
    }
    this.state.DB.forEach((data,i) => {
      this.state.SUM.push(this.state.DB[i]+
      this.state.BL[i]+
      this.state.GR[i]+
      this.state.RE[i]+
      this.state.WW[i])
    });
  }

  _handleScan = (e) => {
    // this.props.requestSearchSlave();
    // this.props.requestScan();
    this.props.requestSearchSlaveAndDevice();
  };

  _testOneDevice = (e) => {
    this.props.requestTestOneDevice(this.state.deviceID, this.state.slaveID);
  };

  _testGroupDevice = (e) => {
    this.props.requestTestGroupDevices(this.state.groupID);
  };

  _testSlaveDevice = (e) => {
    this.props.requestTestGroupDevices(this.state.slaveID);
  };

  _deviceMenuIndexChanged = (e, value) => {
    this.setState({
      deviceID: value
    })
  };

  _slaveMenuIndexChanged = (e, value) => {
    console.log('slave index', value);

    let id = 0;
    if(value > 0)
      id = this.props.slaveList[value - 1].payload;
    this.setState({
      slaveID: id
    })
  };

  _setupTestDeviceMenuIndexChanged = (e, value) => {
    this.setState({
      setupTestDeviceID: value
    })
  };

  _setupTestSlaveMenuIndexChanged = (e, value) => {
    console.log('slave index', value);

    let id = 0;
    if(value > 0)
      id = this.props.slaveList[value - 1].payload;
    // console.log(id);
    this.setState({
      setupTestSlaveID: id
    });
  };

  _reportDeviceMenuIndexChanged = (e, value) => {
    this.setState({
      reportDeviceId: value
    })
    let id = 0;
    console.log(this.props.deviceList[this.state.reportSlaveID]);
    if(value > 0)
      id = this.props.deviceList[this.state.reportSlaveID][value - 1].payload;
    this.props.requestGetDeviceStatus({
      slaveId: this.state.reportSlaveID,
      devId: id
    })
  };

  _reportSlaveMenuIndexChanged = (e, value) => {
    console.log('slave index', value);

    let id = 0;
    if(value > 0)
      id = this.props.slaveList[value - 1].payload;
    // console.log(id);
    this.setState({
      reportSlaveID: id
    });
  };

  _gruopMenuIndexChanged = (e, value) => {
    this.setState({
      groupID: value
    })
  };

  componentDidMount() {
    this.props.getRole();
    this.props.requestGetSlaveAndDeviceList();
    this.props.requestGetReportEmail();

    // this.props.getRole();
    // this.props.requestGetCachedDeviceList();
    // this.props.requestGetCachedSlaveList();
    //this.props.requestScan();
    // this.props.requestDeviceGroup();
  }

  componentDidUpdate(prevProps, prevState) {
  }

  _wwChanged = (value) => {
    this.state.wwValue = value;
    this.state.cctSliderStyle = 'notActiveSlider';
    this._updateChart();
  };
  _dbChanged = (value) => {
    this.state.dbValue = value;
    this.state.cctSliderStyle = 'notActiveSlider';
    this._updateChart();
  };
  _blChanged = (value) => {
    this.state.blValue = value;
    this.state.cctSliderStyle = 'notActiveSlider';
    this._updateChart();
  };
  _grChanged = (value) => {
    this.state.grValue = value;
    this.state.cctSliderStyle = 'notActiveSlider';
    this._updateChart();
  };
  _reChanged = (value) => {
    this.state.reValue = value;
    this.state.cctSliderStyle = 'notActiveSlider';
    this._updateChart();
  };
  _cctChanged = (value) => {
    // let value = this.refs.CCT.state.value;
    this.state.cctSliderStyle = 'slider';
    if(value >= 2500 && value < 3000){
      this._setAll(
        1 ,
        0 ,
        0.14 + (0.25 - 0.14) * ((value - 2500) / (3000 - 2500)),
        0.3  + (0.3 - 0.185 ) * ((value - 2500) / (3000 - 2500)),
        1 ,
        value
      );
    }else if(value >= 3000 && value < 4000){
      this._setAll(
        1 ,
        0.6  * ((value - 3000) / (4000 - 3000)),
        0.25 + (0.47 - 0.25) * ((value - 3000) / (4000 - 3000)),
        0.3  + (0.53 - 0.3 ) * ((value - 3000) / (4000 - 3000)),
        1    + (0.74 - 1   ) * ((value - 3000) / (4000 - 3000)),
        value
      );
    }else if(value >= 4000 && value < 5000){
      this._setAll(
        1 ,
        0.6  + (0.8 - 0.6)  * ((value - 4000) / (5000 - 4000)),
        0.47 + (0.68 - 0.47) * ((value - 4000) / (5000 - 4000)),
        0.53 + (0.75 - 0.53) * ((value - 4000) / (5000 - 4000)),
        0.74 + (0.47 - 0.74) * ((value - 4000) / (5000 - 4000)),
        value
      );
    }else if(value >= 5000 && value < 6500){
      this._setAll(
        1    + (0.8  - 1   ) * ((value - 5000) / (6500 - 5000)),
        0.8  + (1    - 0.8 ) * ((value - 5000) / (6500 - 5000)),
        0.68 + (0.9  - 0.68) * ((value - 5000) / (6500 - 5000)),
        0.75 + (1    - 0.75) * ((value - 5000) / (6500 - 5000)),
        0.47 + (0.2  - 0.47) * ((value - 5000) / (6500 - 5000)),
        value
      );
    }else if(value >= 6500 && value < 10000){
      this._setAll(
        0.8 + (0.6 - 0.8) * ((value - 6500) / (10000 - 6500)),
        1,
        0.9 + (1   - 0.9) * ((value - 6500) / (10000 - 6500)),
        1   + (0.7 - 1  ) * ((value - 6500) / (10000 - 6500)),
        0.2 + (0.1 - 0.2) * ((value - 6500) / (10000 - 6500)),
        value
      );
    }else if(value >= 10000 && value < 16000){
      this._setAll(
        0.6 + (0.4 - 0.6) * ((value - 10000) / (16000 - 10000)),
        1,
        1,
        0.7 + (0.5 - 0.7) * ((value - 10000) / (16000 - 10000)),
        0.1 * ((value - 10000) / (16000 - 10000)),
        value
      );
    }
  };

  _updateChart = (e) => {
    let newSUM = [];
    this.state.DB.forEach((data,i) => {
      newSUM.push(this.state.DB[i]* (this.state.dbValue * 0.01) * (this.state.brightValue * 0.01)+
      this.state.BL[i] * (this.state.blValue * 0.01) * (this.state.brightValue * 0.01)+
      this.state.GR[i] * (this.state.grValue * 0.01) * (this.state.brightValue * 0.01)+
      this.state.RE[i] * (this.state.reValue * 0.01) * (this.state.brightValue * 0.01)+
      this.state.WW[i] * (this.state.wwValue * 0.01) * (this.state.brightValue * 0.01));
    });

    this.setState({
      SUM: newSUM
    });
    this.props.requestTestSetLedDisplay({
      devID:this.state.setupTestDeviceID,
      groupID:this.state.groupID,
      WW: this.state.wwValue,
      DB: this.state.dbValue,
      BL: this.state.blValue,
      GR: this.state.grValue,
      RE: this.state.reValue,
      Bright: this.state.brightValue,
      slaveID: this.state.slaveID
    })
  };

  _setAll = (ww, db, bl, gr, re, cct) =>{
    // console.log(ww, db, bl, gr, re);
    this.state.wwValue = Math.round(ww * 100);
    this.state.dbValue = Math.round(db * 100);
    this.state.blValue = Math.round(bl * 100);
    this.state.grValue = Math.round(gr * 100);
    this.state.reValue = Math.round(re * 100);
    if(cct)
      this.state.cctValue = cct;
    this._updateChart();
  };
  _brightChanged = (value) => {
    this.state.brightValue = value
    this._updateChart();
  };

  _AllOpen = (e) => {
    this._setAll(1,1,1,1,1);
  };

  _6500k = (e) => {
    this._setAll(0.85, 0.9, 0.8, 0.85, 0.25);
  };

  _4600k = (e) => {
    this._setAll(1, 0.67, 0.61, 0.67, 0.59);
  };
  _2950k = (e) => {
    this._setAll(1, 0, 0.25, 0.29, 1);
  };
  _saving = (e) => {
    this._setAll(1, 1, 0.5, 0, 1);
  };
  _BR = (e) => {
    this._setAll(0, 1, 1, 0, 1);
  };

  _logout = (e) => {
    this.props.logout();
    window.location.href = "/#login";
  };

  _saveReportingEmail = (e) => {
    let inputReportingEmail = this.refs.inputReportingEmail;
    console.log(inputReportingEmail.getValue());
    let emailObj = {
      emails: inputReportingEmail.getValue()
    };
    this.props.requestUpdateReportEmail(emailObj);
  };

  _handleTabChanged = (tabIndex, tab) => {
    if(tabIndex == 'logout')
      this._logout();
    // window.location.href = `/#/manage/${tabIndex}`;
  };

  _handleEditEmail = (e) => {
    this.setState({
      tmpEmail: e.target.value
    })
  };

  componentWillUpdate (nextProps, nextState) {
    if(this.props.reportEmail != nextProps.reportEmail)
      this.setState({
        tmpEmail: nextProps.reportEmail
      });
  };

  render() {
    let chartData = {
        labels: ["","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","",""],
        datasets: [
            {
                label: "My Second dataset",
                fillColor: "rgba(151,187,205,0.2)",
                strokeColor: "rgba(151,187,205,1)",
                pointColor: "rgba(151,187,205,1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(151,187,205,1)",
                data: this.state.SUM
            }
        ]
    };
    let chartOptions = {
      pointDot: false,
      scaleShowVerticalLines: false,
      datasetStroke: false,
      pointHitDetectionRadius: 0,
      scaleOverride : true,
      scaleSteps : 1,
      scaleStepWidth : 1,
      scaleStartValue : 0,
    }

    let deviceList = [{
      payload: 0,
      primary: 'Select Device',
      text: 'Select Device'
    }];

    let slaveList = [{
      payload: 0,
      primary: 'Select Slave',
      text: 'Select Slave'
    }];

    let setupTestDeviceList = [{
      payload: 0,
      primary: 'Select Device',
      text: 'Select Device'
    }];

    let setupTestSlaveList = [{
      payload: 0,
      primary: 'Select Slave',
      text: 'Select Slave'
    }];

    let reportDeviceList = [{
      payload: 0,
      primary: 'Select Device',
      text: 'Select Device'
    }];

    let reportSlaveList = [{
      payload: 0,
      primary: 'Select Slave',
      text: 'Select Slave'
    }];

    if(this.props.deviceList[this.state.slaveID] && this.props.deviceList[this.state.slaveID].length > 0)  deviceList.push(...this.props.deviceList[this.state.slaveID]);
    if(this.props.slaveList.length > 0)  slaveList.push(...this.props.slaveList);

    if(this.props.deviceList[this.state.setupTestSlaveID] && this.props.deviceList[this.state.setupTestSlaveID].length > 0)  setupTestDeviceList.push(...this.props.deviceList[this.state.setupTestSlaveID]);
    if(this.props.slaveList.length > 0)  setupTestSlaveList.push(...this.props.slaveList);

    if(this.props.deviceList[this.state.reportSlaveID] && this.props.deviceList[this.state.reportSlaveID].length > 0)  reportDeviceList.push(...this.props.deviceList[this.state.reportSlaveID]);
    if(this.props.slaveList.length > 0)  reportSlaveList.push(...this.props.slaveList);

    let tabIndex = parseInt(this.props.params.tabIndex);
    let scanningStatus = this.props.scanning? this.props.scanning: 'hide';
    let email = this.props.reportEmail;

    let scheduleList = (
      <Tab label='Schedule List' value='1' key={'scheduleList'}>
        <ScheduleList />
      </Tab>
    );

    let reportEmailTab = (
    <Tab key={'reportEmail'} label="Report Setting" value='2'>
      <div className="tab-content self-center" >
        <div className="self-center" style={{width: '500px'}}>
          <TextField
            ref="inputReportingEmail"
            floatingLabelText="Report Email"
            multiLine={true}
            value={this.state.tmpEmail}
            onChange={this._handleEditEmail}
            type="text" />
          <RaisedButton onTouchTap={this._saveReportingEmail} label="Save" labelColor="#FFF" backgroundColor="#51A7F9" style={{marginTop:'40px' ,marginLeft:'15px', width: '100px', display: 'inline', position: 'absolute'}}/>
          <RefreshIndicator
            size={40}
            left={10}
            top={0}
            status={this.props.loadingEmail}
            style={{display: 'inline-block',
              position: 'relative'}} />
        </div>
        <div className="self-center" style={{marginTop:'15px',width: '500px'}}>
          <div style={{width: '500px'}}>
            <SelectField labelMember="primary" menuItems={reportSlaveList} onChange={this._reportSlaveMenuIndexChanged} ref="setupTestSlaveMenu" style={{width: '250px'}}/>
            <SelectField labelMember="primary" onChange={this._reportDeviceMenuIndexChanged} ref="setupTestDeviceMenu" menuItems={reportDeviceList} style={{width: '250px', marginLeft: '5px', position: 'absolute'}}/>
          </div>
          <div>
            <div className="row">
              <h4 className="col-md-2 col-sm-2 col-xs-2" style={{textAlign: 'right'}}>溫度:</h4>
              <h4 className="col-md-4 col-sm-4 col-xs-4">{this.props.devStatus.devTemp}</h4>
                <h4 className="col-md-2 col-sm-2 col-xs-2" style={{textAlign: 'right'}}>風扇:</h4>
                <h4 className="col-md-4 col-sm-4 col-xs-4">{this.props.devStatus.fanState}</h4>
            </div>
          </div>
        </div>
      </div>
    </Tab> );

    let testingTab = (
    <Tab key={'testingTab'} label="Testing" value='3'>
      <div className="tab-content self-center">
        <div className="self-center" style={{width: '415px', marginTop: '15px'}}>
          <div >
            <RaisedButton label="SCAN" labelColor="#FFF" backgroundColor="#51A7F9" onTouchTap={this._handleScan}/>
            <RefreshIndicator
              size={40}
              left={10}
              top={0}
              status={scanningStatus}
              style={{display: 'inline-block',
                      position: 'relative'}} />
          </div>
          <div style={{marginTop: '10px'}}>
            <SelectField labelMember="primary" iconStyle={{fill: '#000'}} menuItems={slaveList} onChange={this._slaveMenuIndexChanged} ref="slaveMenu" style={{width: '300px'}} />
            <RaisedButton label="Test" labelColor="#FFF" backgroundColor="#51A7F9" secondary={true}　style={{marginLeft:'15px', width: '100px', display: 'inline', position: 'absolute'}} onTouchTap={this._testSlaveDevice}></RaisedButton>
          </div>
          <div style={{marginTop: '15px'}}>
            <SelectField labelMember="primary" iconStyle={{fill: '#000'}} onChange={this._deviceMenuIndexChanged} ref="deviceMenu" menuItems={deviceList} style={{width: '300px'}}/>
            <RaisedButton label="Test" labelColor="#FFF" backgroundColor="#51A7F9" secondary={true} style={{marginLeft:'15px', width: '100px', position: 'absolute'}} onTouchTap={this._testOneDevice}></RaisedButton>
          </div>
        </div>
      </div>
    </Tab> );

    let adminFunctionTabs = [];
    if(this.props.role == 'engineer' || this.props.role == 'admin')
      adminFunctionTabs.push(scheduleList, reportEmailTab, testingTab);

    return (
      <Tabs className="background-splash tabs-container" initialSelectedIndex={tabIndex} onChange={this._handleTabChanged} style={{minHeight: '320px', backgroundImage: "url('public/assets/images/HMEsplash.png')"}}>
        <Tab label="Setup Test" value='0'>
          <div className="tab-content self-center">
            <div className="self-center" style={{width: '500px'}}>
              <div style={{width: '500px'}}>
                <SelectField labelMember="primary" iconStyle={{fill: '#000'}} menuItems={setupTestSlaveList} onChange={this._setupTestSlaveMenuIndexChanged} ref="setupTestSlaveMenu" style={{width: '250px'}}/>
                <SelectField labelMember="primary" iconStyle={{fill: '#000'}} onChange={this._setupTestDeviceMenuIndexChanged} ref="setupTestDeviceMenu" menuItems={setupTestDeviceList} style={{width: '250px', marginLeft: '5px', position: 'absolute'}}/>
              </div>
            </div>
            <div className="row self-center" style={{width: '100%', marginTop: '15px'}}>
              <div className="col-md-8 col-sm-8 col-xs-8">
                <div className="row">
                  <LineChart ref="chart" data={chartData} style={{
                    margin: '5px',
                    width: '100%',
                    height: 'auto'
                    }}
                    options={chartOptions} />
                </div>
                <div className="row smalllRaisedBnutton self-center" style={{width: '310px'}}>
                  <RaisedButton label="全開"  onTouchTap={this._AllOpen} style={{width: '50px'}}/>
                  <RaisedButton label="6500K" onTouchTap={this._6500k} style={{width: '50px'}}/>
                  <RaisedButton label="4600K" onTouchTap={this._4600k} style={{width: '50px'}}/>
                  <RaisedButton label="2950K" onTouchTap={this._2950k} style={{width: '50px'}}/>
                  <RaisedButton label="saving E" onTouchTap={this._saving} style={{width: '60px'}}/>
                  <RaisedButton label="B + R" onTouchTap={this._BR} style={{width: '50px'}}/>
                </div>
              </div>
              <div className="col-md-4 col-sm-4 col-xs-4" style={{marginTop: '0px'}}>
                <div style={{backgroundColor: '#fff', paddingLeft: "10px", marginBottom: '2px', border: '1px solid #DDD'}}>WW {this.state.wwValue}</div>
                <SliderRc ref="WW" name="WW" value={this.state.wwValue} onAfterChange={this._wwChanged} className="slider"/>
                <div style={{backgroundColor: '#0B07F3', color: '#fff', paddingLeft: "10px" ,marginBottom: '2px'}}>DB {this.state.dbValue}</div>
                <SliderRc ref="DB" name="DB" value={this.state.dbValue} onAfterChange={this._dbChanged} className="slider"/>
                <div style={{backgroundColor: '#79DAF7', paddingLeft: "10px" ,marginBottom: '2px'}}>BL {this.state.blValue}</div>
                <SliderRc ref="BL" name="BL" value={this.state.blValue} onAfterChange={this._blChanged} className="slider"/>
                <div style={{backgroundColor: '#39F136', paddingLeft: "10px" ,marginBottom: '2px'}}>GR {this.state.grValue}</div>
                <SliderRc ref="GR" name="GR" value={this.state.grValue} onAfterChange={this._grChanged} className="slider"/>
                <div style={{backgroundColor: '#F30505', color: '#fff', paddingLeft: "10px" ,marginBottom: '2px'}}>RE {this.state.reValue}</div>
                <SliderRc ref="RE" name="RE" value={this.state.reValue} onAfterChange={this._reChanged} className="slider"/>
                <div style={{backgroundImage: 'url(/public/assets/images/cct.png)', backgroundSize: '100%', marginBottom: '2px', border: '1px #ccc solid', paddingLeft: "10px"}}><span style={{color: '#000'}}>CCT {this.state.cctValue}</span></div>
                <SliderRc ref="CCT" name="CCT" defaultValue={2500} min={2500} max={9000} value={this.state.cctValue} onAfterChange={this._cctChanged} className={this.state.cctSliderStyle}/>
                <div>Bright {this.state.brightValue}</div>
                <SliderRc ref="Bright" name="Bright" value={this.state.brightValue} onAfterChange={this._brightChanged} className="slider"/>
              </div>
            </div>
          </div>
        </Tab>
        {adminFunctionTabs}
        <Tab label="Logout" value='logout' onTouchTap={this._logout} />
      </Tabs>
    );
  }
}

function _injectPropsFromStore(state) {
  let { login, scanDevice , manageSettings} = state;
  let scanResult = [],
      slaveList = [],
      groupList = [];

  if(scanDevice.slaveList) {
    for(let slave of scanDevice.slaveList) {
      scanResult[slave.id] = [];
      slaveList.push({
        payload: slave.id,
        primary: `Slave host: ${slave.host}`,
        text: slave.host,
      });
    }
  }

  if(scanDevice.deviceList) {
    for(let device of scanDevice.deviceList) {
      scanResult[device.SlaveId].push({
        payload: device.devID,
        primary: `DeviceID: ${device.devID}`,
        text: device.devID
      });
    }
  }

  return {
    deviceList: scanResult,
    groupList: groupList,
    slaveList: slaveList,
    scanning: scanDevice.scanning? scanDevice.scanning : 'hide',
    reportEmail: manageSettings.reportEmail,
    loadingEmail: manageSettings.loadingEmail? manageSettings.loadingEmail : 'hide',
    role: login.role,
    devStatus: manageSettings.devStatus || {devTemp: 'selse Slave & Device', fanState: 'selse Slave & Device'},
  };
}

const _injectPropsFromActions = {
  // testing
  requestScan,
  requestDeviceGroup,
  requestTestSetLedDisplay,
  requestTestGroupDevices,
  requestTestAllDevices,
  requestTestOneDevice,
  requestGetCachedDeviceList,
  requestSearchSlave,
  requestGetCachedSlaveList,
  requestSearchSlaveAndDevice,
  requestGetSlaveAndDeviceList,
  //report setting
  requestGetReportEmail,
  requestUpdateReportEmail,
  requestGetDeviceStatus,
  // Auth,
  getRole,
  logout
}


export default connect(_injectPropsFromStore, _injectPropsFromActions)(ManagePage);
