import React from 'react';
import {connect} from 'react-redux'
import {
  requestGetScheduleDetail,
  requestUpdateScheduleDetails,
  modifySchedule, requestSetFastRun,
  requestSetSimRtc
} from '../actions/ScheduleDetailActions'
import moment from 'moment'
import {
  RefreshIndicator, AppBar, TimePicker, FontIcon, Dialog, IconButton, FlatButton, RaisedButton, SelectField, TextField, Tabs, Tab, DatePicker, Table, RadioButtonGroup, TableBody, TableFooter, TableHeader, TableHeaderColumn, TableRowColumn, TableRow
} from 'material-ui';
const NavigationClose = require('material-ui/lib/svg-icons/navigation/close.js');

import numeral from 'numeral'
import NVD3Chart from 'react-nvd3';
import VerticalSlider from'vertical-rc-slider';
import Slider from 'rc-slider';
const style = {
  width: 400,
  margin: 50
};

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

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
      dialogIsOpen: false,
      fastRunLabel: 'FastRun',
      fastRunIntervalId: '',
      fastRunStart: false,
      count: 0
    }
  }

  componentDidMount () {
    this.props.requestGetScheduleDetail(this.props.params.scheduleID);
  }

  _handleTimeBtnClick(index) {
    if(index == this.state.currentIndex)
      window.location.href = `#/schedule/${this.props.params.scheduleID}/config/${this.props.scheduleDetails[index].id}`;
    this.setState({currentIndex: index});
  };

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
  };

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
  };

  _saveScheduleDetails = (e) => {
    // console.log('save',this.props.scheduleDetails);
    this.props.requestUpdateScheduleDetails(this.props.scheduleDetails);
  };

  _fastRun = (e) => {
    if(!this.state.fastRunStart){
      this.props.requestSetFastRun({
        slaveId: this.props.params.slaveId,
        scheduleId: this.props.params.scheduleID
      });
      let fastRunIntervalId = setInterval(this._setSimRtc, 1000);
      this.setState({
        fastRunIntervalId: fastRunIntervalId,
        fastRunStart: true
      })
    }else{
      clearInterval(this.state.fastRunIntervalId);
      this.setState({
        fastRunLabel: 'FastRun',
        fastRunStart: false,
        count: 0
      })
    }
  };

  _setSimRtc = (e) => {
    let time = moment("2016-01-01T00:00:00");
    let count = this.state.count;
    time.add(30 * count,'m');
    count++;
    console.log(time.format());
    this.props.requestSetSimRtc({
      slaveId: this.props.params.slaveId,
      count: count
    })
    this.setState({
      fastRunLabel: time.format("HH:mm"),
      count: count
    })
  };

  _handleDialogOpen = (e) => {
    this.setState({dialogIsOpen: true});
  };

  _handleDialogClose = (e) => {
    this.setState({dialogIsOpen: false});
  };

  _resetScheduleDetailsTime = (startTime, endTime) => {
    let dis = _timeToInteger(endTime) - _timeToInteger(startTime);
    let inteval = Math.floor(dis/SCHEDULE_DETAILS_AMOUNT-1);
    let dailySchedules = [];
    dailySchedules.push(...this.props.scheduleDetails);
    for (let i=0;i<SCHEDULE_DETAILS_AMOUNT;i++) {
      let time = _formatMinutes(_timeToInteger(startTime) + (inteval*i));
      dailySchedules[i].StartTime = time;
      if( i == 0 || i == SCHEDULE_DETAILS_AMOUNT-1 ) {
        dailySchedules[i].weight = 0;
      }
    }

    this.props.modifySchedule({
      schedules: dailySchedules
    });
    this._handleDialogClose();
  };

  _checkTimeInput = (e) => {
    let InputStartTime = this.refs.inputStartTime,
        InputEndTime = this.refs.inputEndTime,
        startTime = InputStartTime.getValue(),
        endTime = InputEndTime.getValue(),
        regex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/g;

    if(startTime.match(regex) == null) {
      InputStartTime.focus();
      InputStartTime.setErrorText('Wrong Format');
      return false;
    }
    else
      InputStartTime.setErrorText('');

    if(endTime.match(regex) == null) {
      InputEndTime.focus();
      InputEndTime.setErrorText('Wrong Format');
      return false;
    }
    else
      InputEndTime.setErrorText('');

    return true;
  };

  _dialogActionReset = (e) => {
    let InputStartTime = this.refs.inputStartTime,
        InputEndTime = this.refs.inputEndTime,
        startTime = InputStartTime.getValue(),
        endTime = InputEndTime.getValue();

    let success = this._checkTimeInput();
    if(success)
      this._resetScheduleDetailsTime(startTime, endTime);
  };

  _handleTImeInputChanged = (ref, e) => {
    this._checkTimeInput();
    /*
    let text = e.target.value;
    if(text.length==2)
      this.refs[ref].setValue(text+':');
    if(text.length>5)
      this.refs[ref].setValue(text.slice(0,5));
    */
  };

  render () {

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
      key: 'daily schedule',
      color: '#2d7fe0',
      values: [
        { x: 0, y: midWeight},
        ...dots,
        { x: _timeToInteger('24:00:00'), y: midWeight}
      ]
    }];
    console.log('===', data, dots);

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

      for (let i=6; i<SCHEDULE_DETAILS_AMOUNT; i++) {
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
        key={'cancelButton'}
        label="Cancel"
        secondary={true}
        onTouchTap={this._handleDialogClose} />,
      <FlatButton
        key={'resetButton'}
        label="Reset"
        primary={true}
        onTouchTap={this._dialogActionReset} />
    ];

    return (
      <div>
        <AppBar title="Schedule Detail"
          style={{height: '55px', minHeight: '0px', marginTop: '-9px'}}
          titleStyle={{fontSize: '20px'}}
          iconElementLeft={
            <IconButton onTouchTap={function() {window.location.href = '#/manage/3';}} >
              <NavigationClose />
            </IconButton>
          }
          iconElementRight={
            <div>
              <FlatButton label={this.state.fastRunLabel} ref="fastRun" onTouchTap={this._fastRun} style={{marginTop:'4px',marginRight:'10px',marginLeft:'auto', color: '#fff', backgroundColor: 'rgba(0,0,0,0)'}} />
              <FlatButton label="RESET" onTouchTap={this._handleDialogOpen} style={{marginTop:'4px',marginRight:'10px',marginLeft:'auto', color: '#fff', backgroundColor: 'rgba(0,0,0,0)'}} />
              <FlatButton label="save" onTouchTap={this._saveScheduleDetails} style={{didFlip:'true',marginTop:'4px',marginRight:'10px',marginLeft:'auto', backgroundColor: 'rgba(0,0,0,0)', color: '#fff'}} >
                <RefreshIndicator
                  size={28}
                  left={0}
                  top={5}
                  status={this.props.loading || 'hide'}
                  style={{display: 'inline-block', position: 'relative'}} />
              </FlatButton>
            </div>
          }
        />
        <div className="self-center" style={{
        width: '100%',
        overflowX: 'hidden'
        }}>
          <div className="row">
            <div className="center-self" style={{position: 'relative'}}>
              <div className="col-md-11 col-sm-11 col-xs-11 chart-container">
                <NVD3Chart
                  type="lineChart"
                  height={215}
                  datum={data}
                  xAxis={{
                    tickValues: tickMarks,
                    tickFormat: function(d) {return _formatMinutes(d);}
                  }}
                  forceX={[0,MAX_TIME_INTEGER]}
                  yAxis={{
                    tickFormat: function(d) {return numeral(d).format('0%')}
                  }}
                  forceY={[0,1]} />
              </div>
              <div className="col-md-1 col-sm-1 col-xs-1" style={{paddingTop: '85px',
                position: 'absolute', right: '-60px'}}>
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
        {/*
        <div className="center-self" style={{width:"88px", marginTop: '5px', marginBottom: '5px'}}>
          <RaisedButton label="Reset" primary={true} onTouchTap={this._handleDialogOpen}/>
        </div>
        */}
        <Dialog
          title="Reset Time"
          modal={false}
          actions={dialogActions}
          open={this.state.dialogIsOpen}
          onRequestClose={this._handleDialogClose}
          bodyStyle={{paddingTop: '0px', paddingBottom: '0px'}}
          contentStyle={{
            width: '80%'
          }} >
          <div style={{display: 'inline-flex', width: '100%'}}>
            <TextField
              ref="inputStartTime"
              hintText="08:15"
              floatingLabelText="StartTime"
              onChange={this._handleTImeInputChanged.bind({}, 'inputStartTime')}
              defaultValue={this.props.scheduleDetails[0]? this.props.scheduleDetails[0].StartTime.toString().slice(0,5) : ''}
              style={{
                display: 'inline-block',
                width: '50%'
              }}/>
            <TextField
              ref="inputEndTime"
              hintText="20:12"
              floatingLabelText="EndTime"
              onChange={this._handleTImeInputChanged.bind({}, 'inputEndTime')}
              defaultValue={this.props.scheduleDetails[SCHEDULE_DETAILS_AMOUNT-1]? this.props.scheduleDetails[SCHEDULE_DETAILS_AMOUNT-1].StartTime.toString().slice(0,5) : ''}
              style={{
                display: 'inline-block',
                width: '50%'
              }} />
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
    scheduleDetails: scheduleDetails,
    loading: scheduleDetail.loading? scheduleDetail.loading : 'hide'
  };
}

const _injectPropsFromActions = {
  requestGetScheduleDetail,
  requestUpdateScheduleDetails,
  modifySchedule,
  requestSetFastRun,
  requestSetSimRtc
}

export default connect(_injectPropsFromStore, _injectPropsFromActions)(ScheduleDetail);
