import React                from 'react';

// const RaisedButton = require('material-ui/lib/raised-button');
// const SelectField = require('material-ui/lib/select-field');
const TextField = require('material-ui/lib/text-field');
// const Tabs = require('material-ui/lib/tabs/tabs');
// const Tab = require('material-ui/lib/tabs/tab');
const Slider = require('material-ui/lib/slider');

export default class LEDColorPage extends React.Component {
  render() {
    return (
      <div>
        <div>
          <Slider name="slider1" defaultValue={1} description="WW"/>
          <Slider name="slider1" defaultValue={1} description="DB"/>
          <Slider name="slider1" defaultValue={1} description="BL"/>
          <Slider name="slider1" defaultValue={1} description="GR"/>
          <Slider name="slider1" defaultValue={1} description="RE"/>
        </div>
      </div>
    );
  }
}
