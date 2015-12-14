import React                from 'react';

const RaisedButton = require('material-ui/lib/raised-button');
const SelectField = require('material-ui/lib/select-field');
const TextField = require('material-ui/lib/text-field');
const Tabs = require('material-ui/lib/tabs/tabs');
const Tab = require('material-ui/lib/tabs/tab');

export default class ManagePage extends React.Component {
  render() {
    let scanResult = [
       { payload: '1', text: 'm1' },
       { payload: '2', text: 'm2' },
       { payload: '3', text: 'm3' },
    ];

    let groups = [
       { payload: '1', text: 'group1' },
       { payload: '2', text: 'group2' },
       { payload: '3', text: 'group3' },
    ];
    return (
      <Tabs>
        <Tab label="TEST">
          <div style={{display: 'table-caption'}}>
            <div style={{display: 'inline-flex'}}>
              <RaisedButton label="SCAN" />
            </div>
            <div style={{display: 'inline-flex'}}>
              <SelectField menuItems={scanResult}/>
              <RaisedButton label="TEST" />
            </div>
            <div style={{display: 'inline-flex'}}>
              <SelectField menuItems={groups}/>
              <RaisedButton label="Grouping" />
            </div>
          </div>
        </Tab>
        <Tab label="Group Test">
          <div style={{display: 'table-caption'}}>
            <SelectField menuItems={groups}/>
            <RaisedButton label="TEST" />
          </div>
        </Tab>
        <Tab label="Report Setting">
          <div style={{display: 'table-caption'}}>
            <TextField
              hintText="Report Email"
              floatingLabelText="Report Email"
              type="text" />
            <SelectField menuItems={groups}/>
            <RaisedButton label="Add in" />
          </div>
        </Tab>
      </Tabs>
    );
  }
}
