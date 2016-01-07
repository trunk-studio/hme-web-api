import React from 'react';
import {connect} from 'react-redux'
import {
  requestGetScheduleDetail,
  requestUpdateScheduleDetail,
  modifySchedule
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
    this.state = {
      currentIndex: 0,

    }
  }

  componentDidMount () {
    this.props.requestGetScheduleDetail(this.props.params.scheduleID);
  }

  _handleBtnClick(index) {

    if(index == this.state.currentIndex)
      window.location.href = `#/schedule/config/1`;

    this.setState({currentIndex: index});
    // TODO
    // highlight dot
  }

  componentDidUpdate(prevProps, prevState) {

  }

  _handleWeightChanged = (val) => {
    let weight = val/100;
    let dailySchedules = [];
    dailySchedules.push(...this.props.scheduleDetails);
    dailySchedules[this.state.currentIndex].weight = weight;
    this.props.modifySchedule({
      schedules: dailySchedules
    });
  }

  _handleTimetChanged = (val) => {
     let nextScheduleStartTimeInteger = this.props.scheduleDetails[(this.state.currentIndex + 1)%12].StartTimeInteger;
     let prevScheduleStartTimeInteger = this.props.scheduleDetails[(this.state.currentIndex + 11)%12].StartTimeInteger;
    //  console.log(prevScheduleStartTimeInteger);

     if( val >= nextScheduleStartTimeInteger && this.state.currentIndex != 11) {
       val = nextScheduleStartTimeInteger - 1;
     }
     if( val <= prevScheduleStartTimeInteger && this.state.currentIndex != 0) {
       val = prevScheduleStartTimeInteger + 1;
     }

    //  val = val > 1440 ? 1440 : val;
    //  val = val < 0 ? 0 : val;

     let time = _formatMinutes(val) + ':00';
     let dailySchedules = [];
     dailySchedules.push(...this.props.scheduleDetails);
     dailySchedules[this.state.currentIndex].StartTime = time;
     this.props.modifySchedule({
       schedules: dailySchedules
     });
  }

  _limitSlider = (val) => {
    if( val >= this.props.scheduleDetails[(this.state.currentIndex + 1)%12].StartTimeInteger)
      this.setState({})
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

    console.log('prop', this.props);
    let scheduleDetails = this.props.scheduleDetails;
    let sliderTime = scheduleDetails.length? scheduleDetails[this.state.currentIndex].StartTimeInteger : 0;
    let sliderWeight = scheduleDetails.length? scheduleDetails[this.state.currentIndex].weight : 0;
    let sliderData = {
      time: sliderTime,
      weight: sliderWeight*100
    };

    let dots=[],tickMarks=[];
    for (let dot of this.props.scheduleDetails) {
      dots.push({
        x: dot.StartTimeInteger,
        y: dot.weight
      });
      tickMarks.push(dot.StartTimeInteger);
    }

    let data = [{
      key: 'testLine',
      color: '#2d7fe0',
      values: [
        { x: 0, y: 0},
        ...dots,
        {x: _timeToInteger('24:00:00'), y: 0}
      ]
    }];

    let ButtonGroup1 = [],
        ButtonGroup2 = [];
    if(this.props.scheduleDetails.length) {
      for (let i=0; i<6; i++) {
          let active = (i==this.state.currentIndex);
          ButtonGroup1.push(
            <div className="col-xs-2" key={i}>
              <RaisedButton onTouchTap={function(){this._handleBtnClick(i)}.bind(this)}
                fullWidth={true} label={_formatMinutes(this.props.scheduleDetails[i].StartTimeInteger)}
                secondary={true} style={{marginLeft: '3px'}}
                primary={active}/>
            </div>
          );
      }

      for (let i=6; i<12; i++) {
        let active = (i==this.state.currentIndex);
        ButtonGroup2.push(
          <div className="col-xs-2" key={i}>
            <RaisedButton onTouchTap={function(){this._handleBtnClick(i)}.bind(this)}
              fullWidth={true} label={_formatMinutes(this.props.scheduleDetails[i].StartTimeInteger)}
              secondary={true} style={{marginLeft: '3px'}}
              primary={active} />
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
                      tickValues: tickMarks,
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
                    value={sliderData.weight} onAfterChange={this._handleWeightChanged}
                    tipFormatter={function(v){return v+'%';}}
                    />
                </div>
              </div>
            </div>
            <div className='row' style={{marginTop: '0px', marginLeft: '45px'}}>
              <div style={{
                width: '85%'
              }} className="">
                <Slider min={0} max={1440} marks={marks} included={false}
                  value={sliderData.time} disabled={false}
                  allowCross={false} style={{width: '10%'}}
                  onAfterChange={this._handleTimetChanged}
                  tipFormatter={function(v){return _formatMinutes(v);}}
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

  console.log('inject');
  let { scheduleDetail } = state;
  let scheduleDetails = scheduleDetail.dailySchedules? scheduleDetail.dailySchedules.ScheduleDetails : [];
  if(scheduleDetails.length) {
    for (let schedule of scheduleDetails) {
      schedule.StartTimeInteger = _timeToInteger(schedule.StartTime);
    }
  }
  return {
    scheduleDetails: scheduleDetails
  };
}

const _injectPropsFromActions = {
  requestGetScheduleDetail,
  requestUpdateScheduleDetail,
  modifySchedule
}

export default connect(_injectPropsFromStore, _injectPropsFromActions)(ScheduleDetail);
