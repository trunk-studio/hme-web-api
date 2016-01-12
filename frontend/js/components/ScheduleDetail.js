import React from 'react';
import {connect} from 'react-redux'
import {
  requestGetScheduleDetail,
  requestUpdateScheduleDetails,
  modifySchedule
} from '../actions/ScheduleDetailActions'
import moment from 'moment'
import {
  AppBar, TimePicker, Dialog, IconButton, NavigationClose, FlatButton, RaisedButton, SelectField, TextField, Tabs, Tab, DatePicker, Table, RadioButtonGroup, TableBody, TableFooter, TableHeader, TableHeaderColumn, TableRowColumn, TableRow
} from 'material-ui';
import numeral from 'numeral'
import NVD3Chart from 'react-nvd3';
import VerticalSlider from'vertical-rc-slider';
import Slider from 'rc-slider';
const style = {
  width: 400,
  margin: 50
};

const SCHEDULE_DETAILS_AMOUNT = 12,
      MAX_TIME_INTEGER = 1440,
      SLIDER_TIME_MARKS = {
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
      },
      SLIDER_WEIGHT_MARKS = {
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
      };
export default class ScheduleDetail extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      currentIndex: 0,
      dialogIsOpen: false
    }
  }

  componentDidMount () {
    this.props.requestGetScheduleDetail(this.props.params.scheduleID);
  }

  _handleTimeBtnClick(index) {

    if(index == this.state.currentIndex)
      window.location.href = `#/schedule/config/1`;
    this.setState({currentIndex: index});
  }

  componentDidUpdate(prevProps, prevState) {

    // modify color of current dot
    $(`.nv-point-${prevState.currentIndex+1}`).attr('stroke', 'rgb(45, 127, 224)').attr('fill', 'rgb(45, 127, 224)');
    $(`.nv-point-${this.state.currentIndex+1}`).attr('stroke', 'rgba(255, 55, 36, 0.82)').attr('fill', 'rgba(255, 55, 36, 0.82)');
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
     let nextScheduleStartTimeInteger = this.props.scheduleDetails[(this.state.currentIndex + 1)%SCHEDULE_DETAILS_AMOUNT].StartTimeInteger;
     let prevScheduleStartTimeInteger = this.props.scheduleDetails[(this.state.currentIndex + 11)%SCHEDULE_DETAILS_AMOUNT].StartTimeInteger;
    //  console.log(prevScheduleStartTimeInteger);

     if( val >= nextScheduleStartTimeInteger && this.state.currentIndex != SCHEDULE_DETAILS_AMOUNT-1) {
       val = nextScheduleStartTimeInteger - 1;
     }
     if( val <= prevScheduleStartTimeInteger && this.state.currentIndex != 0) {
       val = prevScheduleStartTimeInteger + 1;
     }

     let time = _formatMinutes(val) + ':00';
     let dailySchedules = [];
     dailySchedules.push(...this.props.scheduleDetails);
     dailySchedules[this.state.currentIndex].StartTime = time;
     this.props.modifySchedule({
       schedules: dailySchedules
     });
  }

  // _limitSlider = (val) => {
  //   if( val >= this.props.scheduleDetails[(this.state.currentIndex + 1)%SCHEDULE_DETAILS_AMOUNT].StartTimeInteger)
  //     this.setState({})
  // }

  _saveScheduleDetails = (e) => {
    // console.log('save',this.props.scheduleDetails);
    this.props.requestUpdateScheduleDetails(this.props.scheduleDetails);
  }

  _handleDialogOpen = (e) => {
    this.setState({dialogIsOpen: true});
  }

  _handleDialogClose = (e) => {
    console.log('test');
    this.setState({dialogIsOpen: false});
  }

  _resetScheduleDetailsTime = (startTime, endTime) => {
    let dis = _timeToInteger(endTime) - _timeToInteger(startTime);
    let inteval = Math.floor(dis/11);
    console.log('inteval', inteval);
    let dailySchedules = [];
    dailySchedules.push(...this.props.scheduleDetails);
    for (let i=0;i<12;i++) {
      let time = _formatMinutes(_timeToInteger(startTime) + (inteval*i));
      dailySchedules[i].StartTime = time;
    }

    this.props.modifySchedule({
      schedules: dailySchedules
    });
    this._handleDialogClose();
  }

  render () {

    console.log('prop', this.props);
    let scheduleDetails = this.props.scheduleDetails,
        currentIndex = this.state.currentIndex;
    let firstScheduleDetail = scheduleDetails[0],
        lastScheduleDetail = scheduleDetails[SCHEDULE_DETAILS_AMOUNT-1],
        currentScheduleDetail = scheduleDetails[currentIndex],
        sliderTime = scheduleDetails.length? currentScheduleDetail.StartTimeInteger : 0,
        sliderWeight = scheduleDetails.length? currentScheduleDetail.weight : 0,
        sliderData = {
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

    let timeDuration = scheduleDetails.length? MAX_TIME_INTEGER - scheduleDetails[SCHEDULE_DETAILS_AMOUNT-1].StartTimeInteger + firstScheduleDetail.StartTimeInteger : 0;
    let weightDiff = scheduleDetails.length? firstScheduleDetail.weight - lastScheduleDetail.weight : 0;
    let rate = weightDiff/timeDuration;
    let midWeight = scheduleDetails.length? lastScheduleDetail.weight + (MAX_TIME_INTEGER - lastScheduleDetail.StartTimeInteger)*rate : 0;
    let data = [{
      key: 'testLine',
      color: '#2d7fe0',
      values: [
        { x: 0, y: midWeight},
        ...dots,
        { x: _timeToInteger('24:00:00'), y: midWeight}
      ]
    }];

    let ButtonGroup1 = [],
        ButtonGroup2 = [];
    if(scheduleDetails.length) {
      for (let i=0; i<6; i++) {
        let active = (i==this.state.currentIndex);
        ButtonGroup1.push(
          <div className="col-xs-2" key={i}>
            <RaisedButton onTouchTap={function(){this._handleTimeBtnClick(i)}.bind(this)}
              fullWidth={true} label={_formatMinutes(this.props.scheduleDetails[i].StartTimeInteger)}
              secondary={true} style={{marginLeft: '3px'}}
              primary={active}/>
          </div>);
      }

      for (let i=6; i<12; i++) {
        let active = (i==this.state.currentIndex);
        ButtonGroup2.push(
          <div className="col-xs-2" key={i}>
            <RaisedButton onTouchTap={function(){this._handleTimeBtnClick(i)}.bind(this)}
              fullWidth={true} label={_formatMinutes(this.props.scheduleDetails[i].StartTimeInteger)}
              secondary={true} style={{marginLeft: '3px'}}
              primary={active} />
          </div>);
      }
    }

    let dialogActions = [
      <FlatButton
        label="Cancel"
        secondary={true}
        onTouchTap={this._handleDialogClose} />,
      <FlatButton
        label="Reset"
        primary={true}
        onTouchTap={function() {
            this._resetScheduleDetailsTime('02:00','20:00')}.bind(this)
        } />
    ];
    return (
      <div>
        <AppBar title="Schedule Detail"
          iconElementRight={
            <FlatButton label="Save" onTouchTap={this._saveScheduleDetails}/>
          }
          onLeftIconButtonTouchTap={function(){console.log('leftNav');}}
        />
        <div className="self-center" style={{
        width: '100%',
        overflowX: 'hidden'
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
                  min={0} max={100} marks={SLIDER_WEIGHT_MARKS}
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
              <Slider min={0} max={MAX_TIME_INTEGER} marks={SLIDER_TIME_MARKS} included={false}
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
        <div className="center-self" style={{width:"88px", marginTop: '5px', marginBottom: '5px'}}>
          <RaisedButton label="Reset" primary={true} onTouchTap={this._handleDialogOpen}/>
        </div>
        <Dialog
          title="Reset Time"
          modal={false}
          actions={dialogActions}
          open={this.state.dialogIsOpen}
          onRequestClose={this._handleDialogClose}
          contentStyle={{
            width: '80%'
          }} >
          <div>
            <TimePicker
              format="24hr"
              autoOk={true}
              hintText="StartTime"
              style={{
                display: 'inline-block',
                width: '50%'
              }}
              textFieldStyle={{width: '100px'}} />
            <TimePicker
              format="24hr"
              autoOk={true}
              style={{
                display: 'inline-block',
                width: '50%'
              }}
              textFieldStyle={{width: '100px'}}
              hintText="EndTime" />
          </div>
        </Dialog>
      </div>
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
  requestUpdateScheduleDetails,
  modifySchedule
}

export default connect(_injectPropsFromStore, _injectPropsFromActions)(ScheduleDetail);
