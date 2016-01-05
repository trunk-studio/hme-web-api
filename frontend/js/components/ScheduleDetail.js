import React from 'react';
import {connect} from 'react-redux'
import {
  requestGetScheduleDetail,
  getSliderValue

} from '../actions/ScheduleDetailActions'
import moment from 'moment'
import {RaisedButton, SelectField, TextField, Tabs, Tab, DatePicker, Table, RadioButtonGroup, TableBody, TableFooter, TableHeader, TableHeaderColumn, TableRowColumn, TableRow} from 'material-ui';
import numeral from 'numeral'
const VerticalSlider = require('vertical-rc-slider');
const Slider = require('rc-slider');
const style = {
  width: 400,
  margin: 50
};
let NVD3Chart = require('react-nvd3');

export default class ScheduleDetail extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount () {
    this.props.requestGetScheduleDetail(this.props.params.scheduleID);
  }

  _handleBtnClick(index) {
    console.log(index);
    this.props.getSliderValue(index);
    // TODO
    // change color
    // highlight dot
    // give slider value
    // redirect
  }

  render () {
    const marks = {
      0 : '00:00',
      120: '02:00',
      240: '04:00',
      360: '06:00',
      480: '08:00',
      600: '10:00',
      720: '12:00',
      840: '14:00',
      960: '16:00',
      1080: '18:00',
      1200: '20:00',
      1320: '22:00',
      1440: '24:00'
    };

    const percent_marks = {
      0: '0',
      10: '10',
      20: '20',
      30: '30',
      40: '40',
      50: '50',
      60: '60',
      70: '70',
      80: '80',
      90: '90',
      100: '100'
    }
    let chartData = {
      labels: [
        "0", "2", "4", "6", "8", "12", "14", "16", "18", "20", "22", "24"
      ],
      datasets: [
        {
          label: "My Second dataset",
          scaleBeginAtZero: true,
          responsive: true,
          scaleFontSize: 10,
          fillColor: "rgba(151,187,205,0.2)",
          strokeColor: "rgba(151,187,205,1)",
          pointColor: "rgba(151,187,205,1)",
          pointStrokeColor: "#fff",
          pointHighlightFill: "#fff",
          pointHighlightStroke: "rgba(151,187,205,1)",
          data: [28, 48, 40, 19, 86, 27, 90, 28, 48, 40, 19, 86]
        }
      ]
    };

    console.log('prop', this.props);

    let dots = [{
      x: 0,
      y: 0
    }];

    for (let dot of this.props.scheduleDetails) {
      dots.push({
        x: dot.StartTimeInteger,
        y: dot.weight
      })
    }
    dots.push({
      x: _timeToInteger('24:00:00'),
      y: 1
    });

    let data = [{
      key: 'testLine',
      color: '#2d7fe0',
      values: dots
    }];

    let ButtonGroup1 = [],
        ButtonGroup2 = [];
    if(this.props.scheduleDetails.length) {
      for (let i=0; i<6; i++) {
          ButtonGroup1.push(
            <div className="col-xs-2" key={i}>
              <RaisedButton onTouchTap={function(){this._handleBtnClick(i)}.bind(this)}
                fullWidth={true} label={_formatMinutes(this.props.scheduleDetails[i].StartTimeInteger)} secondary={true} style={{marginLeft: '3px'}} />
            </div>
          );
      }

      for (let i=6; i<12; i++) {
        ButtonGroup2.push(
          <div className="col-xs-2" key={i}>
            <RaisedButton onTouchTap={function(){this._handleBtnClick(i)}.bind(this)}
              fullWidth={true} label={_formatMinutes(this.props.scheduleDetails[i].StartTimeInteger)} secondary={true} style={{marginLeft: '3px'}} />
          </div>
        );
      }
    }

    return (
      <Tabs style={{overflowX: 'hidden'}}>
        <Tab label="Schedule Detail" >
          <div className="self-center" style={{
          width: '100%'
          }}>
            <div className="row">
              <div className="center-self">
                <div className="col-md-11 col-sm-11 col-xs-11 chart-container">
                  <NVD3Chart
                    type="lineChart"
                    height={215}
                    datum={data}
                    xAxis={{
                      tickFormat: function(d) {return _formatMinutes(d);}
                    }}
                    yAxis={{
                      tickFormat: function(d) {return numeral(d).format('0%')}
                    }} />
                </div>
                <div className="col-md-1 col-sm-1 col-xs-1" style={{paddingTop: '85px',
                  position: 'absolute', right: '-75px'}}>
                  <VerticalSlider className="vertical-slider"
                    min={0} max={100} marks={percent_marks}
                    included={false} style={{float: 'right'}}
                    />
                </div>
              </div>
            </div>
            <div className='row' style={{marginTop: '0px'}}>
              <div style={{
                width: '80%'
                }} className="center-self">
                <Slider min={0} max={1440} marks={marks} included={false}
                  value={this.props.sliderData.time} disabled={false} allowCross={false} style={{width: '10%'}}
                  />
              </div>
            </div>
            <div className="row" style={{
              marginTop: '23px'
              }}>
              <div className="center-self" style={{width:'100%'}}>
                {ButtonGroup1}
              </div>
            </div>
            <div className="row" style={{
                  marginTop: '5px'
                  }}>
              {ButtonGroup2}
            </div>
          </div>
        </Tab>
      </Tabs>
    );
  }
}

function _formatMinutes(minutes) {
  return (_pad(Math.floor(minutes/60),2) + ':' + _pad(minutes%60,2));
}

function _timeToInteger(time) {
  let splitTime = time.split(':');
  let minutes = parseInt(splitTime[0])*60 + parseInt(splitTime[1]);
  // console.log('min',minutes);
  return minutes;
}

function _pad(n, width, z) {
  z = z || '0';
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

function _injectPropsFromStore(state) {
  let { scheduleDetail } = state;
  let scheduleDetails = scheduleDetail.dailySchedules? scheduleDetail.dailySchedules.ScheduleDetails : [];
  if(scheduleDetails.length) {
    for (let schedule of scheduleDetails) {
      schedule.StartTimeInteger = _timeToInteger(schedule.StartTime);
    }
  }
  let currentIndex = scheduleDetail.currentIndex || 0;
  console.log(scheduleDetails, currentIndex);
  let sliderTime = scheduleDetails.length? scheduleDetails[currentIndex].StartTimeInteger : 0;
  let sliderWeight = scheduleDetails.length? scheduleDetails[currentIndex].weight : 0;
  let sliderData = {
    time: sliderTime,
    weight: sliderWeight*100
    // disable:
  };
  return {
    scheduleDetails: scheduleDetails,
    currentIndex: scheduleDetail.currentIndex,
    sliderData: sliderData
  };
}

const _injectPropsFromActions = {
  requestGetScheduleDetail,
  getSliderValue
}

export default connect(_injectPropsFromStore, _injectPropsFromActions)(ScheduleDetail);
