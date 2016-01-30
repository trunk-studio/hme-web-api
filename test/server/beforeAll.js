var chai = require('chai');
chai.should();

var request = require("supertest-as-promised");
global.sinon = require("sinon");
global.app = null;

var liftApp = require("../../server");

before(async (done) => {
  try {
    let app = await liftApp();
    global.app = app;
    global.request = request.agent(app.listen());

    if(process.env.SLAVE_01_HOST)
      global.request_slave = request.agent(`http://${process.env.SLAVE_01_HOST}:3000`);

    done();

  } catch (e) {
    console.log(e.stack);
    done(e);
  }

});
