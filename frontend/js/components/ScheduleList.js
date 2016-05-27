import React from 'react';
import {connect} from 'react-redux'
import { requestScheduleCreate, requestGetScheduleList,
   updateScheduleFirstDate, updateScheduleDay,
   requestSetScheduleList,requestGetSlaveSchedule,
   requestUpdateScheduleList,requestGetEasySchedule,
   requestUpdateEasyScheduleList,requestScheduleDeleteLast,
 } from '../actions/ScheduleListActions'
import moment from 'moment';
import {requestGetCachedSlaveList} from '../actions/TestActions';
import {
   RaisedButton,
   SelectField,
   MenuItem,
   TextField,
   Tabs,
   Tab,
   RefreshIndicator,
   RadioButton,
   RadioButtonGroup,
   Table,
   TableBody,
   TableFooter,
   TableHeader,
   TableHeaderColumn,
   TableRow,
   TableRowColumn,
   Snackbar,
   Dialog,
   FlatButton
 } from 'material-ui';

import ThemeManager from 'material-ui/lib/styles/theme-manager';
import LightRawTheme from 'material-ui/lib/styles/raw-themes/light-raw-theme';
import Colors from 'material-ui/lib/styles/colors';

export default class ScheduleList extends React.Component {

  static childContextTypes = {
    muiTheme: React.PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.state = {
      isSetBtnClose: true,
      scheduleDate: [],
      muiTheme: ThemeManager.getMuiTheme(LightRawTheme),
      isAll: false,
      isGroup: true,
      selectedSlave: -1,
      open: false,
      isEasy: true,
      springDays: null,
      springHour: null,
      summerDays: null,
      summerHour: null,
      fallDays: null,
      fallHour: null,
      simpleStartDate: new Date(),
      simpleSunriseTime: moment().format("HH:mm"),
      dayWarnOpen: false
    };
  }

  getChildContext() {
    return {
      muiTheme: this.state.muiTheme
    };
  };

  componentWillMount() {
    // change theme sample
    // let newMuiTheme = ThemeManager.modifyRawThemePalette(this.state.muiTheme, {
    //   textColor: Colors.deepOrange500,
    // });

    // this.setState({muiTheme: newMuiTheme});
  };

  componentDidMount () {
    let isEasy = localStorage.getItem('HME_scheduleList_mode');
    if(isEasy !== null){
      if( isEasy == 'sample' ){
        isEasy = true
      }else{
        isEasy = false
      }
    }else{
      isEasy = true
      localStorage.setItem('HME_scheduleList_mode', 'sample');
    }
    let pro_slaveIndex = localStorage.getItem('HME_scheduleList_slaveIndex');
    if(!pro_slaveIndex)
      localStorage.setItem('HME_scheduleList_slaveIndex', -1);
    else if(pro_slaveIndex == 0)
      this.setState({
        isAll: true,
        selectedSlave: pro_slaveIndex
      });
    this.props.requestGetCachedSlaveList();
    this.setState({
      selectedSlave: localStorage.getItem('HME_scheduleList_slaveIndex'),
      isSetBtnClose: localStorage.getItem('HME_scheduleList_slaveIndex')? false : true,
      isEasy: isEasy
    });

    this.props.requestGetEasySchedule(pro_slaveIndex  || 0);
    this.props.requestGetSlaveSchedule(pro_slaveIndex);
    // this.props.requestGetScheduleList();
  };

