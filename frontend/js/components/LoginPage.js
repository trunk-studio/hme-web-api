import React                from 'react';
import { connect } from 'react-redux'
import { requestLogin } from '../actions/auth'

const RaisedButton = require('material-ui/lib/raised-button');
const SelectField = require('material-ui/lib/select-field');
const TextField = require('material-ui/lib/text-field');
const Tabs = require('material-ui/lib/tabs/tabs');
const Tab = require('material-ui/lib/tabs/tab');


export default class LoginPage extends React.Component {

  constructor(props) {
    super(props);
    this._login = this._login.bind(this);
  }

  _login(e) {
    e.preventDefault();
    console.log('clicked');
    console.log('props',this.props);
    // const {dispatch} = this.props;
    // dispatch(requestLogin({test: 'yooo'}));
    this.props.requestLogin({test: 'yooo'});
  }

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
            <RaisedButton label="Login" onTouchTap={this._login}/>
          </div>
        </Tab>
      </Tabs>
    );
  }
}

function _injectPropsFromStore(state) {
  console.log('_injectPropsFromStore', state);
  let { auth } = state;
  console.log('_injectPropsFromStore  auth', auth);
  return {
    auth: auth,
    test: {yoo: 'hello'}
  };
}

const _injectPropsFormActions = {
  requestLogin
}


export default connect(_injectPropsFromStore, _injectPropsFormActions)(LoginPage);
