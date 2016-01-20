describe("device", () => {
  let slaves;

  before( async done => {
    try {
      slaves = await models.Slave.create({
        host: "127.0.0.1",
        description: "描述",
        apiVersion: "0.1.0",
      });
      done();
    } catch (e) {
      done(e);
    }
  });


  it("getSlaveHost", async(done) => {
    try {
      let result = await services.deviceControl.getSlaveHost(slaves.id);
      result.dataValues.host.should.be.a.String
      done();
    } catch (e) {
      done(e);
    }

  });

});