  componentDidUpdate(prevProps, prevState) {

    if( !prevProps.easySchedule && this.props.easySchedule ) {
      this.setState({
        springDays: this.props.easySchedule.Season[0].days,
        springHour: this.props.easySchedule.Season[0].hour,
        summerDays: this.props.easySchedule.Season[1].days,
        summerHour: this.props.easySchedule.Season[1].hour,
        fallDays: this.props.easySchedule.Season[2].days,
        fallHour: this.props.easySchedule.Season[2].hour ,
        simpleStartDate: this.props.easySchedule.StartDate,
        simpleSunriseTime: this.props.easySchedule.StartTime
      });
    }
    if(prevProps.easySchedule && this.props.easySchedule) {
      if(prevProps.easySchedule.SlaveId != this.props.easySchedule.SlaveId) {
        this.setState({
          springDays: this.props.easySchedule.Season[0].days,
          springHour: this.props.easySchedule.Season[0].hour,
          summerDays: this.props.easySchedule.Season[1].days,
          summerHour: this.props.easySchedule.Season[1].hour,
          fallDays: this.props.easySchedule.Season[2].days,
          fallHour: this.props.easySchedule.Season[2].hour ,
          simpleStartDate: this.props.easySchedule.StartDate,
          simpleSunriseTime: this.props.easySchedule.StartTime
        });
      }
    }
    if( prevProps.easySchedule && !this.props.easySchedule ) {
      this.setState({
        springDays: null,
        springHour: null,
        summerDays: null,
        summerHour: null,
        fallDays: null,
        fallHour: null,
        simpleStartDate: new Date(),
        simpleSunriseTime: moment().format("HH:mm")
      });
    }
  };


  _handleEditTextField = (stateKey, e) => {
    // console.log("!!!!!!!!!!!!!!!",stateKey, e, e.target.value);
    this.setState({
      isSetBtnClose: true
    });
    let value = e.target.value;
    if( stateKey == 'springDays' || stateKey == 'summerDays' || stateKey == 'fallDays'){
      if(parseInt(value, 10) > 9999){
        value = 9999
      }
    }
    let obj = {};
    obj[stateKey] = value;
    // console.log(obj);
    this.setState(obj);
  };

  _warnHandleOpen = () => {
    // if(!this.state.selectedSlave){
    this.setState({open: true});
    // }
  };

  _warnHandleClose = () => {
    this.setState({open: false});
  };

  _dayWarnHandleClose = () => {
    this.setState({dayWarnOpen: false});
  };

  _addRow = (e) => {
    let selectedSlave = (this.state.selectedSlave != 0)? this.state.selectedSlave : null;
    // console.log(selectedSlave, this.props.scheduleList[0].SlaveId);
    if(this.props.scheduleList.length < 5) {
      if(this.props.scheduleList.length > 0 && this.props.scheduleList[0].SlaveId === selectedSlave){
        this.props.requestScheduleCreate(this.props.scheduleList, selectedSlave);
      }else {
        this.props.requestScheduleCreate([], selectedSlave);
      }
      this.setState({
        isSetBtnClose: true
      });
      this.refs.snackbar.setState({open: true});
    } else {
      alert("5 is the row's maximum");
    }
  };

  _deleteLastRow = (e) => {
    let selectedSlave = (this.state.selectedSlave != 0)? this.state.selectedSlave : null;
    let scheduleList = this.props.scheduleList;
    if(this.props.scheduleList[0].SlaveId === selectedSlave){
      this.props.requestScheduleDeleteLast(scheduleList[scheduleList.length-1].id,selectedSlave)
    }else {
      this.props.requestScheduleDeleteLast(scheduleList[scheduleList.length-1].id,null)
    }
    this.setState({
      isSetBtnClose: true
    });
    this.refs.snackbar.setState({open: true});
  }

  _saveScheduleList = (e) => {
    this.props.requestUpdateScheduleList(this.props.scheduleList, this.state.selectedSlave);
    this.setState({
      isSetBtnClose: false
    });
    this.refs.snackbar.setState({open: false});
  };

  _saveEasyScheduleList = (e) => {
    if(this.refs.springDay.getValue() && this.refs.summerDay.getValue() && this.refs.fallDay.getValue()){
      if(this.refs.springDay.getValue() > 0 && this.refs.summerDay.getValue() > 0 && this.refs.fallDay.getValue() > 0){
        this.setState({
          isSetBtnClose: false
        });
        this.props.requestUpdateEasyScheduleList({
            slaveId: this.state.selectedSlave || 0 ,
            startDate: this.refs.easyStartDate.getValue() ,
            sunrise: this.refs.easyStartTime.getValue(),
            season:[{
              hour: this.refs.springHours.getSelectedValue(),
              days: this.refs.springDay.getValue() || 0,
            },{
              hour: this.refs.summerHours.getSelectedValue(),
              days: this.refs.summerDay.getValue() || 0,
            },{
              hour: this.refs.fallHours.getSelectedValue(),
              days: this.refs.fallDay.getValue() || 0,
            }
          ]
        });
        this.refs.snackbar.setState({open: false});
      }else{
        this.setState({dayWarnOpen: true});
      }
    }else{
      this.setState({dayWarnOpen: true});
    }
  };

