
describe("hme", () => {

  before(async done => {
    try {
      await services.hme.connectSerialPort();
      done();
    } catch (e) {
      done(e);
    }
  });


  it("service hello", done => {

    try {
      services.hme.serialPortIsOpen.should.be.true;
      done();
    } catch (e) {
      done(e);
    }

  });

});
