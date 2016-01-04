import React from 'react';
import {connect} from 'react-redux'
import { requestCreate, receivedCreate,
         requestGetList, receivedGetList} from '../actions/ScheduleListActions'

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
    // this.props.requestGetList();
    // this.state = this.props.schedule;
    // {
    //   schedule: [
    //     {
    //       startDate: '1/12/2015',
    //       days: '1'
    //     }, {
    //       startDate: '2/12/2015',
    //       days: '2'
    //     }, {
    //       startDate: '3/12/2015',
    //       days: '3'
    //     }
    //   ]
    // }
  }

  componentDidMount () {
    this.props.requestGetList();
  }

  componentDidUpdate(prevProps, prevState) {
      console.log("?????????????",this.props);
  }

  _addRow = (e) => {
    this.props.requestCreate();
    // this.setState({
    //   schedule: [
    //     ...this.state.schedule, {
    //       startDate: 'new',
    //       days: 'new'
    //     }
    //   ]
    // })
  }

  render () {
    console.log("#########",this.props.scheduleList);
    let rows = [];
    if(this.props.scheduleList){
      this.props.scheduleList.forEach((row,i) => {
        rows.push(
          <TableRow key={i}>
            <TableRowColumn>
              <RaisedButton label="EDIT" linkButton={true} href="#/schedule/edit"/>
            </TableRowColumn>
            <TableRowColumn>{row.startDate}</TableRowColumn>
            <TableRowColumn>{row.days}</TableRowColumn>
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

const _injectPropsFormActions = {
  requestGetList,
  requestCreate
}

export default connect(_injectPropsFromStore, _injectPropsFormActions)(ScheduleList);
