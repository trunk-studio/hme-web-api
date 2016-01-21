describe("hme", () => {
  before( async done => {
    try {
      let group = await models.Group.create();
      let slaves = await models.Slave.create({
        host: "hostName",
        description: "描述",
        apiVersion: "0.1.0",
      });
      let device = await models.Device.create({
        uid: 369,
        GroupId: group.id,
        SlaveId: slaves.id
      });
      let slave = await models.Slave.create({
        host: 'testHost',
        description: 'testDesc',
        apiVersion: 'testAPIversion'
      });
      done();
    } catch (e) {
      done(e);
    }
  });

  it("service hello", (done) => {
    console.log("=== service hello ===");
    let result = services.hme.hello();
    console.log('=== result ===', result);
    done();
  });


  it("SearchDevice", async(done) => {
    try {
      let result = await services.hme.SearchDevice();
      console.log('=== result ===', result);
      done();
    } catch (e) {
      console.log(e);
      done(e);
    }

  });

  it("Get Cached DeviceList", async done => {
    try {
      let result = await services.hme.getCachedDeviceList();
      // console.log(result[0]);
      result.should.be.Array;
      result[0].should.have.any.keys('DevID');
      done();
    } catch (e) {
      done(e);
    }
  });


  it("Get Cached DeviceList", async done => {
    try {
      let result = await services.hme.getCachedSlaveList();
      // console.log(result[0]);
      result.should.be.Array;
      result[0].should.have.any.keys('host', 'description', 'apiVersion');
      done();
    } catch (e) {
      done(e);
    }
  });


  it("ping all slaves", async done => {
    try {
      let result = await services.hme.pingAllSlave();
      result[0].dataValues.should.have.any.keys('host', 'description', 'apiVersion');
      done();
    } catch (e) {
      done(e);
    }
  });

});
