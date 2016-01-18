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
    let slave;
    before(async done => {
      try {
        slave = await models.Slave.create({
          host: "127.0.0.1",
          description: "描述",
          apiVersion: "0.1.0",
        });
        let group = await models.Group.create();
        let device = await models.Device.create({
          uid: 164,
          GroupId: group.id,
          SlaveId: slave.id
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

    it("get cache deviceList", async done => {
      try {
        let result = await request.get(`/rest/slave/${slave.id}/getCachedDeviceList`);
        result.body.should.be.Array;
        result.body[0].should.have.any.keys('DevID');
        done();
      } catch (e) {
        done(e);
      }
    });

    it("allGroup", async(done) => {
      try {
        let result = await request.get(`/rest/slave/${slave.id}/findAllDeviceGroups`);
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
