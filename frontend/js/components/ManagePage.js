import React                from 'react';
import { connect } from 'react-redux'
import {
  requestScan, requestDeviceGroup, requestTestOneDevice,
  requestTestGroupDevices, requestTestAllDevices,
  requestTestSetLedDisplay, requestGetCachedDeviceList,
  requestSearchSlave, requestGetCachedSlaveList,
  requestSearchSlaveAndDevice
} from '../actions/TestActions'

const RaisedButton = require('material-ui/lib/raised-button');
const SelectField = require('material-ui/lib/select-field');
const TextField = require('material-ui/lib/text-field');
const Tabs = require('material-ui/lib/tabs/tabs');
const Tab = require('material-ui/lib/tabs/tab');
const ScheduleList = require('./ScheduleList');
const LineChart = require("react-chartjs").Line;
import { Slider} from 'material-ui';
import SliderRc from 'rc-slider';

export default class ManagePage extends React.Component {
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
      cctValue: 3000,
      brightValue: 100,
      groupID: 0,
      deviceID: 0,
      slaveID: 0,
      tabIndex: 0
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
    this.props.requestTestOneDevice(this.state.deviceID);
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
    let id = this.props.slaveList[value - 1].payload;
    this.setState({
      slaveID: id
    })
  };

  _gruopMenuIndexChanged = (e, value) => {
    this.setState({
      groupID: value
    })
  };

  componentDidMount() {
    this.props.requestGetCachedDeviceList();
    this.props.requestGetCachedSlaveList();
    this.props.requestScan();
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
    if(value >= 3000 && value < 4000){
      console.log("3");
      this._setAll(
        1 ,
        0.6  * ((value - 3000) / (4000 - 3000)),
        0.25 + (0.47 - 0.25) * ((value - 3000) / (4000 - 3000)),
        0.3  + (0.53 - 0.3 ) * ((value - 3000) / (4000 - 3000)),
        1    + (0.74 - 1   ) * ((value - 3000) / (4000 - 3000)),
        value
      );
    }else if(value >= 4000 && value < 5000){
      console.log("4");
      this._setAll(
        1 ,
        0.6  + (0.8 - 0.6)  * ((value - 4000) / (5000 - 4000)),
        0.47 + (0.68 - 0.47) * ((value - 4000) / (5000 - 4000)),
        0.53 + (0.75 - 0.53) * ((value - 4000) / (5000 - 4000)),
        0.74 + (0.47 - 0.74) * ((value - 4000) / (5000 - 4000)),
        value
      );
    }else if(value >= 5000 && value < 6500){
      console.log("5");
      this._setAll(
        1    + (0.8  - 1   ) * ((value - 5000) / (6500 - 5000)),
        0.8  + (1    - 0.8 ) * ((value - 5000) / (6500 - 5000)),
        0.68 + (0.9  - 0.68) * ((value - 5000) / (6500 - 5000)),
        0.75 + (1    - 0.75) * ((value - 5000) / (6500 - 5000)),
        0.47 + (0.2  - 0.47) * ((value - 5000) / (6500 - 5000)),
        value
      );
    }else if(value >= 6500 && value < 10000){
      console.log("6.5");
      this._setAll(
        0.8 + (0.6 - 0.8) * ((value - 6500) / (10000 - 6500)),
        1,
        0.9 + (1   - 0.9) * ((value - 6500) / (10000 - 6500)),
        1   + (0.7 - 1  ) * ((value - 6500) / (10000 - 6500)),
        0.2 + (0.1 - 0.2) * ((value - 6500) / (10000 - 6500)),
        value
      );
    }else if(value >= 10000 && value < 16000){
      console.log("10");
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
    console.log("!!!!!!!!!",this.state.groupID,this.state.groupID);
    this.props.requestTestSetLedDisplay({
      devID:this.state.deviceID,
      groupID:this.state.groupID,
      WW: this.state.wwValue,
      DB: this.state.dbValue,
      BL: this.state.blValue,
      GR: this.state.grValue,
      RE: this.state.reValue,
      Bright: this.state.brightValue
    })
  };

  _setAll = (ww, db, bl, gr, re, cct) =>{
    console.log(ww, db, bl, gr, re);
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
      pointHitDetectionRadius: 0
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
    if(this.props.deviceList.length > 0)  deviceList.push(...this.props.deviceList);
    if(this.props.slaveList.length > 0)   slaveList.push(...this.props.slaveList);

    let tabIndex = parseInt(this.props.params.tabIndex);
    return (
      <Tabs initialSelectedIndex={tabIndex}>
        <Tab label="TESTING">
          <div className="self-center" style={{width: '415px', marginTop: '15px'}}>
            <div style={{display: 'table-caption'}}>
              <div style={{display: 'inline-flex'}}>
                <RaisedButton label="SCAN" onTouchTap={this._handleScan}/>
              </div>
              <div style={{display: 'inline-flex'}}>
                <SelectField labelMember="primary" menuItems={slaveList} onChange={this._slaveMenuIndexChanged} ref="slaveMenu" style={{width: '300px'}}/>
                <RaisedButton label="Test" secondary={true}　style={{marginLeft:'15px', width: '100px'}} onTouchTap={this._testSlaveDevice}></RaisedButton>
              </div>
              <div style={{display: 'inline-flex'}}>
                <SelectField labelMember="primary" onChange={this._deviceMenuIndexChanged} ref="deviceMenu" menuItems={deviceList} style={{width: '300px'}}/>
                <RaisedButton label="Test" secondary={true} style={{marginLeft:'15px', width: '100px'}} onTouchTap={this._testOneDevice}></RaisedButton>
              </div>
            </div>
          </div>
        </Tab>
        <Tab label="Setup Test">
          <div style={{display: 'table-caption'}}>
            <div style={{display: 'inline-flex' , marginTop: '15px', marginLeft: '15px'}}>
              <SelectField labelMember="primary" onChange={this._deviceMenuIndexChanged} ref="deviceMenu" menuItems={deviceList} style={{width: '200px'}}/>
            </div>
          </div>
          <div className="row self-center" style={{width: '100%', marginTop: '5px'}}>
            <div className="col-md-8 col-sm-8 col-xs-8">
              <div className="row">
                <LineChart ref="chart" data={chartData} style={{
                  margin: '5px',
                  width: '100%',
                  height: '200px'
                  }}
                  options={chartOptions} />
              </div>
            </div>
            <div className="col-md-4 col-sm-4 col-xs-4" style={{marginTop: '-60px'}}>
              <div>WW {this.state.wwValue}</div>
              <SliderRc ref="WW" name="WW" value={this.state.wwValue} onAfterChange={this._wwChanged} className="slider"/>
              <div>DB {this.state.dbValue}</div>
              <SliderRc ref="DB" name="DB" value={this.state.dbValue} onAfterChange={this._dbChanged} className="slider"/>
              <div>BL {this.state.blValue}</div>
              <SliderRc ref="BL" name="BL" value={this.state.blValue} onAfterChange={this._blChanged} className="slider"/>
              <div>GR {this.state.grValue}</div>
              <SliderRc ref="GR" name="GR" value={this.state.grValue} onAfterChange={this._grChanged} className="slider"/>
              <div>RE {this.state.reValue}</div>
              <SliderRc ref="RE" name="RE" value={this.state.reValue} onAfterChange={this._reChanged} className="slider"/>
              <div>CCT {this.state.cctValue}</div>
              <SliderRc ref="CCT" name="CCT" defaultValue={3000} min={3000} max={16000} value={this.state.cctValue} onAfterChange={this._cctChanged} className={this.state.cctSliderStyle}/>
              <div>Bright {this.state.brightValue}</div>
              <SliderRc ref="Bright" name="Bright" value={this.state.brightValue} onAfterChange={this._brightChanged} className="slider"/>
            </div>
          </div>
          <div className="row smalllRaisedBnutton" style={{marginLeft:'30px'}}>
            <RaisedButton label="全開"  onTouchTap={this._AllOpen}/>
            <RaisedButton label="6500K" onTouchTap={this._6500k}/>
            <RaisedButton label="4600K" onTouchTap={this._4600k}/>
            <RaisedButton label="2950K" onTouchTap={this._2950k}/>
            <RaisedButton label="saving E" onTouchTap={this._saving}/>
            <RaisedButton label="B + R" onTouchTap={this._BR}/>
          </div>
        </Tab>
        <Tab label="Report Setting">
          <div className="self-center" style={{width: '200px'}}>
            <div style={{display: 'table-caption'}}>
              <TextField
                hintText="Report Email"
                floatingLabelText="Report Email"
                type="text" />
              <SelectField menuItems={this.props.slaveList} />
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
      slaveList = [],
      groupList = [];
  if(scanDevice.deviceList) {
    for(let device of scanDevice.deviceList) {
      scanResult.push({
        payload: device.devID,
        primary: `DeviceID: ${device.devID}`,
        text: device.devID
      });
    }
  }

  if(scanDevice.slaveList) {
    for(let slave of scanDevice.slaveList) {
      slaveList.push({
        payload: slave.id,
        primary: `Slave host: ${slave.host}`,
        text: slave.host,
      });
    }
  }

  return {
    deviceList: scanResult,
    groupList: groupList,
    slaveList: slaveList
  };
}

const _injectPropsFromActions = {
  requestScan,
  requestDeviceGroup,
  requestTestSetLedDisplay,
  requestTestGroupDevices,
  requestTestAllDevices,
  requestTestOneDevice,
  requestGetCachedDeviceList,
  requestSearchSlave,
  requestGetCachedSlaveList,
  requestSearchSlaveAndDevice
}


export default connect(_injectPropsFromStore, _injectPropsFromActions)(ManagePage);
