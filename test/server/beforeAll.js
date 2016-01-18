var chai = require('chai');
chai.should();

var request = require("supertest-as-promised");
global.sinon = require("sinon");
global.app = null;

var liftApp = require("../../server");

before(async (done) => {
  try {
    console.log('=== start test ===');
    let app = await liftApp();
    global.app = app;
    global.request = request.agent(app.listen());

    console.log('process.env.SLAVE_01_HOST', process.env.SLAVE_01_HOST);
    if(process.env.SLAVE_01_HOST)
      global.request_slave = request.agent(`http://${process.env.SLAVE_01_HOST}:3000`);

    console.log("server start finish.");
    done();

  } catch (e) {
    console.log(e.stack);
    done(e);
  }

});
