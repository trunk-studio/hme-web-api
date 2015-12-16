import React                from 'react';

const RaisedButton = require('material-ui/lib/raised-button');
const SelectField = require('material-ui/lib/select-field');
const TextField = require('material-ui/lib/text-field');
const Tabs = require('material-ui/lib/tabs/tabs');
const Tab = require('material-ui/lib/tabs/tab');


export default class LoginPage extends React.Component {
  render() {
    let roles = [
       { payload: '1', text: '原廠工程師' },
       { payload: '2', text: '主控者' },
       { payload: '3', text: '操作人員' },
    ];
    return (
      <Tabs>
        <Tab>
          <div style={{display: 'table-caption'}}>
            <SelectField menuItems={roles}/>
            <TextField
              hintText="Password Field"
              type="password" />
            <RaisedButton linkButton={true} label="Login" href="#manage" />
          </div>
        </Tab>
      </Tabs>
    );
  }
}
