describe("hme", () => {

  it("hello localhost", (done) => {

    request.get("/rest/hme/hello")
      .expect(200)
      .end((error, res) => {
        console.log('res.body', res.body);
        done(error);
      });

  });

  it.skip("hello slave", (done) => {

    request_slave.get("/rest/hme/hello")
      .expect(200)
      .end((error, res) => {
        console.log('res.body', res.body);
        done(error);
      });

  });



  it("ping", (done) => {
    request.get("/rest/hme/ping")
      .expect(200)
      .end((error, res) => {
        console.log('res.body', res.body);
        done(error);
      });
  });

  describe("device", () => {
    before(async done => {
      try {
        let group = await models.Group.create();
        let slaves = await models.Slave.create({
          host: "hostName",
          description: "描述",
          apiVersion: "0.1.0",
        });
        let device = await models.Device.create({
          uid: 164,
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

    it("SearchDevice", async(done) => {
      try {
        let result = await request.get("/rest/slave/searchDevice");
        result.status.should.be.equal(200);
        result.body.should.be.Array;
        result.body[0].should.have.any.keys('DevID', 'DevGroup');
        done();
      } catch (e) {
        done(e);
      }
    });

    it("get cached deviceList", async done => {
      try {
        let result = await request.get("/rest/slave/getCachedDeviceList");
        result.body.should.be.Array;
        result.body[0].should.have.any.keys('DevID');
        done();
      } catch (e) {
        done(e);
      }
    });

    it("get cached slaveList", async done => {
      try {
        let result = await request.get("/rest/hme/getCachedSlaveList");
        console.log('res',JSON.stringify(result.body,null,4));
        result.body.should.be.Array;
        result.body[0].should.have.any.keys('host', 'description', 'apiVersion');
        done();
      } catch (e) {
        done(e);
      }
    });

    it("allGroup", async(done) => {
      try {
        let result = await request.get('/rest/slave/findAllDeviceGroups');
        console.log('group list');
        console.log(result.body);
        result.status.should.be.equal(200);
        result.body.should.be.Array;
        result.body[0].should.have.any.keys('id');
        done();
      } catch (e) {
        done(e);
      }
    });

  });

});
