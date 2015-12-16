
describe("hme", () => {

  before(async done => {
    try {
      await services.hme.connectSerialPort();
      done();
    } catch (e) {
      done(e);
    }
  });


  it("serial Port connect", done => {

    try {
      services.hme.serialPortIsOpen.should.be.true;
      done();
    } catch (e) {
      done(e);
    }

  });

  it("serial Port ping", async done => {

    try {
      let result = await services.hme.ping();

      console.log('=== ping result ===', result);
      (result != null).should.be.equal.true;
      done();
    } catch (e) {
      done(e);
    }

  });


});
