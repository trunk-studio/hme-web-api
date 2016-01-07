import React                from 'react';
import { AppBar, IconButton, FlatButton , Slider, RadioButton, RadioButtonGroup, DropDownMenu, RaisedButton} from 'material-ui';
import { connect } from 'react-redux'
import { requestGetScheduleDetailConfig, requestUpdateScheduleDetailConfig} from '../actions/ScheduleDetailConfigActions'
const NavigationClose = require('material-ui/lib/svg-icons/navigation/close.js');

const LineChart = require("react-chartjs").Line;

export default class ScheduleDetailConfig extends React.Component {

  componentDidMount () {
    this.props.requestGetScheduleDetailConfig(this.props.params.id);
  }

  componentDidUpdate(prevProps, prevState) {
  }

  _wwChanged = (e, value) => {
    this.refs.chart.state.chart.datasets[0].points[0].value = value;
    this.refs.chart.state.chart.update();
    this._saveConfig();
  }
  _dbChanged = (e, value) => {
    this.refs.chart.state.chart.datasets[0].points[1].value = value;
    this.refs.chart.state.chart.update();
    this._saveConfig();
  }
  _blChanged = (e, value) => {
    this.refs.chart.state.chart.datasets[0].points[2].value = value;
    this.refs.chart.state.chart.update();
    this._saveConfig();
  }
  _grChanged = (e, value) => {
    this.refs.chart.state.chart.datasets[0].points[3].value = value;
    this.refs.chart.state.chart.update();
    this._saveConfig();
  }
  _reChanged = (e, value) => {
    this.refs.chart.state.chart.datasets[0].points[4].value = value;
    this.refs.chart.state.chart.update();
    this._saveConfig();
  }
  _cctChanged = (e, value) => {
    this.refs.chart.state.chart.datasets[0].points[5].value = value;
    this.refs.chart.state.chart.update();
    this._saveConfig();
  }
  _brightChanged = (e, value) => {
    this.refs.chart.state.chart.datasets[0].points[6].value = value;
    this.refs.chart.state.chart.update();
    this._saveConfig();
  }

  _saveConfig(){
    this.props.requestUpdateScheduleDetailConfig({
      id: this.props.params.id,
      WW: this.refs.WW.state.value,
      DB: this.refs.DB.state.value,
      BL: this.refs.BL.state.value,
      GR: this.refs.GR.state.value,
      RE: this.refs.RE.state.value,
      CCT: this.refs.CCT.state.value,
      Bright: this.refs.Bright.state.value,
    })
  }

  backClick = () => {
  }


  render() {
    let menuItems = [
       { payload: '1', text: 'Never' },
       { payload: '2', text: 'Every Night' },
       { payload: '3', text: 'Weeknights' },
       { payload: '4', text: 'Weekends' },
       { payload: '5', text: 'Weekly' },
    ];
    let chartData = {
        labels: ["", "", "", "", "", "",""],
        datasets: [
            {
                label: "My Second dataset",
                fillColor: "rgba(151,187,205,0.2)",
                strokeColor: "rgba(151,187,205,1)",
                pointColor: "rgba(151,187,205,1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(151,187,205,1)",
                data: this.props.config || [0,0,0,0,0,0,0]
            }
        ]
    };
    let wwValue, dbValue, blValue, grValue, reValue, cctValue, brightValue;
    if(this.props.config){
      wwValue = this.props.config[0];
      dbValue = this.props.config[1];
      blValue = this.props.config[2];
      grValue = this.props.config[3];
      reValue = this.props.config[4];
      cctValue = this.props.config[5];
      brightValue = this.props.config[6];
    }else{
      wwValue = 0;
      dbValue = 0;
      blValue = 0;
      grValue = 0;
      reValue = 0;
      cctValue = 0;
      brightValue = 0;
    }

    return (
      <div>
        <AppBar
          title="Title"
          iconElementLeft={<IconButton><NavigationClose /></IconButton>}
          iconElementRight={<FlatButton label="Save" onTouchTap={this.backClick} />}
          onLeftIconButtonTouchTap={this.backClick} />
        <div className="self-center" style={{width: '100%', marginTop: '5px'}}>
          <div className="col-md-8 col-sm-8 col-xs-8">
            <div className="row">
              <LineChart ref="chart" data={chartData} style={{
                margin: '5px',
                width: '100%',
                height: '250px'
                }} />
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
            <Slider ref="WW" name="WW" defaultValue={0} max={100} value={wwValue} description="WW" className="slider" onChange={this._wwChanged} />
            <Slider ref="DB" name="DB" defaultValue={0} max={100} value={dbValue} description="DB" className="slider" onChange={this._dbChanged} />
            <Slider ref="BL" name="BL" defaultValue={0} max={100} value={blValue} description="BL" className="slider" onChange={this._blChanged} />
            <Slider ref="GR" name="GR" defaultValue={0} max={100} value={grValue} description="GR" className="slider" onChange={this._grChanged} />
            <Slider ref="RE" name="RE" defaultValue={0} max={100} value={reValue} description="RE" className="slider" onChange={this._reChanged} />
            <Slider ref="CCT" name="CCT" defaultValue={3000} max={16000} value={cctValue} description="CCT" step="10" className="slider" onChange={this._cctChanged}/>
            <Slider ref="Bright" name="Bright" defaultValue={0} className="slider" max={100} value={brightValue} description="Bright" onChange={this._brightChanged}/>
          </div>
        </div>
      </div>
    );
  }
}

function _injectPropsFromStore(state) {
  // let { login, isLoading } = state;
  console.log("_injectPropsFromStore!!",state.scheduleDetailConfig.configData);
  let config = state.scheduleDetailConfig.configData
  return {
    config
  };
}

const _injectPropsFromActions = {
  requestGetScheduleDetailConfig,
  requestUpdateScheduleDetailConfig
}

export default connect(_injectPropsFromStore, _injectPropsFromActions)(ScheduleDetailConfig);
