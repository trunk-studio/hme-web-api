import React from 'react';
import {connect} from 'react-redux'
import {requestLogin} from '../actions/AuthActions'

import {RaisedButton, SelectField, TextField, Tabs, Tab, DatePicker, Table, RadioButtonGroup, TableBody, TableFooter, TableHeader, TableHeaderColumn, TableRowColumn, TableRow} from 'material-ui';
const VerticalSlider = require('vertical-rc-slider');
const Slider = require('rc-slider');
const style = {
  width: 400,
  margin: 50
};
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
    const marks = {
      0: '00:00',
      10: '02:00',
      20: '04:00',
      30: '06:00',
      40: '08:00',
      50: '10:00',
      60: '12:00',
      70: '14:00',
      80: '16:00',
      90: '18:00',
      100: '20:00',
      110: '22:00',
      120: '24:00'
    };

    const percent_marks = {
      0: '0',
      10: '10',
      20: '20',
      30: '30',
      40: '40',
      50: '50',
      60: '60',
      70: '70',
      80: '80',
      90: '90',
      100: '100'
    }
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
            {/*<Slider name={`slider${i}`} value={row.weight}/>*/}
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
              <div className="center-self">
                <div className="col-md-11 col-sm-11 col-xs-11">
                  <LineChart ref="chart" data={chartData} style={{
                    marginLeft: '5px',
                    width: '100%',
                    height: '600px'
                    }} className=""/>
                </div>
                <div className="col-md-1 col-sm-1 col-xs-1" style={{paddingTop: '295px',
                  position: 'absolute', right: '-285px'}}>
                  <VerticalSlider className="vertical-slider" min={0} max={100} marks={percent_marks} included={false} style={{float: 'right'}} />
                </div>
              </div>
              {/*<div className="col-xs-2" style={{padding: '0px'}}>
                <Slider name="test" value={0.5} className="straight-slider"/>
              </div>*/}
            </div>
            <div className='row' style={{marginTop: '20px'}}>
              <div style={{
                width: '83%', paddingLeft: '0px'
                }} className="center-self">
                <Slider min={0} max={120} marks={marks} included={false} defaultValue={20} style={{width: '100%'}}/>
              </div>
            </div>
            <div className="row" style={{
            marginTop: '25px'
            }}>
              <div className="center-self" style={{width:'560px'}}>
                <RaisedButton label="00:00" secondary={true} style={{marginLeft: '6px'}}/>
                <RaisedButton label="02:00" secondary={true} style={{marginLeft: '5px'}} />
                <RaisedButton label="04:00" secondary={true} style={{marginLeft: '5px'}} />
                <RaisedButton label="06:00" secondary={true} style={{marginLeft: '5px'}} />
                <RaisedButton label="08:00" secondary={true} style={{marginLeft: '5px'}} />
                <RaisedButton label="10:00" secondary={true} style={{marginLeft: '5px'}} />
              </div>
              <div className="center-self" style={{width: '560px', marginTop: '10px', marginBottom: '10px'}}>
                <RaisedButton label="12:00" secondary={true} style={{marginLeft: '6px'}}/>
                <RaisedButton label="14:00" secondary={true} style={{marginLeft: '5px'}} />
                <RaisedButton label="16:00" secondary={true} style={{marginLeft: '5px'}} />
                <RaisedButton label="18:00" secondary={true} style={{marginLeft: '5px'}} />
                <RaisedButton label="20:00" secondary={true} style={{marginLeft: '5px'}} />
                <RaisedButton label="22:00" secondary={true} style={{marginLeft: '5px'}} />
              </div>
            </div>
            <div className="row">
            </div>
            {/*}<div className="row" style={{height: '200px', width: '600px'}}>
              <Slider min={0} marks={marks} included={false} defaultValue={20}/>
            </div>*/}
            {/*<div className="row">
              <div className="center-self" style={{
              width: '80%', paddingLeft: '28px'
              }}>
                <Slider ref="timeSlider" name="test" value={0.5} className="center-self" onChange={this._slide}/>
              </div>
            </div>
            */}
            {/*
            <div className="row">
              <RaisedButton label="Add" onTouchTap={this._addRow} style={{
              float: 'right', margin: '15px', marginRight: '10%'
              }}/>
            </div>
            */}
            {/*
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
            */}
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