  _setScheduleList = (e) => {
    this._warnHandleClose()
    let slaveId = this.state.selectedSlave || 0 ;
    // console.log(slaveId);
    this.props.requestSetScheduleList({
      slaveId: slaveId
    })
    this.setState({
      isSetBtnClose: true
    });
    this.refs.snackbar.setState({open: true});
  };

  _formatDate = (date) => {
    return moment(date).format('YYYY/MM/DD');
  };

  _calculateDate = (i,e) => {
    let value = e.target.value;
    if(value >= 0){
      if(parseInt(value, 10) > 9999){
        value = 9999;
      }
      let tmpScheduleList = [...this.props.scheduleList];
      tmpScheduleList[i].Days = value;

      for(let i = 0; i < tmpScheduleList.length-1; i++) {
        let newDate = new Date(tmpScheduleList[i].StartDate);
        newDate.setDate(newDate.getDate() + parseInt(tmpScheduleList[i].Days,10));
        tmpScheduleList[i+1].StartDate = newDate;
      }
      // this.props.updateScheduleDay(value, i);
      this.setState({
        isSetBtnClose: true
      });
      this.refs.snackbar.setState({open: true});
    }else{
      this.setState({dayWarnOpen: true});
    }
  };

  _handleDatePickChange = (event) => {
    let date = event.target.value;
    this.props.updateScheduleFirstDate(date);
    this.props.updateScheduleDay()
    let tmpScheduleList = [...this.props.scheduleList];
    for(let i = 0; i < tmpScheduleList.length-1; i++) {
      let newDate = new Date(tmpScheduleList[i].StartDate);
      newDate.setDate(newDate.getDate() + parseInt(tmpScheduleList[i].Days,10));
      tmpScheduleList[i+1].StartDate = newDate;
    }
    this.setState({
      isSetBtnClose: true
    })
    this.refs.snackbar.setState({open: true});
  };

  _handleRequestClose = (e) => {
    this.refs.snackbar.setState({open: false});
  };

  _allScheduleBtn = (e) => {
    this.setState({isAll: true, isGroup: false});
  };

  _groupScheduleBtn = (e) => {
    this.setState({isAll: false, isGroup: true});
  };

  _handleSlaveSelect = (e, selectedIndex) => {
    localStorage.setItem('HME_scheduleList_slaveIndex', e.target.value);
    let slaveIndex = e.target.value;
    if(selectedIndex > 0) {
      // console.log("!!!!!!!!!!!!!!!!",e.target.value);
      if(this.state.isEasy){
        this.props.requestGetEasySchedule(e.target.value || 0);
      }else{
        this.props.requestGetSlaveSchedule(e.target.value? e.target.value : null);
      }
    }

    if(slaveIndex < 0)
      this.setState({
        isAll: false,
        selectedSlave: -1,
        isSetBtnClose: true
      });
    else if(slaveIndex == 0)
      this.setState({
        isAll: true,
        selectedSlave: null,
        isSetBtnClose: false
      });
    else
      this.setState({
        isAll: false,
        selectedSlave: e.target.value,
        isSetBtnClose: false
      });
  };

  _checkTime = (e) => {
    // console.log(e.target.value);
    let sunriseTime = this.refs.sunrise;
    let regex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/g;
    if(e.target.value.match(regex) == null) {
      sunriseTime.setErrorText('Wrong Format');
      this.setState({
        isSetBtnClose: true
      });
      return false;
    }else{
      this.setState({
        isSetBtnClose: false
      });
      sunriseTime.setErrorText('');
    }
  };

  _switchView = (e) => {
    this.props.requestGetSlaveSchedule(this.state.selectedSlave? this.state.selectedSlave: null);
    this.props.requestGetEasySchedule(this.state.selectedSlave || 0);
    let isEasy = localStorage.getItem('HME_scheduleList_mode');
    localStorage.setItem('HME_scheduleList_mode', isEasy=='sample' ? 'pro':'sample');
    isEasy = isEasy=='sample' ? true : false;
    this.setState({
      isEasy: !this.state.isEasy
    })
  };

