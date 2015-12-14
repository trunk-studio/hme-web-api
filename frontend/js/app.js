import React                from 'react';
import ReactDOM             from 'react-dom';
import { Router, Route, Link } from 'react-router'
// import { Router }           from 'react-router';
// import createBrowserHistory from 'history/lib/createBrowserHistory'
// import { Provider }         from 'react-redux';
// import { fromJS }           from 'immutable';
// import * as reducers        from 'reducers';
// import routes               from 'routes';
// import promiseMiddleware    from 'lib/promiseMiddleware';
// import immutifyState        from 'lib/immutifyState';
// import { createStore,
//          combineReducers,
//          applyMiddleware }  from 'redux';

// const initialState = immutifyState(window.__INITIAL_STATE__);

// const history = createBrowserHistory();

// const reducer = combineReducers(reducers);
// const store   = applyMiddleware(promiseMiddleware)(createStore)(reducer, initialState);
//
// render(
//   <Provider store={store}>
//     <Router children={routes} history={history} />
//   </Provider>,
//   document.getElementById('react-view')
// );

// var React = require('react');
// var ReactDOM = require('react-dom');

class MyComponent extends React.Component {
  render() {
    return <div>Hello World</div>;
  }
}

class MyComponent2 extends React.Component {
  render() {
    return <div>Hello</div>;
  }
}


ReactDOM.render(
  (
    <Router>
      <Route path="/" component={MyComponent}/>
      <Route path="about" component={MyComponent2}/>
    </Router>
  )
  , document.getElementById('react-view'));

  // <Route path="*" component={NoMatch}/>
