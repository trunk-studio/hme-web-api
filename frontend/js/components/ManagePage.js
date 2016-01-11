import React                from 'react';
import { connect } from 'react-redux'
import {
  requestScan, requestDeviceGroup, requestTestOneDevice,
  requestTestGroupDevices, requestTestAllDevices,
  requestTestSetLedDisplay
} from '../actions/TestActions'

const RaisedButton = require('material-ui/lib/raised-button');
const SelectField = require('material-ui/lib/select-field');
const TextField = require('material-ui/lib/text-field');
const Tabs = require('material-ui/lib/tabs/tabs');
const Tab = require('material-ui/lib/tabs/tab');
const ScheduleList = require('./ScheduleList');
const LineChart = require("react-chartjs").Line;
import { Slider} from 'material-ui';


export default class ManagePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
      cctValue: 100,
      brightValue: 100,
      groupID: 1,
      deviceID: 1
    }
    this.state.DB.forEach((data,i) => {
      this.state.SUM.push(this.state.DB[i]+
      this.state.BL[i]+
      this.state.GR[i]+
      this.state.RE[i]+
      this.state.WW[i])
    });
    console.log(this.state.DB.length,
      this.state.BL.length,
      this.state.GR.length,
      this.state.RE.length,
      this.state.WW.length,
      this.state.SUM.length,
      this.state.SUM);
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

  _wwChanged = (e, value) => {
    this.setState({
      wwValue: value
    })
    this._updateChart();
  }
  _dbChanged = (e, value) => {
    this.setState({
      dbValue: value
    })
    this._updateChart();
  }
  _blChanged = (e, value) => {
    this.setState({
      blValue: value
    })
    this._updateChart();
  }
  _grChanged = (e, value) => {
    this.setState({
      grValue: value
    })
    this._updateChart();
  }
  _reChanged = (e, value) => {
    this.setState({
      reValue: value
    })
    this._updateChart();
  }

  _updateChart = (e) => {
    let newSUM = [];
    this.state.DB.forEach((data,i) => {
      newSUM.push(this.state.DB[i]* (this.state.dbValue * 0.01)+
      this.state.BL[i] * (this.state.blValue * 0.01)+
      this.state.GR[i] * (this.state.grValue * 0.01)+
      this.state.RE[i] * (this.state.reValue * 0.01)+
      this.state.WW[i] * (this.state.wwValue * 0.01));
    });

    this.setState({
      SUM: newSUM
    });
    console.log("!!!!!!!!!",this.state.groupID,this.state.groupID);
    this.props.requestTestSetLedDisplay({
      DevID:this.state.deviceID,
      groupID:this.state.groupID,
      WWBright: this.state.wwValue,
      DBBright: this.state.dbValue,
      BLBright: this.state.blValue,
      GRBright: this.state.grValue,
      REBright: this.state.reValue,
      Bright:1
    })
  }

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
              <div style={{display: 'inline-flex'}}>
                <SelectField menuItems={this.props.groupList}/>
                <RaisedButton label="TEST" />
              </div>
            </div>
          </div>
        </Tab>
        <Tab label="Group Test">
          <div style={{display: 'table-caption'}}>
            <div style={{display: 'inline-flex'}}>
              <SelectField menuItems={this.props.deviceList}/>
              <RaisedButton label="TEST" />
            </div>
          </div>
          <div className="self-center" style={{width: '100%', marginTop: '5px'}}>
            <div className="col-md-8 col-sm-8 col-xs-8">
              <div className="row">
                <LineChart ref="chart" data={chartData} style={{
                  margin: '5px',
                  width: '100%',
                  height: '250px'
                  }}
                  options={chartOptions} />
              </div>
              <div className="row smalllRaisedBnutton" style={{marginLeft:'30px'}}>
                <RaisedButton label="全開" />
                <RaisedButton label="6500K" />
                <RaisedButton label="4600K" />
                <RaisedButton label="2950K" />
                <RaisedButton label="saving E" />
                <RaisedButton label="B + R" />
              </div>
            </div>
            <div className="col-md-4 col-sm-4 col-xs-4">
              <Slider ref="WW" name="WW" defaultValue={100} max={100} step={1} value={this.state.wwValue} description={`WW ${this.state.wwValue}`} className="slider" onChange={this._wwChanged} />
              <Slider ref="DB" name="DB" defaultValue={100} max={100} step={1} value={this.state.dbValue} description={`DB ${this.state.dbValue}`} className="slider" onChange={this._dbChanged} />
              <Slider ref="BL" name="BL" defaultValue={100} max={100} step={1} value={this.state.blValue} description={`BL ${this.state.blValue}`} className="slider" onChange={this._blChanged} />
              <Slider ref="GR" name="GR" defaultValue={100} max={100} step={1} value={this.state.grValue} description={`GR ${this.state.grValue}`} className="slider" onChange={this._grChanged} />
              <Slider ref="RE" name="RE" defaultValue={100} max={100} step={1} value={this.state.reValue} description={`RE ${this.state.reValue}`} className="slider" onChange={this._reChanged} />
              <Slider ref="CCT" name="CCT" defaultValue={3000} max={16000} value={this.state.cctValue} description="CCT" step="10" className="slider" onChange={this._cctChanged}/>
              <Slider ref="Bright" name="Bright" defaultValue={100} className="slider" max={100} value={this.state.brightValue} description="Bright" onChange={this._brightChanged}/>
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
  requestTestSetLedDisplay,
  requestTestGroupDevices,
  requestTestAllDevices,
  requestTestOneDevice
}


export default connect(_injectPropsFromStore, _injectPropsFromActions)(ManagePage);
