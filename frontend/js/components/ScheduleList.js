import React from 'react';
import {connect} from 'react-redux'
import { requestScheduleCreate, requestGetScheduleList,
   updateScheduleFirstDate, updateScheduleDay,
   requestUpdateScheduleList, requestGetSlaveSchedule} from '../actions/ScheduleListActions'
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
   DatePicker,
   DatePickerDialog,
   RadioButton,
   RadioButtonGroup,
   Table,
   TableBody,
   TableFooter,
   TableHeader,
   TableHeaderColumn,
   TableRow,
   TableRowColumn,
   Snackbar
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
      selectedSlave: 0
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
    console.log('id', i);
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

  _handleDatePickChange = (event, date) => {
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
                <RaisedButton disabled={this.state.isSetBtnClose}  label="EDIT" linkButton={true} href={`#/schedule/edit/${row.id}`}/>
              </TableRowColumn>
              <TableRowColumn>
                <DatePicker
                  value={date || ''}
                  hintText="new"
                  autoOk={true}
                  mode="landscape"
                  formatDate={this._formatDate}
                  onChange={this._handleDatePickChange}
                  style={{width: '50px'}}/>
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
                <RaisedButton disabled={this.state.isSetBtnClose}  label="EDIT" linkButton={true} href={`#/schedule/edit/${row.id}`}/>
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
    return (
      <div id="scheduleList" className="self-center" style={{width: '100%', overflowX: 'hidden', minHeight: '320px'}}>
        <div className="row">
          <div style={{marginLeft: '30px', marginTop: '15px', display: 'inline-flex'}}>
            <SelectField labelMember="primary" onChange={this._handleSlaveSelect} menuItems={slaveList} style={{width: '220px'}}/>
            {/*
              <RaisedButton label="Slave" disabled={this.state.isGroup} onTouchTap={this._groupScheduleBtn} secondary={true} style={{marginLeft: '15px'}} />
              <RaisedButton label="ALL" disabled={this.state.isAll} onTouchTap={this._allScheduleBtn} secondary={true} style={{marginLeft: '15px'}}/>
            */}
            <RaisedButton ref="scheduleAddBtn" label="Add" primary={true} disabled={(this.state.selectedSlave == 0)} onTouchTap={this._addRow} style={{marginLeft: '15px'}}/>
            <RaisedButton label="Save" primary={true} onTouchTap={this._saveScheduleList} style={{marginLeft: '15px'}} disabled={(this.state.selectedSlave == 0)} />
            <RaisedButton ref="scheduleSetBtn" label="Set" onTouchTap={this._setScheduleList} disabled={this.state.isSetBtnClose} style={{marginLeft: '15px'}} />
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
          <TableBody displayRowCheckbox={false}>
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
    slaveList: slaveList
  };
}

const _injectPropsFromActions = {
  requestGetScheduleList,
  requestScheduleCreate,
  updateScheduleFirstDate,
  updateScheduleDay,
  requestUpdateScheduleList,
  requestGetCachedSlaveList,
  requestGetSlaveSchedule
}

export default connect(_injectPropsFromStore, _injectPropsFromActions)(ScheduleList);
