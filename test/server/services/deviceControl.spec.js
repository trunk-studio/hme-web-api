describe("device", () => {
  let slaves;
  before( async done => {
    try {
      slaves = await models.Slave.create({
        host: "127.0.0.1",
        description: "描述",
        apiVersion: "0.1.0",
      });
      let slaves2 = await models.Slave.create({
        host: "127.0.0.1",
        description: "描述",
        apiVersion: "0.1.0",
      });
      let slaves3 = await models.Slave.create({
        host: "127.0.0.1",
        description: "描述",
        apiVersion: "0.1.0",
      });
      let slaves4 = await models.Slave.create({
        host: "127.0.0.1",
        description: "描述",
        apiVersion: "0.1.0",
      });
      done();
    } catch (e) {
      done(e);
    }
  });

  it("get all slave ", async(done) => {
    try {
      let result = await services.deviceControl.syncNewSlave();
      done();
    } catch (e) {
      done(e);
    }

  });

  it("slave sync all slave ", async(done) => {
    try {
      let slaves = await models.Slave.findAll();
      let result = await services.deviceControl.slaveSyncNewSlave(slaves);
      console.log(result);
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


  describe("email", () => {
    let emails = 'asd@gmail.com;567@gmail.com'
    it("saveEmail", async(done) => {
      try {
        let result = await services.deviceControl.saveEmail(emails);
        done();
      } catch (e) {
        done(e);
      }
    });

    it("loadEmail", async(done) => {
      try {
        let result = await services.deviceControl.loadEmail();
        result.should.be.an.equal(emails);
        done();
      } catch (e) {
        done(e);
      }
    });

    it('resful save', async(done) => {
      try {
        let data = {
          emails: emails
        }
        let result = await request.post('/rest/master/saveEmail').send(data);
        done();
      } catch (e) {
        done(e)
      }
    });

    it('resful load', async(done) => {
      try {
        let result = await request.get('/rest/master/loadEmail');
        result.body.emails.should.be.an.equal(emails);
        done();
      } catch (e) {
        done(e)
      }
    });
  });

  describe("setting", () => {
    it("save", async(done) => {
      try {
        let data = {
          "wifi": {
            "ssid": "123",
            "password": "456"
          },
          "system": {
            "type": "slave",
            "reportEmail": "",
            "masterName": "123",
            "timezoneOffset": -12
          }
        }
        let result = await request.post('/rest/hme/setup/update').send(data);
        result.status.should.be.equal(200);
        done();
      } catch (e) {
        done(e);
      }
    });
    it("load", async(done) => {
      try {
        let result = await request.get('/rest/hme/setup');
        console.log(result.body);
        result.status.should.be.equal(200);
        done();
      } catch (e) {
        done(e);
      }
    });
  });

});