  _modifyLabel = (e) => {
    this.setState({

    });
  };

  render () {
    // console.log('======', this.props);
    let proSelectedSlaveIndex = parseInt(localStorage.getItem('HME_scheduleList_slaveIndex'));

    let rows = [];
    let tmpScheduleList = [];

    if(this.props.scheduleList && (this.state.selectedSlave != -1)) {
      // if(this.state.isAll) {
        this.props.scheduleList.forEach((schedule, i) => {
          // if (schedule.SlaveId == null)
            tmpScheduleList.push(schedule);
        });
      // }
      // else {
      //   this.props.scheduleList.forEach((schedule, i) => {
      //     if (schedule.SlaveId == this.state.selectedSlave)
      //       tmpScheduleList.push(schedule);
      //   });
      // }
    }
    if(tmpScheduleList) {
      tmpScheduleList.forEach((row,i) => {
        if(i == 0){
          let date;
          if(tmpScheduleList[i].StartDate)
            date = new Date(tmpScheduleList[i].StartDate);
          console.log(tmpScheduleList[i]);
          rows.push(
            <TableRow key={row.id} style={{borderBottom: '1px solid #72737A'}}>
              <TableRowColumn>
                <RaisedButton disabled={this.state.isSetBtnClose} label="EDIT" labelColor="#FFF" backgroundColor="#51A7F9" style={{verticalAlign: 'middle'}}  linkButton={true} href={`#/slave/${this.state.selectedSlave||0}/schedule/edit/${row.id}`}/>
              </TableRowColumn>
              <TableRowColumn>
                <span style={{marginTop: '16px', float: 'right'}}>▼</span>
                <TextField
                  style={{verticalAlign: 'middle'}}
                  defaultValue={moment(date).format('YYYY-MM-DD')}
                  onChange={this._handleDatePickChange}
                  type="date" />
                {/*
                <DatePicker
                  value={date || ''}
                  hintText="new"
                  autoOk={true}
                  formatDate={this._formatDate}
                  onChange={this._handleDatePickChange}
                  onShow={this._handleDateDialogOpen}
                  style={{width: '100%'}}/>
                  */}
              </TableRowColumn>
              <TableRowColumn>
                <span style={{marginTop: '16px', float: 'right'}}>▼</span>
                <TextField
                  type="number"
                  onChange={this._calculateDate.bind({}, i)}
                  value={tmpScheduleList[i].Days}
                />
              </TableRowColumn>
              {/*
              <TableRowColumn>
                <SelectField autoWidth={true} fullWidth={true} menuItems={[{payload: 1, text: '1'}]}/>
              </TableRowColumn>
              */}
            </TableRow>
          );
        }else{
          let date;
          if(tmpScheduleList[i].StartDate){
            date = new Date(tmpScheduleList[i].StartDate);
            let yyyy = date.getFullYear().toString();
            let mm = (date.getMonth()+1).toString();
            let dd  = date.getDate().toString();
            date = yyyy +'/'+ (mm[1]?mm:"0"+mm[0]) +'/'+ dd;
          }
          rows.push(
            <TableRow key={row.id} style={{borderBottom: '1px solid #72737A'}}>
              <TableRowColumn>
                <RaisedButton
                  style={{verticalAlign: 'middle'}}
                  disabled={this.state.isSetBtnClose}  label="EDIT" labelColor="#FFF" backgroundColor="#51A7F9" linkButton={true} href={`#/slave/${this.state.selectedSlave||0}/schedule/edit/${row.id}`}/>
              </TableRowColumn>
              <TableRowColumn style={{fontSize: '17px', color: '#AAA'}}>{date || ''}</TableRowColumn>
              <TableRowColumn>
                <span style={{marginTop: '16px', float: 'right'}}>▼</span>
                <TextField
                  type="number"
                  onChange={this._calculateDate.bind({}, i)}
                  value={tmpScheduleList[i].Days}
                />
              </TableRowColumn>
              {/*
              <TableRowColumn>
                <SelectField autoWidth={true} fullWidth={true} menuItems={[{payload: 1, text: '1'}]}/>
              </TableRowColumn>
              */}
            </TableRow>
          );
        }
      });
    }

    let slaveList = [{
      payload: -1,
      primary: 'Select Slave',
      text: 'Select Slave'
    },{
      payload: 0,
      primary: 'All Slave',
      text: 'All Slave'
    }];
    slaveList.push(...this.props.slaveList);
    // let isAddOpen = rows.length >= 5 ? true: false;
    let dialogActions = [
      <FlatButton
        key={'cancelButton'}
        label="Cancel"
        secondary={true}
        onTouchTap={this._warnHandleClose} />,
      <FlatButton
        key={'resetButton'}
        label="Set"
        primary={true}
        onTouchTap={this._setScheduleList} />
    ];
    let dayDialogActions = [
      <FlatButton
        label="OK"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this._dayWarnHandleClose}
      />
    ];
    let eastDate = new Date();
    let easyDiv, proDiv;
    if(this.state.isEasy){
      easyDiv = "self-center show"
      proDiv = "self-center hidden"
    }else{
      easyDiv = "self-center hidden"
      proDiv = "self-center show"
    }
    let easySchedule;
    if(this.props.easySchedule){
      easySchedule = this.props.easySchedule;
    }

