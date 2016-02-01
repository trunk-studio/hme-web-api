import React from 'react';
import {connect} from 'react-redux'
import { requestScheduleCreate, requestGetScheduleList,
   updateScheduleFirstDate, updateScheduleDay,
   requestSetScheduleList,requestGetSlaveSchedule,
   requestUpdateScheduleList
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
      open: false
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
      console.log(e.target.value);
      this.props.requestGetSlaveSchedule(e.target.value);
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
            <TableRow key={row.id}>
              <TableRowColumn>
                <RaisedButton disabled={this.state.isSetBtnClose}  label="EDIT" linkButton={true} href={`#/schedule/${this.state.selectedSlave||0}/edit/${row.id}`}/>
              </TableRowColumn>
              <TableRowColumn>
                <TextField
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
            <TableRow key={row.id}>
              <TableRowColumn>
                <RaisedButton disabled={this.state.isSetBtnClose}  label="EDIT" linkButton={true} href={`#/schedule/${this.state.selectedSlave||0}/edit/${row.id}`}/>
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
    return (
      <div>
        <Dialog
          title="Warning"
          actions={dialogActions}
          modal={false}
          open={this.state.open}
          onRequestClose={this._warnHandleClose}>
          The actions will clean all slave schedule.
        </Dialog>
        <div id="easyScheduleList" className="self-center" style={{width: '100%', overflowX: 'hidden', minHeight: '320px'}}>
          <div className="row">
            <div style={{marginLeft: '30px', marginTop: '15px', display: 'inline-flex'}}>
              <SelectField labelMember="primary" onChange={this._handleSlaveSelect} disabled={this.state.isSetBtnClose} menuItems={slaveList} style={{width: '200px'}}/>
              <RaisedButton label="Save" primary={true} onTouchTap={this._saveScheduleList} style={{marginLeft: '15px'}} disabled={( this.state.isSetBtnClose ||  this.state.selectedSlave == 0)} />
              <RaisedButton ref="scheduleSetBtn" label="Set" onTouchTap={this._warnHandleOpen} disabled={this.state.isSetBtnClose || (this.state.selectedSlave == 0)} style={{marginLeft: '15px'}} />
              <RefreshIndicator
                size={30}
                left={8}
                top={2}
                status={this.props.loading || 'hide'}
                style={{display: 'inline-block', position: 'relative'}} />
            </div>
          </div>
          <div className="row">
            <div className="col-md-4 col-sm-4 col-xs-4">
              <p style={{marginLeft:'40px'}}> Spring </p>
              <RadioButtonGroup name="shipSpeed" defaultSelected="12">
                <RadioButton value="12" label="12 Hours" />
                <RadioButton value="18" label="18 Hours" />
              </RadioButtonGroup>
              <TextField ref="sunrise" hintText="Days" type="number" style={{width: '50px', marginLeft:'40px'}}/>
            </div>
            <div className="col-md-4 col-sm-4 col-xs-4">
              <p style={{marginLeft:'40px'}}> Summer </p>
              <RadioButtonGroup name="shipSpeed" defaultSelected="18">
                <RadioButton value="18" label="18 Hours" />
                <RadioButton value="24" label="24 Hours" />
              </RadioButtonGroup>
              <TextField ref="sunrise" hintText="Days" type="number" style={{width: '50px', marginLeft:'40px'}}/>
            </div>
            <div className="col-md-4 col-sm-4 col-xs-4">
              <p style={{marginLeft:'40px'}}> Fall </p>
              <RadioButtonGroup name="shipSpeed" defaultSelected="12">
                <RadioButton value="12" label="12 Hours" />
                <RadioButton value="14" label="14 Hours" />
              </RadioButtonGroup>
              <TextField ref="sunrise" hintText="Days" type="number" style={{width: '50px', marginLeft:'40px'}}/>
            </div>
          </div>
          <div className="row">
            <div style={{marginLeft: '30px', display: 'inline-flex'}}>
              <TextField floatingLabelText="Start Time" defaultValue={moment(eastDate).format('YYYY-MM-DD')} onChange={this._handleDatePickChange} type="date" style={{width: '200px', marginLeft:'10px'}}/>
              <TextField ref="sunrise" floatingLabelText="Sunrise" onChange={this._checkTime} defaultValue={moment().format("HH:DD")} style={{width: '200px', marginLeft:'10px'}}/>
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
        <div id="scheduleList" className="self-center" style={{width: '100%', overflowX: 'hidden', minHeight: '320px'}}>
          <div className="row">
            <div style={{marginLeft: '30px', marginTop: '15px', display: 'inline-flex'}}>
              <SelectField labelMember="primary" onChange={this._handleSlaveSelect} disabled={this.state.isSetBtnClose} menuItems={slaveList} style={{width: '200px'}}/>
              {/*
                <RaisedButton label="Slave" disabled={this.state.isGroup} onTouchTap={this._groupScheduleBtn} secondary={true} style={{marginLeft: '15px'}} />
                <RaisedButton label="ALL" disabled={this.state.isAll} onTouchTap={this._allScheduleBtn} secondary={true} style={{marginLeft: '15px'}}/>
              */}
              <RaisedButton ref="scheduleAddBtn" label="ADD" primary={true} disabled={(this.state.selectedSlave == 0)} onTouchTap={this._addRow} style={{marginLeft: '15px'}}/>
              <RaisedButton label="Save" primary={true} onTouchTap={this._saveScheduleList} style={{marginLeft: '15px'}} disabled={(this.state.selectedSlave == 0)} />
              <RaisedButton ref="scheduleSetBtn" label="Set" onTouchTap={this._warnHandleOpen} disabled={this.state.isSetBtnClose || (this.state.selectedSlave == 0)} style={{marginLeft: '15px'}} />
              <RefreshIndicator
                size={30}
                left={8}
                top={2}
                status={this.props.loading || 'hide'}
                style={{display: 'inline-block',
                        position: 'relative'}} />
          </div>
          </div>
          <Table selectable={false}>
            <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
              <TableRow>
                <TableHeaderColumn >Edit</TableHeaderColumn>
                <TableHeaderColumn >Start Date</TableHeaderColumn>
                <TableHeaderColumn >Days</TableHeaderColumn>
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
    loading: schedule.loading ? schedule.loading : 'hide'
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
  requestGetSlaveSchedule
}

export default connect(_injectPropsFromStore, _injectPropsFromActions)(ScheduleList);
