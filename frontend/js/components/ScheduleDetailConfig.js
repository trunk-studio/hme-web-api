import React                from 'react';
import { AppBar, Dialog, RefreshIndicator, IconButton, FlatButton , Slider, RadioButton, RadioButtonGroup, DropDownMenu, RaisedButton} from 'material-ui';
import { connect } from 'react-redux'
import { requestGetScheduleDetailConfig, requestUpdateScheduleDetailConfig,
requestPreviewLedColor} from '../actions/ScheduleDetailConfigActions'
const NavigationClose = require('material-ui/lib/svg-icons/navigation/close.js');

const LineChart = require("react-chartjs").Line;
import SliderRc from 'rc-slider';

export default class ScheduleDetailConfig extends React.Component {

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
      wwValue: 0,
      dbValue: 0,
      blValue: 0,
      grValue: 0,
      reValue: 0,
      cctValue: 2500,
      brightValue: 100,
      open: false,
      needSave: false,
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
  componentDidMount () {
    this.props.requestGetScheduleDetailConfig(this.props.params.configID);
  };

  componentDidUpdate(prevProps, prevState) {
  };

  _wwChanged = (value) => {
    this.state.wwValue = value;
    this.state.cctSliderStyle = 'notActiveSlider';
    this._previewLed();
  };
  _dbChanged = (value) => {
    this.state.dbValue = value;
    this.state.cctSliderStyle = 'notActiveSlider';
    this._previewLed();
  };
  _blChanged = (value) => {
    this.state.blValue = value;
    this.state.cctSliderStyle = 'notActiveSlider';
    this._previewLed();
  };
  _grChanged = (value) => {
    this.state.grValue = value;
    this.state.cctSliderStyle = 'notActiveSlider';
    this._previewLed();
  };
  _reChanged = (value) => {
    this.state.reValue = value;
    this.state.cctSliderStyle = 'notActiveSlider';
    this._previewLed();
  };
  _cctChanged = (value) => {
    this.state.cctSliderStyle = 'slider';
    // let value = this.refs.CCT.state.value;

    if(value >= 2500 && value < 3000){
      console.log("2");
      this._setAll(
        1 ,
        0 ,
        0.14 + (0.25 - 0.14) * ((value - 2500) / (3000 - 2500)),
        0.3  + (0.3 - 0.185 ) * ((value - 2500) / (3000 - 2500)),
        1 ,
        value
      );
    }else if(value >= 3000 && value < 4000){
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
  _setAll = (ww, db, bl, gr, re, cct) =>{
    console.log(ww, db, bl, gr, re);
    this.state.wwValue = Math.round(ww * 100);
    this.state.dbValue = Math.round(db * 100);
    this.state.blValue = Math.round(bl * 100);
    this.state.grValue = Math.round(gr * 100);
    this.state.reValue = Math.round(re * 100);
    if(cct)
      this.state.cctValue = cct;
    this._previewLed();
  };
  _brightChanged = (value) => {
    this.setState({
      brightValue: value
    })
    // this._previewLed();
  };

  _saveConfig = (e) => {
    this.props.requestUpdateScheduleDetailConfig({
      id: this.props.params.configID,
      WW: this.state.wwValue,
      DB: this.state.dbValue,
      BL: this.state.blValue,
      GR: this.state.grValue,
      RE: this.state.reValue,
      CCT: this.state.cctValue,
      Bright: this.state.brightValue,
      scheduleID: this.props.params.scheduleID
    })
    this.setState({
      needSave: false,
    });
  };

  _previewLed = (e) => {
    this.props.requestPreviewLedColor({
      id: this.props.params.configID,
      WW: this.state.wwValue,
      DB: this.state.dbValue,
      BL: this.state.blValue,
      GR: this.state.grValue,
      RE: this.state.reValue,
      CCT: this.state.cctValue,
      Bright: this.state.brightValue,
      scheduleID: this.props.params.scheduleID,
    })
    this.setState({
      needSave: true,
    });
  };

  backClick = () => {
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

  _goBack = (e) => {
    console.log(this);
    this.props.history.goBack();
  };

  _saveDialogHandleOpen = () => {
    console.log("!!!!!!!!!!!!!!!", this.state.needSave );
    if (this.state.needSave) {
      this.setState({open: true});
    } else {
      this.props.history.goBack();
    }
  };

  _saveDialogHandleClose = () => {
    this.setState({open: false});
  };

  _dialogActionSave = () => {
    this.setState({open: false});
    this._saveConfig();
    this.props.history.goBack();
  };

  render() {
    if(this.props.config){
      this.state.wwValue = Math.round(this.props.config[0] * (this.state.brightValue * 0.01));
      this.state.dbValue = Math.round(this.props.config[1] * (this.state.brightValue * 0.01));
      this.state.blValue = Math.round(this.props.config[2] * (this.state.brightValue * 0.01));
      this.state.grValue = Math.round(this.props.config[3] * (this.state.brightValue * 0.01));
      this.state.reValue = Math.round(this.props.config[4] * (this.state.brightValue * 0.01));
      this.state.cctValue = this.props.config[5];
      // this.state.brightValue = this.props.config[6];

      let newSUM = [];
      this.state.DB.forEach((data,i) => {
        newSUM.push(this.state.DB[i]* (this.state.dbValue * 0.01) +
        this.state.BL[i] * (this.state.blValue * 0.01)+
        this.state.GR[i] * (this.state.grValue * 0.01)+
        this.state.RE[i] * (this.state.reValue * 0.01)+
        this.state.WW[i] * (this.state.wwValue * 0.01));
      });
      this.state.SUM = newSUM;
    }

    let menuItems = [
       { payload: '1', text: 'Never' },
       { payload: '2', text: 'Every Night' },
       { payload: '3', text: 'Weeknights' },
       { payload: '4', text: 'Weekends' },
       { payload: '5', text: 'Weekly' },
    ];
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
      pointDotRadius: 0,
      pointDotStrokeWidth : 0,
      scaleShowVerticalLines: false,
      datasetStroke: false,
      pointHitDetectionRadius: 0,
      scaleOverride : true,
      scaleSteps : 1,
      scaleStepWidth : 1,
      scaleStartValue : 0,
    }
    let configID = this.props.params.configID,
        scheduleID = this.props.params.scheduleID;
    let dialog = [
      <FlatButton
        key={'cancelButton'}
        label="Cancel"
        secondary={true}
        onTouchTap={this._saveDialogHandleClose} />,
      <FlatButton
        key={'resetButton'}
        label="Save"
        primary={true}
        onTouchTap={this._dialogActionSave} />
    ];
    return (
      <div style={{overflowX: 'hidden'}}>
        <Dialog
          title="Notice"
          actions={dialog}
          modal={false}
          open={this.state.open}
          onRequestClose={this._saveDialogHandleClose}>
          Settings have been changed, remember to Save.
        </Dialog>
        <AppBar
          title="Schedule Detail Confing"
          style={{height: '55px', minHeight: '0px', marginTop: '-9px', backgroundColor: '#032c70'}}
          titleStyle={{fontSize: '18px'}}
          iconElementLeft={
            <IconButton onTouchTap={this._saveDialogHandleOpen} >
              <NavigationClose />
            </IconButton>
          }
          iconElementRight={
            <FlatButton label="SAVE" onTouchTap={this._saveConfig} style={{didFlip:'true',marginTop:'4px',marginRight:'10px',marginLeft:'auto', backgroundColor: 'rgba(0,0,0,0)', color: '#fff'}} >
              <RefreshIndicator
                size={28}
                left={0}
                top={5}
                status={this.props.configLoading || 'hide'}
                style={{display: 'inline-block', position: 'relative'}} />
            </FlatButton>
          }
          iconStyleRight={{overflowX: 'hidden', position: 'absolute', right: '0px', marginRight:'0px'}}
          onLeftIconButtonTouchTap={this.backClick} />
        <div className="self-center" style={{width: '100%', marginTop: '5px'}}>
          <div className="row">
            <div className="col-md-9 col-sm-9 col-xs-9">
              <div className="row" style={{width: '100%'}}>
                <LineChart ref="chart" data={chartData} style={{
                  margin: '-10px 0 -17px 18px',
                  width: '100%',
                  height: '250px',
                  paddingRight: '15px',
                  }}
                  options={chartOptions} />
              </div>
              <div style={{display: 'flex', justifyContent: 'space-between', paddingBottom: '0px', marginTop: '-10px', fontSize: '12px'}}>
                <span>380</span>
                <span>460</span>
                <span>540</span>
                <span>620</span>
                <span>700</span>
                <span>780</span>
              </div>
              <div className="smalllRaisedButton self-center" style={{width: '100%', display: 'flex', marginTop: '0px', justifyContent: 'space-around'}}>
                <RaisedButton label="FUll"  onTouchTap={this._AllOpen} labelColor='#FFF' backgroundColor='#51A7F9' style={{height: '30px', width: '50px'}}/>
                <RaisedButton label="6500K" onTouchTap={this._6500k} labelColor='#FFF' backgroundColor='#51A7F9' style={{height: '30px', width: '50px'}}/>
                <RaisedButton label="4600K" onTouchTap={this._4600k} labelColor='#FFF' backgroundColor='#51A7F9' style={{height: '30px', width: '50px'}}/>
                <RaisedButton label="2950K" onTouchTap={this._2950k} labelColor='#FFF' backgroundColor='#51A7F9' style={{height: '30px', width: '50px'}}/>
                <RaisedButton label="ECO" onTouchTap={this._saving} labelColor='#FFF' backgroundColor='#51A7F9' style={{height: '30px', width: '50px'}}/>
                <RaisedButton label="B+R" onTouchTap={this._BR} labelColor='#FFF' backgroundColor='#51A7F9' style={{height: '30px', width: '45px'}}/>
              </div>
            </div>
            <div className="col-md-3 col-sm-3 col-xs-3" style={{marginLeft: '-8px', fontSize: '12px'}}>
              <div className="unSelectable" style={{backgroundColor: '#fff', paddingLeft: "10px", marginBottom: '3px', border: '1px solid #DDD'}}>WW {this.state.wwValue}</div>
              <SliderRc ref="WW" name="WW" value={this.state.wwValue} onAfterChange={this._wwChanged} className="slider"/>
              <div className="unSelectable" style={{backgroundColor: '#0B07F3', color: '#fff', paddingLeft: "10px" ,marginBottom: '3px'}}>DB {this.state.dbValue}</div>
              <SliderRc ref="DB" name="DB" value={this.state.dbValue} onAfterChange={this._dbChanged} className="slider"/>
              <div className="unSelectable" style={{backgroundColor: '#79DAF7', paddingLeft: "10px" ,marginBottom: '3px'}}>BL {this.state.blValue}</div>
              <SliderRc ref="BL" name="BL" value={this.state.blValue} onAfterChange={this._blChanged} className="slider"/>
              <div className="unSelectable" style={{backgroundColor: '#39F136', paddingLeft: "10px" ,marginBottom: '3px'}}>GR {this.state.grValue}</div>
              <SliderRc ref="GR" name="GR" value={this.state.grValue} onAfterChange={this._grChanged} className="slider"/>
              <div className="unSelectable" style={{backgroundColor: '#F30505', color: '#fff', paddingLeft: "10px" ,marginBottom: '3px'}}>RE {this.state.reValue}</div>
              <SliderRc ref="RE" name="RE" value={this.state.reValue} onAfterChange={this._reChanged} className="slider"/>
              <div className="unSelectable" style={{backgroundImage: 'url(/public/assets/images/cct.png)', backgroundSize: '100%', marginBottom: '2px', border: '1px #ccc solid', paddingLeft: "10px"}}><span style={{color: '#000'}}>CCT {this.state.cctValue}</span></div>
              <SliderRc ref="CCT" name="CCT" defaultValue={2500} min={2500} max={9000} value={this.state.cctValue} onAfterChange={this._cctChanged} className={this.state.cctSliderStyle + " slider"}/>
              {/*<div>Bright {this.state.brightValue}</div>
              <SliderRc ref="Bright" name="Bright" value={this.state.brightValue} onChange={this._brightChanged} className="slider"/> */}
            </div>
          </div>
        </div>
      </div>
    );
  };
}

function _injectPropsFromStore(state) {
  let { scheduleDetailConfig } = state;
  console.log("_injectPropsFromStore!!",state.scheduleDetailConfig.configData);
  let config = scheduleDetailConfig.configData
  return {
    config,
    configLoading: scheduleDetailConfig.configLoading? scheduleDetailConfig.configLoading : 'hide'
  };
};

const _injectPropsFromActions = {
  requestGetScheduleDetailConfig,
  requestUpdateScheduleDetailConfig,
  requestPreviewLedColor
};

export default connect(_injectPropsFromStore, _injectPropsFromActions)(ScheduleDetailConfig);
