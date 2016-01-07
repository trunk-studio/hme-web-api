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

export default class ScheduleList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isSetBtnClose: true,
      scheduleDate: []
    };
  }

  componentDidMount () {
    this.props.requestGetScheduleList();
  }

  componentDidUpdate(prevProps, prevState) {
  }

  _addRow = (e) => {
    this.props.requestScheduleCreate();
    this.setState({
      isSetBtnClose: true
    });
  }

  _saveScheduleList = (e) => {
    this.props.requestUpdateScheduleList(this.props.scheduleList);
    this.setState({
      isSetBtnClose: false
    });
  }

  _setScheduleList = (e) => {
    this.setState({
      isSetBtnClose: true
    })
  }

  _formatDate = (date) => {
    date = new Date(date);
    let day = date.getDate();
    let monthIndex = date.getMonth();
    let year = date.getFullYear();
    return year + '/'+ monthIndex+1 +'/' + day;
  }

  _calculateDate = (i,e) => {
    this.props.updateScheduleDay(e.target.value,i)
    this.setState({
      isSetBtnClose: true
    })
  }

  _handleDatePickChange = (event, date) => {
    this.props.updateScheduleFirstDate(date);
    this.props.updateScheduleDay()
    this.setState({
      isSetBtnClose: true
    })
  }

  render () {
    let rows = [];
    if(this.props.scheduleList){
      this.props.scheduleList.forEach((row,i) => {
        if(i == 0){
          rows.push(
            <TableRow key={row.id}>
              <TableRowColumn>
                <RaisedButton disabled={this.state.isSetBtnClose}  label="EDIT" linkButton={true} href={`#/schedule/edit/${row.id}`}/>
              </TableRowColumn>
              <TableRowColumn>
                <DatePicker
                  value={this.props.scheduleList[i].StartDate}
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
          rows.push(
            <TableRow key={row.id}>
              <TableRowColumn>
                <RaisedButton disabled={this.state.isSetBtnClose}  label="EDIT" linkButton={true} href={`#/schedule/edit/${row.id}`}/>
              </TableRowColumn>
              <TableRowColumn style={{fontSize: '17px'}}>{this.props.scheduleList[i].StartDate}</TableRowColumn>
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
      <div className="self-center" style={{width: '100%'}}>
        <div className="row" style={{marginLeft: '30px', marginTop: '15px'}}>
          <RaisedButton ref="scheduleAddBtn" label="Add" disabled={false} onTouchTap={this._addRow} style={{marginLeft: '15px'}}/>
          <RaisedButton label="Save" onTouchTap={this._saveScheduleList} style={{marginLeft: '15px'}} />
          <RaisedButton ref="scheduleSetBtn" onTouchTap={this._setScheduleList} label="Set" disabled={this.state.isSetBtnClose} style={{marginLeft: '15px'}} />
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
      </div>
    );
  }
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
