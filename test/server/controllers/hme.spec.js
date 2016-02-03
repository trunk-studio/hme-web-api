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

    it("registered slave", async(done) => {
      try {
        let data = {
          slaveHostName: '127.0.0.1'
        }
        let result = await request.post("/rest/master/register/slave")
        .send(data);
        console.log(result);
        result.status.should.be.equal(200);
        done();
      } catch (e) {
        done(e);
      }
    });


    it("SearchDevice", async(done) => {
      try {
        let result = await request.get("/rest/slave/0/searchDevice");
        result.status.should.be.equal(200);
        result.body.should.be.Array;
        result.body[0].should.have.any.keys('DevID', 'DevGroup');
        done();
      } catch (e) {
        done(e);
      }
    });

    it("get cached deviceList by slaveId", async done => {
      try {
        let result = await request.get(`/rest/slave/${slave.id}/getCachedDeviceList`);
        result.body.should.be.Array;
        result.body[0].should.have.any.keys('devID', 'SlaveId');
        done();
      } catch (e) {
        done(e);
      }
    });

    it("get all cached deviceList", async done => {
      try {
        let result = await request.get(`/rest/hme/getCachedDeviceList`);
        result.body.should.be.Array;
        result.body[0].should.have.any.keys('devID', 'SlaveId');
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
        result.body[0].should.have.any.keys('id', 'host', 'description', 'apiVersion');
        done();
      } catch (e) {
        done(e);
      }
    });

    it("get all cached device", async done => {
      try {
        let result = await request.get('/rest/hme/getCachedDeviceList');
        result.body.should.be.Array;
        result.body[0].should.have.any.keys('devId','SlaveId');
        done();
      } catch (e) {
        done(e);
      }
    });

    it("get cached slave & device list", async done => {
      try {
        let result = await request.get('/rest/hme/getCachedSlaveAndDeviceList');
        result.body.should.be.Object;
        result.body.should.have.any.keys('slaveList', 'deviceList');
        done();
      } catch (e) {
        done(e);
      }
    })


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

  describe('master get All slave device', () => {
    let slave1, slave2;
    let s1d1,s1d2,s2d1,s2d2
    before(async done => {
      try {
        slave1 = await models.Slave.create({
          host: "127.0.0.1:3000",
          description: "描述",
          apiVersion: "0.1.0",
        });
        slave2 = await models.Slave.create({
          host: "127.0.0.1:3000",
          description: "描述",
          apiVersion: "0.1.2",
        });
        s1d1 = await models.Device.create({
          uid: 34895,
          SlaveId: slave1.id
        });
        s1d2 = await models.Device.create({
          uid: 49575,
          SlaveId: slave1.id
        });
        s2d1 = await models.Device.create({
          uid: 25673,
          SlaveId: slave2.id
        });
        s2d2 = await models.Device.create({
          uid: 49576,
          SlaveId: slave2.id
        });
        done();
      } catch (e) {
        done(e);
      }
    });

  it("get all cached device", async done => {
    try {
      let result = await request.get('/rest/hme/getCachedDeviceList');
      result.body.should.be.Array;
      result.body[0].should.have.any.keys('devId','SlaveId');
      done();
    } catch (e) {
      done(e);
    }
  });

  it("get cached deviceList by slaveId", async done => {
    try {
      let result = await request.get(`/rest/slave/1/getCachedDeviceList`);
      for(let device of result.body) {
        await models.Device.findOrCreate({
          where: {
            uid: device.devID
          },
          defaults: {
            uid: device.devID,
            SlaveId: device.SlaveId
          }
        })
      }
      done();
    } catch (e) {
      done(e);
    }
  });

  it('get All slave Device', async (done) => {
    try {
      let ans = [{
        slaveId: slave1.id,
        deviceList: [{
          "id": s1d1.id,
          "uid": 34895,
        }, {
          "id": s1d2.id,
          "uid": 49575,
        }]
      }, {
        slaveId: slave2.id,
        deviceList: [{
          "id": s2d1.id,
          "uid": 25673,
        }, {
          "id": s2d2.id,
          "uid": 49576,
        }]
      }]
      let result = await request.get('/rest/master/syncAllSlaveAndDevice');
      done();
    } catch (e) {
      console.log(e);
      done(e);
    }
  });
});

});
