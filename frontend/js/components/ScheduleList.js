import React from 'react';
import {connect} from 'react-redux'
import { requestCreate, requestGetList} from '../actions/ScheduleListActions'

const RaisedButton = require('material-ui/lib/raised-button');
const SelectField = require('material-ui/lib/select-field');
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
  }

  componentDidMount () {
    this.props.requestGetList();
  }

  componentDidUpdate(prevProps, prevState) {
  }

  _addRow = (e) => {
    this.props.requestCreate();
  }

  render () {
    let rows = [];
    if(this.props.scheduleList){
      this.props.scheduleList.forEach((row,i) => {
        rows.push(
          <TableRow key={row.id}>
            <TableRowColumn>
              <RaisedButton label="EDIT" linkButton={true} href={`#/schedule/edit/${row.id}`}/>
            </TableRowColumn>
            <TableRowColumn>{row.startDate || 'new'}</TableRowColumn>
            <TableRowColumn>{row.days || 'new'}</TableRowColumn>
          </TableRow>
        );
      });
    }
    return (
      <div className="self-center" style={{width: '100%'}}>
        <RaisedButton label="Add" onTouchTap={this._addRow} style={{marginLeft:'80%', marginTop: '15px'}} />
        <Table>
          <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
            <TableRow>
              <TableHeaderColumn >Edit</TableHeaderColumn>
              <TableHeaderColumn >Start Date</TableHeaderColumn>
              <TableHeaderColumn >Days</TableHeaderColumn>
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
  console.log("_injectPropsFromStore!!",state);
  let {schedule} = state;
  return {
    scheduleList: schedule.scheduleList
  };
}

const _injectPropsFromActions = {
  requestGetList,
  requestCreate
}

export default connect(_injectPropsFromStore, _injectPropsFormActions)(ScheduleList);
