import React                from 'react';

// const RaisedButton = require('material-ui/lib/raised-button');
// const SelectField = require('material-ui/lib/select-field');
const TextField = require('material-ui/lib/text-field');
const Tabs = require('material-ui/lib/tabs/tabs');
const Tab = require('material-ui/lib/tabs/tab');
const Slider = require('material-ui/lib/slider');
const RadioButton = require('material-ui/lib/radio-button');
const RadioButtonGroup = require('material-ui/lib/radio-button-group');
const DropDownMenu = require('material-ui/lib/drop-down-menu');
const RaisedButton = require('material-ui/lib/raised-button');

const Card = require('material-ui/lib/card/card');
const CardActions = require('material-ui/lib/card/card-actions');
const CardExpandable = require('material-ui/lib/card/card-expandable');
const CardHeader = require('material-ui/lib/card/card-header');
const CardMedia = require('material-ui/lib/card/card-media');
const CardText = require('material-ui/lib/card/card-text');
const CardTitle = require('material-ui/lib/card/card-title');

export default class LEDColorPage extends React.Component {

  _cctChanged = (e, value) => {
    console.log(value,this.refs.colorSlider);
    this.refs.colorSlider.setState({
      percent: value,
      value: value
    });
  }

  render() {
    let menuItems = [
       { payload: '1', text: 'Never' },
       { payload: '2', text: 'Every Night' },
       { payload: '3', text: 'Weeknights' },
       { payload: '4', text: 'Weekends' },
       { payload: '5', text: 'Weekly' },
    ];
    return (
      <Tabs>
        <Tab label="D3">
          <div className="self-center" style={{width: '1200px'}}>
              <div className="col-md-6">
                <div className="row">
                  <Card>
                    <CardHeader
                      title="Demo Url Based Avatar"
                      subtitle="Subtitle"
                      avatar="http://lorempixel.com/100/100/nature/"/>
                    <CardMedia overlay={<CardTitle title="Title" subtitle="Subtitle"/>}>
                      <img src="http://lorempixel.com/600/337/nature/"/>
                    </CardMedia>
                  </Card>
                </div>
                <div className="row">
                  <RaisedButton label="全開" />
                  <RaisedButton label="6500K" />
                  <RaisedButton label="4600K" />
                  <RaisedButton label="2950K" />
                  <RaisedButton label="saving E" />
                  <RaisedButton label="B + R" />
                </div>
              </div>
              <div className="col-md-6">
                <div className="row">
                  <div className="col-md-6">
                    <Slider ref="colorSlider"  name="WW" defaultValue={1} description="WW"/>
                    <Slider name="DB" defaultValue={1} description="DB"/>
                    <Slider name="BL" defaultValue={1} description="BL"/>
                    <Slider name="GR" defaultValue={1} description="GR"/>
                    <Slider name="RE" defaultValue={1} description="RE"/>
                  </div>
                  <div className="col-md-6">
                    <RadioButtonGroup name="shipSpeed" defaultSelected="ALL" className="selectGroup">
                      <RadioButton
                        value="ALL"
                        label="ALL"
                        style={{marginBottom:16}} />
                      <RadioButton
                        value="GROUP"
                        label="GROUP"
                        style={{marginBottom:16}}/>
                    </RadioButtonGroup>
                  </div>
                  <div>
                    <DropDownMenu menuItems={menuItems} />
                  </div>
                  <div>
                    <DropDownMenu menuItems={menuItems} />
                  </div>
                </div>
                <div className="row">
                  <Slider name="CCT" defaultValue={1} description="CCT" onChange={this._cctChanged}/>
                  <Slider name="Bright" defaultValue={1} description="Bright"/>
                </div>
            </div>
          </div>
        </Tab>
      </Tabs>
    );
  }
}
