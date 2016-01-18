
// Install `babel` hook for ES6
require("babel-core/register")({
     presets: ['es2015', 'stage-0']
});
require("babel-polyfill");

module.exports = require('./koa.js');
