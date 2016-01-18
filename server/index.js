
// Install `babel` hook for ES6
require("babel-core/register");
require("babel-polyfill");

module.exports = require('./koa.js');
