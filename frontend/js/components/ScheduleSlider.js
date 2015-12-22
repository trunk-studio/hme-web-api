import React from 'react';
import {connect} from 'react-redux'
import {requestLogin} from '../actions/AuthActions'

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

export default class ScheduleSlider extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount () {

  }

  render () {
    let testData = [
      {
        payload: '1',
        text: 'test1'
      }, {
        payload: '2',
        text: 'test2'
      }, {
        payload: '3',
        text: 'test3'
      }
    ];
    return (
      <Tabs>
        <Tab label="D3">
          <div className="self-center" style={{width: '100%'}}>
            <RaisedButton label="Add" style={{marginLeft:'80%', marginTop: '15px'}} />
            <Table>
              <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                <TableRow>
                  <TableHeaderColumn >Edit</TableHeaderColumn>
                  <TableHeaderColumn >Start Date</TableHeaderColumn>
                  <TableHeaderColumn >Days</TableHeaderColumn>
                </TableRow>
              </TableHeader>
              <TableBody displayRowCheckbox={false}>
                <TableRow>
                  <TableRowColumn>
                    <RaisedButton label="EDIT" />
                  </TableRowColumn>
                  <TableRowColumn>7/15/2015</TableRowColumn>
                  <TableRowColumn>Days</TableRowColumn>
                </TableRow>
                <TableRow>
                  <TableRowColumn>
                    <RaisedButton label="EDIT" />
                  </TableRowColumn>
                  <TableRowColumn>7/15/2015</TableRowColumn>
                  <TableRowColumn>Days</TableRowColumn>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </Tab>
      </Tabs>
    );
  }
}

function _injectPropsFromStore(state) {
  // let { login, isLoading } = state;
  return {};
}

const _injectPropsFormActions = {
  requestLogin
}

export default connect(_injectPropsFromStore, _injectPropsFormActions)(ScheduleSlider);
