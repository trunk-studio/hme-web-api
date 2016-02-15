import React from 'react';
import {connect} from 'react-redux'
import { requestScheduleCreate, requestGetScheduleList,
   updateScheduleFirstDate, updateScheduleDay,
   requestSetScheduleList,requestGetSlaveSchedule,
   requestUpdateScheduleList,requestGetEasySchedule,
   requestUpdateEasyScheduleList
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
      isSetBtnClose: false,
      scheduleDate: [],
      muiTheme: ThemeManager.getMuiTheme(LightRawTheme),
      isAll: false,
      isGroup: true,
      selectedSlave: 0,
      open: false,
      isEasy: true,
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
    this.props.requestGetCachedSlaveList();
    // this.props.requestGetScheduleList();
  };

  componentDidUpdate(prevProps, prevState) {
  };

  _warnHandleOpen = () => {
    if(!this.state.selectedSlave){
      this.setState({open: true});
    }
  };

  _warnHandleClose = () => {
    this.setState({open: false});
  };

  _addRow = (e) => {
    this.props.requestScheduleCreate(this.props.scheduleList, this.state.selectedSlave);
    this.setState({
      isSetBtnClose: true
    });
    this.refs.snackbar.setState({open: true});
  };

  _saveScheduleList = (e) => {
    this.props.requestUpdateScheduleList(this.props.scheduleList);
    this.setState({
      isSetBtnClose: false
    });
    this.refs.snackbar.setState({open: false});
  };

  _saveEasyScheduleList = (e) => {
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
    this.setState({
      isSetBtnClose: false
    });
    this.refs.snackbar.setState({open: false});
  };

  _setScheduleList = (e) => {
    this._warnHandleClose()
    let slaveId = this.state.selectedSlave || 0 ;
    console.log(slaveId);
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
    if(parseInt(value, 10) > 9999)
      value = 9999;
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
    if(selectedIndex > 0) {
      console.log("!!!!!!!!!!!!!!!!",e.target.value);
      if(this.state.isEasy){
        this.props.requestGetEasySchedule(e.target.value || 0);
      }else{
        this.props.requestGetSlaveSchedule(e.target.value);
      }
    }

    if(selectedIndex == 0)
      this.setState({
        isAll: false,
        selectedSlave: 0
      });
    else
      this.setState({
        isAll: (selectedIndex == 1)? true : false,
        selectedSlave: (selectedIndex == 1)? null : e.target.value
      });
  };
  _checkTime = (e) => {
    console.log(e.target.value);
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

  _useProView = (e) => {
    this.setState({
      isEasy: !this.state.isEasy
    })
  };

  render () {
    let rows = [];
    let tmpScheduleList = [];

    if(this.props.scheduleList) {
      if(this.state.isAll) {
        this.props.scheduleList.forEach((schedule, i) => {
          if (schedule.SlaveId == null)
            tmpScheduleList.push(schedule);
        });
      }
      else {
        this.props.scheduleList.forEach((schedule, i) => {
          if (schedule.SlaveId == this.state.selectedSlave)
            tmpScheduleList.push(schedule);
        });
      }
    }
    if(tmpScheduleList) {
      tmpScheduleList.forEach((row,i) => {
        if(i == 0){
          let date;
          if(tmpScheduleList[i].StartDate)
            date = new Date(tmpScheduleList[i].StartDate);
          rows.push(
            <TableRow key={row.id} style={{borderBottom: '1px solid #72737A'}}>
              <TableRowColumn>
                <RaisedButton disabled={this.state.isSetBtnClose} label="EDIT" style={{verticalAlign: 'middle'}}  linkButton={true} href={`#/schedule/${this.state.selectedSlave||0}/edit/${row.id}`}/>
              </TableRowColumn>
              <TableRowColumn>
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
                <TextField
                  type="number"
                  onChange={this._calculateDate.bind({}, i)}
                  defaultValue={tmpScheduleList[i].Days}
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
                  disabled={this.state.isSetBtnClose}  label="EDIT" linkButton={true} href={`#/schedule/${this.state.selectedSlave||0}/edit/${row.id}`}/>
              </TableRowColumn>
              <TableRowColumn style={{fontSize: '17px', color: '#AAA'}}>{date || ''}</TableRowColumn>
              <TableRowColumn>
                <TextField
                  type="number"
                  onChange={this._calculateDate.bind({}, i)}
                  defaultValue={tmpScheduleList[i].Days}
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
      payload: null,
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
    return (
      <div className="tab-content self-center">
        <Dialog
          title="Warning"
          actions={dialogActions}
          modal={false}
          open={this.state.open}
          onRequestClose={this._warnHandleClose}>
          The actions will cover all the last schedule setting.
        </Dialog>
        <div id="easyScheduleList" className={easyDiv} style={{width: '100%', overflowX: 'hidden', minHeight: '320px'}}>
          <div className="row">
            <div className="smalllRaisedBnutton" style={{marginLeft: '30px', marginTop: '15px'}}>
              <SelectField labelMember="primary" iconStyle={{fill: '#000'}} onChange={this._handleSlaveSelect} disabled={this.state.isSetBtnClose} menuItems={slaveList} style={{width: '200px', float: 'left'}}/>
              <RaisedButton label="Save" labelColor="#FFF" backgroundColor="#51A7F9" onTouchTap={this._saveEasyScheduleList} style={{width:'75px', marginLeft: '10px'}} disabled={( this.state.isSetBtnClose ||  this.state.selectedSlave == 0)} />
              <RaisedButton ref="scheduleSetBtn" label="Summit" labelColor="#FFF" backgroundColor="#51A7F9" onTouchTap={this._warnHandleOpen} disabled={this.state.isSetBtnClose || (this.state.selectedSlave == 0)} style={{ width:'75px', marginLeft: '10px'}} />
              <RaisedButton ref="scheduleSetBtn" label="Pro" labelColor="#FFF" backgroundColor="#51A7F9" onTouchTap={this._useProView} style={{width:'75px', marginLeft: '10px'}} />
              <RefreshIndicator
                size={30}
                left={8}
                top={5}
                status={this.props.loading || 'hide'}
                style={{display: 'inline-block', position: 'relative'}} />
            </div>
          </div>
          <div className="row">
            <div className="col-md-4 col-sm-4 col-xs-4" style={{paddingLeft:'30px'}}>
              <p style={{marginLeft:'40px'}}> Spring </p>
              <RadioButtonGroup ref="springHours"  name="shipSpeed" defaultSelected="12">
                <RadioButton value="12" label="12 Hours" />
                <RadioButton value="18" label="18 Hours" />
              </RadioButtonGroup>
                <TextField ref="springDay"  hintText="Days" type="number" style={{width: '50px', marginLeft:'40px'}}/>
            </div>
            <div className="col-md-4 col-sm-4 col-xs-4"  style={{paddingLeft:'30px'}}>
              <p style={{marginLeft:'40px'}}> Summer </p>
              <RadioButtonGroup ref="summerHours" name="shipSpeed" defaultSelected="24">
                <RadioButton value="18" label="18 Hours" />
                <RadioButton value="24" label="24 Hours" />
              </RadioButtonGroup>
                <TextField ref="summerDay" hintText="Days" type="number" style={{width: '50px', marginLeft:'40px'}}/>
            </div>
            <div className="col-md-4 col-sm-4 col-xs-4"  style={{paddingLeft:'30px'}}>
              <p style={{marginLeft:'40px'}}> Fall </p>
              <RadioButtonGroup ref="fallHours" name="shipSpeed" defaultSelected="12">
                <RadioButton value="12" label="12 Hours" />
                <RadioButton value="14" label="14 Hours" />
              </RadioButtonGroup>
                <TextField ref="fallDay" hintText="Days" type="number" style={{width: '50px', marginLeft:'40px'}}/>
            </div>
          </div>
          <div className="row">
            <div style={{marginLeft: '30px', display: 'inline-flex'}}>
              <TextField ref="easyStartDate" floatingLabelText="Start Time" defaultValue={moment(eastDate).format('YYYY-MM-DD')} onChange={this._handleDatePickChange} type="date" style={{width: '200px', marginLeft:'10px'}}/>
              {/*<TextField ref="sunrise" floatingLabelText="Sunrise" onChange={this._checkTime} defaultValue={moment().format("HH:DD")} style={{width: '200px', marginLeft:'10px'}}/>*/}
              <TextField ref="easyStartTime" floatingLabelText="Sunrise" type="time" defaultValue={moment().format("HH:DD")} style={{width: '200px', marginLeft:'10px'}}/>
            </div>
          </div>
          <Snackbar
            ref="snackbar"
            open={false}
            onRequestClose={this._handleRequestClose}
            message={"已更改, 需要儲存"}
            autoHideDuration={3000}
          />
        </div>
        <div id="scheduleList" className={proDiv} style={{width: '100%', overflowX: 'hidden', minHeight: '320px'}}>
          <div className="row justify-content">
            <div className="smalllRaisedBnutton" style={{marginLeft: '-3px', marginTop: '15px'}}>
              <SelectField labelMember="primary" iconStyle={{fill: '#000'}} onChange={this._handleSlaveSelect} disabled={this.state.isSetBtnClose} menuItems={slaveList} style={{width: '160px', float: 'left'}}/>
              {/*
                <RaisedButton label="Slave" disabled={this.state.isGroup} onTouchTap={this._groupScheduleBtn} secondary={true} style={{marginLeft: '15px'}} />
                <RaisedButton label="ALL" disabled={this.state.isAll} onTouchTap={this._allScheduleBtn} secondary={true} style={{marginLeft: '15px'}}/>
              */}
              <RaisedButton ref="scheduleAddBtn" label="ADD" labelColor="#FFF" backgroundColor="#51A7F9" disabled={(this.state.selectedSlave == 0)} onTouchTap={this._addRow} style={{width:'60px',marginLeft: '10px'}}/>
              <RaisedButton label="Save" labelColor="#FFF" backgroundColor="#51A7F9" onTouchTap={this._saveScheduleList} style={{width:'70px',marginLeft: '5px'}} disabled={(this.state.selectedSlave == 0)} />
              <RaisedButton ref="scheduleSetBtn" label="Summit" labelColor="#FFF" backgroundColor="#51A7F9" onTouchTap={this._warnHandleOpen} disabled={this.state.isSetBtnClose || (this.state.selectedSlave == 0)} style={{width:'80px', marginLeft: '5px'}} />
              <RaisedButton ref="scheduleSetBtn" label="Simple" labelColor="#FFF" backgroundColor="#51A7F9" onTouchTap={this._useProView} style={{width:'70px', marginLeft: '5px'}} />
              <RefreshIndicator
                size={30}
                left={8}
                top={2}
                status={this.props.loading || 'hide'}
                style={{display: 'inline-block',
                        position: 'relative'}} />
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
            message={"已更改, 需要儲存"}
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
        text: slave.host,
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
  requestUpdateEasyScheduleList
}

export default connect(_injectPropsFromStore, _injectPropsFromActions)(ScheduleList);
