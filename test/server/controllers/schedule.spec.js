describe("Schedule", () => {

  let newSchedule, scheduleDetail,testDevice,testGroup, slaves
  before( async done => {
    try {
      testGroup = await models.Group.create();
      slaves = await models.Slave.create({
        host: "127.0.0.1",
        description: "描述",
        apiVersion: "0.1.0",
      });
      testDevice = await models.Device.create({
        uid: 2,
        GroupId: testGroup.id,
        SlaveId: slaves.id
      });

      newSchedule = {
        StartDate: moment('2016/1/7','YYYY/MM/DD'),
        Days: 15,
        GroupId: testGroup.id,
        DeviceId: testDevice.id
      };

      newSchedule = await models.Schedule.create(newSchedule);
      let scheduleConfig = [];
      for(let a = 0; a<24; a+=2){
        scheduleConfig.push({
          "weight": 1,
          "StartTime": a +":00:00",
          "ScheduleId": newSchedule.id
        });
      }
      await models.ScheduleDetail.bulkCreate(scheduleConfig);
      scheduleDetail = await models.ScheduleDetail.findAll({
        where:{
          ScheduleId: newSchedule.id
        }
      });

      let scheduleConfigId = [];
      scheduleDetail.forEach(function(i){
        scheduleConfigId.push({
          "ScheduleDetailId": i.id,
        });
      });
      await models.ScheduleDetailConfig.bulkCreate(scheduleConfigId);

      done();
    } catch (e) {
      console.log(e);
      done(e);
    }
  });

  it("set one slave FastRun", async(done) => {
    try {
      let data = {
        slaveId: slaves.id,
        scheduleId: newSchedule.id
      }
      let result = await request.post('/rest/master/schedule/setFastRun')
      .send(data);
      done()
    } catch (e) {
      console.log(e);
      done(e)
    }
  });

  it("set All slave FastRun", async(done) => {
    try {
      let data = {
        slaveId: 0,
        scheduleId: newSchedule.id
      }
      let result = await request.post('/rest/master/schedule/setFastRun')
      .send(data);
      done()
    } catch (e) {
      console.log(e);
      done(e)
    }
  });

  it("find", async(done) => {
    try {
      let result = await request.get('/rest/master/schedule/' + newSchedule.id);
      result.body.id.should.be.equal(newSchedule.id);
      result.body.ScheduleDetails.should.be.an.Array;
      done();
    } catch (e) {
      done(e);
    }
  });

  it("update day", async(done) => {
    try {
      let data = {
        ScheduleId: newSchedule.id,
        Days: 17
      };
      let result = await request.post('/rest/master/schedule/update/day').send(data);
      result.body.Days.should.be.not.equal(newSchedule.Days);
      done();
    } catch (e) {
      done(e);
    }
  });

  it.skip("update detail", async(done) => {
    try {
      let data = {
        ScheduleDetailId: scheduleDetail.id,
        weight: 100,
        StartTime: '00:01:00'
      };
      console.log("API:/rest/master/schedule/update/detail");
      console.log("input:", data);

      let result = await request.post('/rest/master/schedule/update/detail').send(data);

      console.log("output:", result);

      result.body.weight.should.be.not.equal(scheduleDetail.weight);
      result.body.StartTime.should.be.not.equal(scheduleDetail.StartTime);
      done();
    } catch (e) {
      done(e);
    }
  });

  it("update details", async(done) => {
    try {
      let scheduleDetails = await services.schedule.find(newSchedule.id);
      let newScheduleDetails = [];
      for (let detail of scheduleDetails.ScheduleDetails) {
        newScheduleDetails.push({
          id: detail.id,
          weight: 0.9,
          StartTime: '01:02:03'
        });
      }
      let result = await request.post('/rest/master/schedule/update/details').send(newScheduleDetails);

      console.log("output:",JSON.stringify(result.body, null, 4));

      for (let i=0; i<12; i++) {
        result.body[i].weight.should.be.equal(0.9);
        result.body[i].StartTime.should.be.equal('01:02:03');
      }
      done();
    } catch (e) {
      done(e);
    }
  });

  it("write saved schedules to device", async done => {
    try {
      console.log('testDevice',JSON.stringify(testDevice,null,4));
      console.log('testGroup',JSON.stringify(testGroup,null,4));
      let result = await request.post(`/rest/slave/${slaves.id}/schedule/setOnDevice`).send({
        slaveId: slaves.id
      });
      console.log(result.body);
      result.body.should.be.true;
      done();
    } catch (e) {
      done(e);
    }
  });

  describe("Detail Config", () => {
    let scheduleDetailConfig,newSchedule;
    before(async(done) => {
      try {

        let group = await models.Group.create();
        let slaves = await models.Slave.create({
          host: "127.0.0.1",
          description: "描述",
          apiVersion: "0.1.0",
        });
        let s1d1 = await models.Device.create({
          uid: 489599,
          SlaveId: slaves.id
        });
        let s1d2 = await models.Device.create({
          uid: 95785,
          SlaveId: slaves.id
        });
        let device = await models.Device.create({
          uid: "1",
          GroupId: group.id,
          SlaveId: slaves.id
        });
        scheduleDetailConfig = await models.ScheduleDetailConfig.create({
          WW: 100,
          DB: 200,
          BL: 300,
          GR: 400,
          RE: 500,
          CCT: 600,
          Bright: 700,
        })

        newSchedule = {
          StartDate: moment('2016/1/7','YYYY/MM/DD'),
          Days: 15,
          GroupId: testGroup.id,
          DeviceId: testDevice.id,
          SlaveId: slaves.id
        };

        newSchedule = await models.Schedule.create(newSchedule);
        done();
      } catch (e) {
        done(e)
      }
    });

    it("update should success", async(done) => {
      try {
        let data = {
          id: scheduleDetailConfig.id,
          WW: 199,
          DB: 299,
          BL: 399,
          GR: 499,
          RE: 599,
          CCT: 699,
          Bright: 799,
        }
        let result = await request.post('/rest/master/schedule/config/update').send(data);
        result.body.WW.should.be.not.equal(scheduleDetailConfig.WW);
        done();
      } catch (e) {
        done(e);
      }
    });

    it("get config should success", async(done) => {
      try {
        let result = await request.get('/rest/master/schedule/config/' + scheduleDetailConfig.id);
        result.body.should.be.Array;
        done();
      } catch (e) {
        done(e);
      }
    });

    it("set All slave", async(done) => {
      try {
        let data = {
          id: scheduleDetailConfig.id,
          WW: 0,
          DB: 0,
          BL: 0,
          GR: 0,
          RE: 0,
          CCT: 3000,
          Bright: 0,
          scheduleID: newSchedule.id,
        }
        let result = await request.post('/rest/slave/0/setLedDisplay').send(data);
        done();
      } catch (e) {
        done(e);
      }
    });
  });
});
