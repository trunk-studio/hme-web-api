import React from 'react';
import {connect} from 'react-redux'
import {requestLogin} from '../actions/AuthActions'

import {
  RaisedButton, SelectField, TextField, Tabs, Tab, DatePicker, Table,
  RadioButtonGroup, TableBody, TableFooter, TableHeader,
  TableHeaderColumn, TableRowColumn, Slider, TableRow
} from 'material-ui';

const LineChart = require("react-chartjs").Line;

export default class ScheduleDetail extends React.Component {

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

  componentDidMount () {}

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
  _slide = (e, value) => {
    console.log(value);
  }

  render () {
    let chartData = {
      labels: [
        "0", "2", "4", "6", "8", "12"
      ],
      datasets: [
        {
          label: "My Second dataset",
          fillColor: "rgba(151,187,205,0.2)",
          strokeColor: "rgba(151,187,205,1)",
          pointColor: "rgba(151,187,205,1)",
          pointStrokeColor: "#fff",
          pointHighlightFill: "#fff",
          pointHighlightStroke: "rgba(151,187,205,1)",
          data: [28, 48, 40, 19, 86, 27, 90]
        }
      ]
    };
    let rows = [];
    this.state.schedule.forEach((row, i) => {
      rows.push(
        <TableRow key={i}>
          <TableRowColumn className="col-xs-2">
            {row.time}
          </TableRowColumn>
          <TableRowColumn className="col-xs-6">
            <Slider name={`slider${i}`} value={row.weight}/>
          </TableRowColumn>
        </TableRow>
      );
    });
    return (
      <Tabs>
        <Tab label="Schedule Detail">
          <div className="self-center" style={{
          width: '100%'
          }}>
            <div className="row" style={{
            padding: '15px'
            }}>
              <div className="col-md-offset-2 col-xs-offset-2 col-md-4 col-sm-4 col-xs-4">
                <DatePicker floatingLabelText="日期" textFieldStyle={{
                width: '100%'
                }}/>
              </div>
              <div className="col-md-4 col-sm-4 col-xs-4">
                <TextField floatingLabelText="Days" type="number" style={{
                width: '100%'
                }}/>
              </div>
            </div>
            <div className="row">
              <RaisedButton label="維護燈具參數" style={{
              float: 'right', margin: '15px', marginRight: '10%'
              }} linkButton={true} href="#/LEDColor"/>
            </div>
            <div className="row">
              <LineChart ref="chart" data={chartData} style={{
              width: '80%'
              }} className="center-self"/>
              {/*<div className="col-xs-2" style={{padding: '0px'}}>
                <Slider name="test" value={0.5} className="straight-slider"/>
              </div>*/}
            </div>
            <div className="row">
              <div className="center-self" style={{
              width: '80%', paddingLeft: '28px'
              }}>
                <Slider ref="timeSlider" name="test" value={0.5} className="center-self" onChange={this._slide}/>
              </div>
            </div>
            <div className="row">
              <RaisedButton label="Add" onTouchTap={this._addRow} style={{
              float: 'right', margin: '15px', marginRight: '10%'
              }}/>
            </div>
            <Table>
              <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                <TableRow>
                  <TableHeaderColumn className="col-xs-2">Time</TableHeaderColumn>
                  <TableHeaderColumn className="col-xs-6">Weight</TableHeaderColumn>
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

export default connect(_injectPropsFromStore, _injectPropsFormActions)(ScheduleDetail);
