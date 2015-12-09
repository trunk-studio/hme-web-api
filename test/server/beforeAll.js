var chai = require('chai');
chai.should();

global.request = require("supertest-as-promised");
global.sinon = require("sinon");
global.app = null;

var liftApp = require("../../server");

before(async (done) => {
  console.log('=== start test ===');
  let app = await liftApp();
  global.app = app;

  global.request = global.request.agent(app.listen());

  console.log("server start finish.");
  done()

});
