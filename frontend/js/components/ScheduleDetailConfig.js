import React                from 'react';
import { AppBar, IconButton, FlatButton , Slider, RadioButton, RadioButtonGroup, DropDownMenu, RaisedButton} from 'material-ui';
import { connect } from 'react-redux'
import { requestGetScheduleDetailConfig, requestUpdateScheduleDetailConfig} from '../actions/ScheduleDetailConfigActions'
const NavigationClose = require('material-ui/lib/svg-icons/navigation/close.js');

const LineChart = require("react-chartjs").Line;

export default class ScheduleDetailConfig extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      currentIndex: 0,
      DB: [0 ,0 ,0 ,0 ,0 ,0.001011122 ,0.005055612 ,0.008088979 ,0.018200202 ,0.037411527 ,0.072800809 ,0.127401416 ,0.209302326 ,0.323559151 ,0.477249747 ,0.649140546 ,0.68958544 ,0.649140546 ,0.520728008 ,0.416582406 ,0.333670374 ,0.260869565 ,0.209302326 ,0.164812942 ,0.128412538 ,0.098078868 ,0.072800809 ,0.053589484 ,0.038422649 ,0.026289181 ,0.018200202 ,0.012133468 ,0.008088979 ,0.005055612 ,0.003033367 ,0.002022245 ,0.002022245 ,0.002022245 ,0.001011122 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0],
      BL: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.001011122, 0.004044489, 0.006066734, 0.014155713, 0.03033367, 0.057633974, 0.102123357, 0.166835187, 0.258847321, 0.381193124, 0.519716886, 0.552072801, 0.519716886, 0.416582406, 0.332659252, 0.266936299, 0.209302326, 0.166835187, 0.131445905, 0.102123357, 0.077856421, 0.058645096, 0.042467139, 0.03033367, 0.021233569, 0.014155713, 0.009100101, 0.006066734, 0.004044489, 0.003033367, 0.002022245, 0.001011122, 0.001011122, 0.001011122, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      GR: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.001011122, 0.001011122, 0.003033367, 0.005055612, 0.008088979, 0.015166835, 0.024266936, 0.037411527, 0.056622851, 0.080889788, 0.11223458, 0.15065723, 0.196157735, 0.251769464, 0.317492417, 0.39231547, 0.480283114, 0.547017189, 0.583417594, 0.613751264, 0.637007078, 0.623862487, 0.62082912, 0.628918099, 0.648129424, 0.648129424, 0.62082912, 0.586450961, 0.543983822, 0.468149646, 0.399393327, 0.337714863, 0.282103134, 0.234580384, 0.192113246, 0.155712841, 0.124368049, 0.09908999, 0.076845298, 0.058645096, 0.044489383, 0.032355915, 0.022244692, 0.015166835, 0.010111223, 0.007077856, 0.004044489, 0.003033367, 0.002022245, 0.001011122, 0.001011122, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      RE: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.001011122, 0.002022245, 0.003033367, 0.007077856, 0.012133468, 0.022244692, 0.03437816, 0.052578362, 0.076845298, 0.110212336, 0.144590495, 0.164812942, 0.174924166, 0.157735086, 0.161779575, 0.188068756, 0.233569262, 0.299292214, 0.382204247, 0.481294237, 0.563195147, 0.584428716, 0.537917088, 0.336703741, 0.193124368, 0.098078868, 0.041456016, 0.012133468, 0.003033367, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      WW: [0, 0, 0, 0, 0, 0, 0.001011122, 0.003033367, 0.006066734, 0.01314459, 0.026289181, 0.04752275, 0.077856421, 0.119312437, 0.176946411, 0.240647118, 0.256825076, 0.242669363, 0.196157735, 0.159757331, 0.131445905, 0.108190091, 0.094034378, 0.083923155, 0.077856421, 0.075834176, 0.077856421, 0.083923155, 0.093023256, 0.106167846, 0.121334681, 0.140546006, 0.161779575, 0.184024267, 0.205257836, 0.227502528, 0.251769464, 0.277047523, 0.302325581, 0.324570273, 0.346814965, 0.368048534, 0.386248736, 0.404448938, 0.420626896, 0.438827098, 0.459049545, 0.481294237, 0.507583418, 0.534883721, 0.562184024, 0.585439838, 0.609706775, 0.633973711, 0.656218402, 0.675429727, 0.688574317, 0.691607685, 0.68958544, 0.682507583, 0.67239636, 0.65520728, 0.635995956, 0.609706775, 0.584428716, 0.55611729, 0.526794742, 0.496461072, 0.466127401, 0.436804853, 0.406471183, 0.378159757, 0.348837209, 0.321536906, 0.295247725, 0.270980789, 0.247724975, 0.225480283, 0.205257836, 0.186046512, 0.168857432, 0.152679474, 0.138523761, 0.125379171, 0.113245703, 0.102123357, 0.093023256, 0.083923155, 0.075834176, 0.067745197, 0.059656218, 0.05156724, 0.042467139, 0.032355915, 0.025278059, 0.019211325, 0.014155713, 0.010111223, 0.007077856, 0.005055612, 0.003033367],
      SUM:[]
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
      datasetStroke: false
    }
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
