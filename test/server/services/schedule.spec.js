describe("schedule", () => {

  it("create", async(done) => {
    try {
      let newSchedule = {
        StartDate: moment('2015/11/10','YYYY/MM/DD'),
        Days: 15
      };
      let result = await services.schedule.create(newSchedule);
      result.dataValues.should.have.any.keys('StartDate', 'Days');
      done();
    } catch (e) {
      done(e);
    }

  });

  describe("query", async done => {
    before( async done => {
      try {
        let newSchedule = {
          StartDate: moment('1900/11/10','YYYY/MM/DD'),
          Days: 15
        };
        await models.Schedule.create(newSchedule);
        done();
      } catch (e) {
        done(e);
      }
    });

    it( "All" , async done => {
      try {
        let result = await services.schedule.findAll();
        result[0].dataValues.should.have.any.keys('StartDate', 'Days');
        done();
      } catch (e) {
        done(e);
      }
    });

  });

  describe("Schedule Detail", async done => {
    let newSchedule, scheduleDetail,
    newSchedule2, scheduleDetail2;
    before( async done => {
      try {
        newSchedule = {
          StartDate: moment('1900/11/10','YYYY/MM/DD'),
          Days: 15
        };
        newSchedule = await models.Schedule.create(newSchedule);
        let scheduleConfig = [];
        for(let a = 0; a<24; a+=2){
          scheduleConfig.push({
            "weight": 1,
            "StartTime": "00:"+ a +":00",
            "ScheduleId": newSchedule.id
          });
        }
        await models.ScheduleDetail.bulkCreate(scheduleConfig);
        scheduleDetail = await models.ScheduleDetail.findOne({
          where:{
            ScheduleId: newSchedule.id
          }
        });

        newSchedule2 = {
          StartDate: moment('1900/11/10','YYYY/MM/DD'),
          Days: 15
        };
        newSchedule2 = await models.Schedule.create(newSchedule2);
        let scheduleConfig2 = [];
        for(let a = 0; a<24; a+=2){
          scheduleConfig2.push({
            "weight": 1,
            "StartTime": "00:"+ a +":00",
            "ScheduleId": newSchedule2.id
          });
        }
        await models.ScheduleDetail.bulkCreate(scheduleConfig2);
        scheduleDetail2 = await models.ScheduleDetail.findOne({
          where:{
            ScheduleId: newSchedule2.id
          }
        });
        done();
      } catch (e) {
        done(e);
      }
    });

    it( "update Schedule time" , async done => {
      try {
        let data = {
          ScheduleId: newSchedule.id,
          Days: 17
        };
        let result = await services.schedule.updateDay(data);
        result.Days.should.be.not.equal(newSchedule.Days);
        done();
      } catch (e) {
        done(e);
      }
    });

    it( "update Schedule List" , async done => {
      try {
        let data = [{
          id: newSchedule.id,
          Days: 1,
          StartDate: '2016/01/11'
        },{
          id: newSchedule2.id,
          Days: 2,
          StartDate: '2016/01/12'
        }];
        let result = await services.schedule.updateScheduleList(data);
        result[0].Days.should.be.not.equal(newSchedule2.Days);
        done();
      } catch (e) {
        done(e);
      }
    });

    it( "update Schedule Detail" , async done => {
      try {
        let data = {
          ScheduleDetailId: scheduleDetail.id,
          weight: 0.5,
          StartTime: '00:00:01'
        };
        let result = await services.schedule.updateScheduleDetail(data);
        result.weight.should.be.not.equal(scheduleDetail.weight);
        result.StartTime.should.be.not.equal(scheduleDetail.StartTime);
        done();
      } catch (e) {
        done(e);
      }
    });

  });

  describe("models to hardware time table config", async done => {
    let newSchedule, scheduleDetail;
    before( async done => {
      try {
        let group = await models.Group.create();
        let slaves = await models.Slave.create({
          host: "hostName",
          description: "描述",
          apiVersion: "0.1.0",
        });
        let device = await models.Device.create({
          uid: "1",
          GroupId: group.id,
          SlaveId: slaves.id
        });

        newSchedule = {
          StartDate: moment('2016/1/7','YYYY/MM/DD'),
          Days: 15,
          GroupId: group.id,
          DeviceId: device.id
        };

        newSchedule = await models.Schedule.create(newSchedule);
        let scheduleConfig = [];
        for(let a = 0; a<24; a+=2){
          scheduleConfig.push({
            "weight": 1,
            "StartTime": "00:"+ a +":00",
            "ScheduleId": newSchedule.id
          });
        }
        await models.ScheduleDetail.bulkCreate(scheduleConfig);
        scheduleDetail = await models.ScheduleDetail.findOne({
          where:{
            ScheduleId: newSchedule.id
          }
        });

        done();
      } catch (e) {
        done(e);
      }
    });

    it( "should be get currect json object" , async done => {
      try {
        let config = {
          Device: 1,
          Group: 0,
          Schedules: [{
            StartDate: '2016-01-01',
            Days: 7,
            Details: [{
              weight: 1,
              StartTime: '01:00',
              Config: {
                WW: 10,
                DB: 10,
                BL: 10,
                GR: 10,
                RE: 10,
                CCT: 10,
                Bright: 10
              }
            },{
              weight: 1,
              StartTime: '02:00',
              Config: {
                WW: 10,
                DB: 10,
                BL: 10,
                GR: 10,
                RE: 10,
                CCT: 10,
                Bright: 10
              }
            },{
              weight: 1,
              StartTime: '04:00'
            },{
              weight: 1,
              StartTime: '05:00'
            }]
          },{
            StartDate: '2016-01-08',
            Days: 7
          },{
            StartDate: '2016-01-15',
            Days: 7
          },{
            StartDate: '2016-01-22',
            Days: 7
          },{
            StartDate: '2016-01-29',
            Days: 7
          }]
        }
        let result = await services.schedule.getCurrectSetting();
        done();
      } catch (e) {
        done(e);
      }
    });

  });


});
