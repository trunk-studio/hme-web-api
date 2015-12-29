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
    let newSchedule, scheduleDetail;
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

    it( "update Schedule Detail" , async done => {
      try {
        let data = {
          ScheduleDetailId: scheduleDetail.id,
          weight: 100,
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

});
