import React                from 'react';
import { connect } from 'react-redux'
import { requestLogin } from '../actions/AuthActions'

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

export default class SettingGraph extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.log('aa');
    let graph = new SimpleGraph("chart1", {
      "xmax": 24, "xmin": 0,
      "ymax": 100, "ymin": 0,
      "title": "Light Schedule",
      "xlabel": "Time",
      "ylabel": "Y Axis"
    });
  }

  render() {
    let testData = [
     { payload: '1', text: 'test1' },
     { payload: '2', text: 'test2' },
     { payload: '3', text: 'test3' },
    ];
    return (
      <Tabs>
        <Tab label="D3">
          <div className="self-center" style={{width: '600px'}}>
            <div id="chart1" className="chart" />
            <div className="row">
              <div className="col-md-1">
                <RadioButtonGroup name="shipSpeed" defaultSelected="not_light">
                  <RadioButton
                    value="light"
                    style={{marginBottom:16}} />
                  <RadioButton
                    value="not_light"
                    style={{marginBottom:16}}/>
                  <RadioButton
                    value="ludicrous"
                    style={{marginBottom:16}}/>
                </RadioButtonGroup>
              </div>
              <div className="col-md-3">
                <DatePicker hintText="7/15/2015" className="col-md-6"/>
                <DatePicker hintText="7/15/2015" className="col-md-6"/>
                <DatePicker hintText="7/15/2015" className="col-md-6"/>
              </div>
              <div className="col-md-3">
                <SelectField menuItems={testData}/>
                <SelectField menuItems={testData}/>
                <SelectField menuItems={testData}/>
              </div>
            </div>
            <div className="row">

            </div>
          </div>
        </Tab>
      </Tabs>
    );
  }
}

function _injectPropsFromStore(state) {
  // let { login, isLoading } = state;
  return {
  };
}

const _injectPropsFormActions = {
  requestLogin
}


export default connect(_injectPropsFromStore, _injectPropsFormActions)(SettingGraph);
