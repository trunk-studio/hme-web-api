import React from 'react';
import {connect} from 'react-redux'
import { requestScheduleCreate, requestGetScheduleList,
   updateScheduleFirstDate, updateScheduleDay,
   requestUpdateScheduleList} from '../actions/ScheduleListActions'
const RaisedButton = require('material-ui/lib/raised-button');
const SelectField = require('material-ui/lib/select-field');
const MenuItem = require('material-ui/lib/menus/menu-item');
const TextField = require('material-ui/lib/text-field');
const Tabs = require('material-ui/lib/tabs/tabs');
const Tab = require('material-ui/lib/tabs/tab');
const RefreshIndicator = require('material-ui/lib/refresh-indicator');
const DatePicker = require('material-ui/lib/date-picker/date-picker');
const DatePickerDialog = require('material-ui/lib/date-picker/date-picker-dialog');
const RadioButton = require('material-ui/lib/radio-button');
const RadioButtonGroup = require('material-ui/lib/radio-button-group');
const Table = require('material-ui/lib/table/table');
const TableBody = require('material-ui/lib/table/table-body');
const TableFooter = require('material-ui/lib/table/table-footer');
const TableHeader = require('material-ui/lib/table/table-header');
const TableHeaderColumn = require('material-ui/lib/table/table-header-column');
const TableRow = require('material-ui/lib/table/table-row');
const TableRowColumn = require('material-ui/lib/table/table-row-column');
const Snackbar = require('material-ui/lib/snackbar');

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
      isGroup: true
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
    this.props.requestGetScheduleList();
  };

  componentDidUpdate(prevProps, prevState) {
  };

  _addRow = (e) => {
    this.props.requestScheduleCreate(this.props.scheduleList);
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
    date = new Date(date);
    let day = date.getDate();
    let monthIndex = date.getMonth();
    let year = date.getFullYear();
    return year + '/'+ monthIndex+1 +'/' + day;
  };

  _calculateDate = (i,e) => {
    let value = e.target.value;
    if(parseInt(value, 10) > 9999)
      value = 9999;
    this.props.updateScheduleDay(value,i)
    this.setState({
      isSetBtnClose: true
    })
    this.refs.snackbar.setState({open: true});
  };

  _handleDatePickChange = (event, date) => {
    this.props.updateScheduleFirstDate(date);
    this.props.updateScheduleDay()
    this.setState({
      isSetBtnClose: true
    })
    this.refs.snackbar.setState({open: true});
  };

  _handleRequestClose = (e) => {
    this.refs.snackbar.setState({open: false});
  };

  _allScheduleBtn = (e) =>{
    this.setState({isAll: true, isGroup: false});
  };

  _groupScheduleBtn = (e) =>{
    this.setState({isAll: false, isGroup: true});
  };

  render () {
    let rows = [];
    if(this.props.scheduleList){
      this.props.scheduleList.forEach((row,i) => {
        if(i == 0){
          let date
          if(this.props.scheduleList[i].StartDate)
            date = new Date(this.props.scheduleList[i].StartDate);
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
                  onChange={this._calculateDate.bind(this,i)}
                  value={this.props.scheduleList[i].Days}
                />
              </TableRowColumn>
              <TableRowColumn>
                <SelectField autoWidth={true} fullWidth={true} menuItems={[{payload: 1, text: '1'}]}/>
              </TableRowColumn>
            </TableRow>
          );
        }else{
          let date;
          if(this.props.scheduleList[i].StartDate){
            date = new Date(this.props.scheduleList[i].StartDate);
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
                  onChange={this._calculateDate.bind(this,i)}
                  value={this.props.scheduleList[i].Days}
                />
              </TableRowColumn>
              <TableRowColumn>
                <SelectField autoWidth={true} fullWidth={true} menuItems={[{payload: 1, text: '1'}]}/>
              </TableRowColumn>
            </TableRow>
          );
        }
      });
    }
    // let isAddOpen = rows.length >= 5 ? true: false;
    return (
      <div id="scheduleList" className="self-center" style={{width: '100%'}}>
        <div className="row">
          <div style={{marginLeft: '30px', marginTop: '15px'}}>
            <RaisedButton label="Group" disabled={this.state.isGroup} onTouchTap={this._groupScheduleBtn} secondary={true} style={{marginLeft: '15px'}} />
            <RaisedButton label="ALL" disabled={this.state.isAll} onTouchTap={this._allScheduleBtn} secondary={true} style={{marginLeft: '15px'}}/>
            <RaisedButton ref="scheduleAddBtn" label="Add" primary={true} disabled={false} onTouchTap={this._addRow} style={{marginLeft: '15px'}}/>
            <RaisedButton label="Save" primary={true} onTouchTap={this._saveScheduleList} style={{marginLeft: '15px'}} />
            <RaisedButton ref="scheduleSetBtn" label="Set" onTouchTap={this._setScheduleList} disabled={this.state.isSetBtnClose} style={{marginLeft: '15px'}} />
          </div>
        </div>
        <Table selectable={false}>
          <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
            <TableRow>
              <TableHeaderColumn >Edit</TableHeaderColumn>
              <TableHeaderColumn >Start Date</TableHeaderColumn>
              <TableHeaderColumn >Days</TableHeaderColumn>
              <TableHeaderColumn >Grouping setting</TableHeaderColumn>
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
  let {schedule} = state;
  return {
    scheduleList: schedule.scheduleList
  };
}

const _injectPropsFromActions = {
  requestGetScheduleList,
  requestScheduleCreate,
  updateScheduleFirstDate,
  updateScheduleDay,
  requestUpdateScheduleList
}

export default connect(_injectPropsFromStore, _injectPropsFromActions)(ScheduleList);
