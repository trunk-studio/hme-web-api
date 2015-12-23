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
const Slider = require('material-ui/lib/slider');

export default class EditSchedule extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      schedule: [
        {
          time: '1',
          weight: 0.2
        }, {
          time: '2',
          weight: 0.3
        }, {
          time: '3',
          weight: 0.4
        }
      ]
    }
  }

  componentDidMount () {
    let graph = new SimpleGraph("chart1", {
      "xmax": 12,
      "xmin": 0,
      "ymax": 100,
      "ymin": 0,
      "title": "Light Schedule",
      "xlabel": "Time", "ylabel": "%"
    });
  }

  _addRow = (e) => {
    this.setState({
      schedule: [
        ...this.state.schedule, {
          time: 'new',
          weight: 0.5
        }
      ]
    })
  }

  render () {
    let rows = [];
    this.state.schedule.forEach((row,i) => {
      rows.push(
        <TableRow key={i}>
          <TableRowColumn className="col-xs-2">
            {row.time}
          </TableRowColumn>
          <TableRowColumn className="col-xs-6">
            <Slider name={`slider${i}`} value={row.weight} />
          </TableRowColumn>
        </TableRow>
      );
    });
    return (
      <Tabs>
        <Tab label="Edit Schedule">
          <div className="self-center" style={{width: '100%'}}>
            <div className="row" style={{padding: '15px'}}>
              <div className="col-md-offset-2 col-xs-offset-2 col-md-4 col-sm-4 col-xs-4">
                <DatePicker floatingLabelText="日期"  textFieldStyle={{ width:'100%'}}/>
              </div>
              <div className="col-md-4 col-sm-4 col-xs-4" >
                <TextField floatingLabelText="Days" type="number"  style={{width:'100%'}}/>
              </div>
            </div>
            <div className="row">
              <RaisedButton label="維護燈具參數" style={{float: 'right', margin: '15px', marginRight: '10%'}}/>
            </div>
            <div id="chart1" className="chart"/>
            <div className="row">
              <RaisedButton label="Add" onTouchTap={this._addRow}  style={{float: 'right', margin: '15px', marginRight: '10%'}}/>
            </div>
            <Table>
              <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                <TableRow>
                  <TableHeaderColumn className="col-xs-2">Time</TableHeaderColumn>
                  <TableHeaderColumn className="col-xs-6" >Weight</TableHeaderColumn>
                </TableRow>
              </TableHeader>
              <TableBody displayRowCheckbox={false}>
                {rows}
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

export default connect(_injectPropsFromStore, _injectPropsFormActions)(EditSchedule);
