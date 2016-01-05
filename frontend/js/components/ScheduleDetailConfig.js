import React                from 'react';
import { AppBar, IconButton, FlatButton , Slider, RadioButton, RadioButtonGroup, DropDownMenu, RaisedButton} from 'material-ui'
const NavigationClose = require('material-ui/lib/svg-icons/navigation/close.js');

const LineChart = require("react-chartjs").Line;

export default class ScheduleDetailConfig extends React.Component {

  _cctChanged = (e, value) => {
    console.log(value,this.refs.colorSlider,this.refs.chart);
    this.refs.colorSlider.setState({
      percent: value,
      value: value
    });

    this.refs.chart.state.chart.datasets[0].points[0].value = value * Math.random() * 100;
    this.refs.chart.state.chart.datasets[0].points[1].value = value * Math.random() * 100;
    this.refs.chart.state.chart.datasets[0].points[2].value = value * Math.random() * 100;
    this.refs.chart.state.chart.datasets[0].points[3].value = value * Math.random() * 100;
    this.refs.chart.state.chart.datasets[0].points[4].value = value * Math.random() * 100;
    this.refs.chart.state.chart.update();
  }

  backClick = (e) => {
    alert("!!!!!!");
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
        labels: ["", "", "", "", "", "",],
        datasets: [
            {
                label: "My Second dataset",
                fillColor: "rgba(151,187,205,0.2)",
                strokeColor: "rgba(151,187,205,1)",
                pointColor: "rgba(151,187,205,1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(151,187,205,1)",
                data: [28, 48, 40, 19, 86, 27, 90]
            }
        ]
    };

    return (
      <div>
        <AppBar
          title="Title"
          iconElementLeft={<IconButton><NavigationClose /></IconButton>}
          iconElementRight={<FlatButton label="Save" onTouchTap={this.backClick} />}
          onLeftIconButtonTouchTap={this.backClick} />
        <div className="self-center" style={{width: '100%'}}>
            <div className="col-md-6">
              <div className="row">
                <LineChart ref="chart" data={chartData} style={{
                    margin: '5px',
                    width: '100%',
                    height: '200px'
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
            <div className="col-md-6">
              <div className="row">
                <div className="col-md-6" style={{marginTop:'30px'}}>
                  <Slider ref="colorSlider"  name="WW" defaultValue={1} description="WW" className="slider"/>
                  <Slider name="DB" defaultValue={1} description="DB" className="slider"/>
                  <Slider name="BL" defaultValue={1} description="BL" className="slider"/>
                  <Slider name="GR" defaultValue={1} description="GR" className="slider"/>
                  <Slider name="RE" defaultValue={1} description="RE" className="slider"/>
                </div>
                <div className="col-md-6" style={{marginTop:'30px'}}>
                  <RadioButtonGroup name="shipSpeed" defaultSelected="ALL" className="selectGroup">
                    <RadioButton
                      value="ALL"
                      label="ALL"
                      style={{marginBottom:16}}/>
                    <RadioButton
                      value="GROUP"
                      label="GROUP"
                      style={{marginBottom:16}}/>
                  </RadioButtonGroup>
                </div>
                <div>
                  <DropDownMenu menuItems={menuItems} />
                </div>
                <div>
                  <DropDownMenu menuItems={menuItems} />
                </div>
              </div>
              <div className="row" style={{padding:'15px'}}>
                <Slider name="CCT" defaultValue={1} description="CCT" step="0.1" className="slider" onChange={this._cctChanged}/>
                <Slider name="Bright" defaultValue={1} className="slider" description="Bright"/>
              </div>
          </div>
        </div>
      </div>
    );
  }
}