    let slaveSelectFieldIndex = (this.state.selectedSlave === null)? 0 : parseInt(this.state.selectedSlave) ;

    return (
      <div className="tab-content self-center">
        <Dialog
          title="Notice"
          actions={dialogActions}
          modal={false}
          open={this.state.open}
          onRequestClose={this._warnHandleClose}>
          The actions will cover all the last schedule setting.
        </Dialog>
        <Dialog
          title="Notice"
          actions={dayDialogActions}
          modal={false}
          open={this.state.dayWarnOpen}
          onRequestClose={this._dayWarnHandleClose}>
          The actions will cover all the last schedule setting.
        </Dialog>
        <div id="easyScheduleList" className={easyDiv} style={{width: '100%', overflowX: 'hidden', minHeight: '320px'}}>
          <div className="row">
            <div className="smalllRaisedButton" style={{marginLeft: '15px', marginTop: '15px'}}>
              <SelectField labelMember="primary" iconStyle={{fill: '#000'}} onChange={this._handleSlaveSelect} menuItems={slaveList} style={{width: '160px', float: 'left'}} value={slaveSelectFieldIndex} />
              <RaisedButton label="Save" labelColor="#FFF" backgroundColor="#51A7F9" onTouchTap={this._saveEasyScheduleList} style={{width:'65px', marginLeft: '10px'}} />
              <RaisedButton ref="scheduleSetBtn" label="Summit" labelColor="#FFF" backgroundColor="#51A7F9" onTouchTap={this._warnHandleOpen} disabled={this.state.isSetBtnClose} style={{ width:'75px', marginLeft: '10px'}} />
              <RaisedButton ref="scheduleSetBtn" label="Advanced" labelColor="#FFF" backgroundColor="#51A7F9" onTouchTap={this._switchView} style={{width: '100px', marginLeft: '10px'}} />
              <RefreshIndicator
                size={30}
                left={8}
                top={5}
                status={this.props.loading || 'hide'}
                style={{display: 'inline-block', position: 'relative'}} />
            </div>
          </div>
          <div className="row">
            <div className="col-md-4 col-sm-4 col-xs-4" style={{paddingLeft:'30px', backgroundSize: 'cover', backgroundImage: 'url(/public/assets/images/spring.png)',backgroundRepeat: 'no-repeat', backgroundOrigin: 'content-box'}}>
              <p style={{marginLeft:'40px', color: 'rgb(0, 45, 119)', fontWeight: 'bold'}}> Spring </p>
              <RadioButtonGroup ref="springHours"  name="shipSpeed" valueSelected={ this.state.springHour } onChange={this._handleEditTextField.bind({}, 'springHour')} >
                <RadioButton value="12" label="12 Hours" labelStyle={{color: 'rgb(33, 97, 0)'}}/>
                <RadioButton value="18" label="18 Hours" labelStyle={{color: 'rgb(33, 97, 0)'}}/>
              </RadioButtonGroup>
                <TextField ref="springDay" hintText="Days" min={0} max={9999} type="number" style={{width: '50px', marginLeft:'40px'}} value={this.state.springDays} onChange={this._handleEditTextField.bind({},　'springDays')}　/>
            </div>
            <div className="col-md-4 col-sm-4 col-xs-4"  style={{paddingLeft:'30px', backgroundSize: 'cover', backgroundImage: 'url(/public/assets/images/summer.png)',backgroundRepeat: 'no-repeat', backgroundOrigin: 'content-box'}}>
              <p style={{marginLeft:'40px', color: 'rgb(0, 45, 119)', fontWeight: 'bold'}}> Summer </p>
              <RadioButtonGroup ref="summerHours" name="shipSpeed" valueSelected={ this.state.summerHour }  onChange={this._handleEditTextField.bind({}, 'summerHour')}>
                <RadioButton value="18" label="18 Hours" labelStyle={{color: 'rgb(33, 97, 0)'}}/>
                <RadioButton value="24" label="24 Hours" labelStyle={{color: 'rgb(33, 97, 0)'}}/>
              </RadioButtonGroup>
                <TextField ref="summerDay" hintText="Days" min={0} max={9999} type="number" style={{width: '50px', marginLeft:'40px'}} value={this.state.summerDays} onChange={this._handleEditTextField.bind({},　'summerDays')}　/>
            </div>
            <div className="col-md-4 col-sm-4 col-xs-4"  style={{paddingLeft:'30px', backgroundSize: 'cover', backgroundImage: 'url(/public/assets/images/fall.png)',backgroundRepeat: 'no-repeat', backgroundOrigin: 'content-box'}}>
              <p style={{marginLeft:'40px', color: 'rgb(0, 45, 119)', fontWeight: 'bold'}}> Fall </p>
              <RadioButtonGroup ref="fallHours" name="shipSpeed" valueSelected={ this.state.fallHour }  onChange={this._handleEditTextField.bind({}, 'fallHour')} >
                <RadioButton value="12" label="12 Hours" labelStyle={{color: 'rgb(33, 97, 0)'}}/>
                <RadioButton value="14" label="14 Hours" labelStyle={{color: 'rgb(33, 97, 0)'}}/>
              </RadioButtonGroup>
                <TextField ref="fallDay" hintText="Days" min={0} max={9999} type="number" style={{width: '50px', marginLeft:'40px'}} value={this.state.fallDays} onChange={this._handleEditTextField.bind({},　'fallDays')}　/>
            </div>
          </div>
          <div className="row">
            <div style={{marginLeft: '30px'}}>
              <TextField ref="easyStartDate" floatingLabelText="Start Date" value={moment(this.state.simpleStartDate).format('YYYY-MM-DD')} type="date" style={{width: '200px', marginLeft:'10px'}} onChange={this._handleEditTextField.bind({}, 'simpleStartDate')} />
              {/*<TextField ref="sunrise" floatingLabelText="Sunrise" onChange={this._checkTime} defaultValue={moment().format("HH:DD")} style={{width: '200px', marginLeft:'10px'}}/>*/}
              <TextField ref="easyStartTime" floatingLabelText="Sunrise" type="time" value={this.state.simpleSunriseTime} style={{width: '200px', marginLeft:'10px'}} onChange={this._handleEditTextField.bind({}, 'simpleSunriseTime')} />
            </div>
          </div>
          <Snackbar
            ref="snackbar"
            open={false}
            onRequestClose={this._handleRequestClose}
            message={"Has changed, need to be save"}
            autoHideDuration={10000}
          />
        </div>
        <div id="scheduleList" className={proDiv} style={{width: '100%', overflowX: 'hidden', minHeight: '320px'}}>
          <div className="row justify-content">
            <div className="row schedule-detail-pro" style={{marginTop: '15px'}}>
              <div className="smalllRaisedButton" >
                <SelectField labelMember="primary" iconStyle={{fill: '#000'}} onChange={this._handleSlaveSelect} menuItems={slaveList} style={{width: '150px'}} value={slaveSelectFieldIndex} />
              </div>
              <div className="smalllRaisedButton">
              {/*
                <RaisedButton label="Slave" disabled={this.state.isGroup} onTouchTap={this._groupScheduleBtn} secondary={true} style={{marginLeft: '15px'}} />
                <RaisedButton label="ALL" disabled={this.state.isAll} onTouchTap={this._allScheduleBtn} secondary={true} style={{marginLeft: '15px'}}/>
              */}
              <RaisedButton ref="scheduleAddBtn" label="Add" labelColor="#FFF" backgroundColor="#51A7F9" disabled={(this.state.selectedSlave == -1)} onTouchTap={this._addRow} style={{width:'50px',marginLeft: '10px'}}/>
              <RaisedButton ref="scheduleAddBtn" label="Del" labelColor="#FFF" backgroundColor="#51A7F9" disabled={(this.state.selectedSlave == -1)} onTouchTap={this._deleteLastRow} style={{width:'50px',marginLeft: '10px'}}/>
              <RaisedButton label="Save" labelColor="#FFF" backgroundColor="#51A7F9" onTouchTap={this._saveScheduleList} style={{width:'50px',marginLeft: '10px'}} disabled={(this.state.selectedSlave == -1)} />
              <RaisedButton ref="scheduleSetBtn" label="Summit" labelColor="#FFF" backgroundColor="#51A7F9" onTouchTap={this._warnHandleOpen} disabled={this.state.isSetBtnClose || (this.state.selectedSlave == -1)} style={{width:'60px', marginLeft: '10px'}} />
              <RaisedButton ref="scheduleSetBtn" label="Basic" labelColor="#FFF" backgroundColor="#51A7F9" onTouchTap={this._switchView} style={{width:'60px', marginLeft: '10px'}} />
              <RefreshIndicator
                size={30}
                left={8}
                top={2}
                status={this.props.loading || 'hide'}
                style={{display: 'inline-block',
                        position: 'relative'}} />
                </div>
          </div>
          </div>
          <Table selectable={false} style={{backgroundColor: 'rgba(0,0,0,0)'}}>
            <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
              <TableRow style={{borderBottom: '1px solid #72737A'}}>
                <TableHeaderColumn style={{fontSize: '16px', color: '#000'}}>Edit</TableHeaderColumn>
                <TableHeaderColumn style={{fontSize: '16px', color: '#000'}}>Start Date</TableHeaderColumn>
                <TableHeaderColumn style={{fontSize: '16px', color: '#000'}}>Days</TableHeaderColumn>
                {/*
                  <TableHeaderColumn >Grouping setting</TableHeaderColumn>
                */}
              </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={false} style={{height: '500px'}}>
              {rows}
            </TableBody>
          </Table>
          <Snackbar
            ref="snackbar"
            open={false}
            onRequestClose={this._handleRequestClose}
            message={"Has changed, need to be save"}
            autoHideDuration={3000}
          />
        </div>
      </div>
    );
  };
}

function _injectPropsFromStore(state) {
  // let { login, isLoading } = state;
  let {schedule, scanDevice} = state;
  let scanResult = [],
      slaveList = [];
  if(scanDevice.slaveList) {
    for(let slave of scanDevice.slaveList) {
      slaveList.push({
        payload: slave.id,
        primary: `${slave.host}`,
        text: slave.host.split('.local'),
      });
    }
  }

  return {
    scheduleList: schedule.scheduleList,
    slaveList: slaveList,
    loading: schedule.loading ? schedule.loading : 'hide',
    easySchedule: schedule.easySchedule
  };
}

const _injectPropsFromActions = {
  requestGetScheduleList,
  requestScheduleCreate,
  updateScheduleFirstDate,
  updateScheduleDay,
  requestUpdateScheduleList,
  requestGetCachedSlaveList,
  requestSetScheduleList,
  requestGetSlaveSchedule,
  requestGetEasySchedule,
  requestUpdateEasyScheduleList,
  requestScheduleDeleteLast,
}

export default connect(_injectPropsFromStore, _injectPropsFromActions)(ScheduleList);
