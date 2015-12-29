
describe("Schedule", () => {

  let newSchedule, scheduleDetail;
  before( async done => {
  try {
    newSchedule = {
      StartDate: moment('1900/11/10','YYYY/MM/DD'),
      Days: 15
    };
    newSchedule = await models.Schedule.create(newSchedule);
    let sdfgcheduleConfig = [];
    for(let a = 0; a<24; a+=2){
      sdfgcheduleConfig.push({
        "weight": 1,
        "StartTime": "00:"+ a +":00",
        "EndTime": "00:"+ (a+1) +":59",
        "ScheduleId": newSchedule.id
      });
    }
    await models.ScheduleDetail.bulkCreate(sdfgcheduleConfig);
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

it("update day", async (done) => {
  try {
    let data = {
      ScheduleId: newSchedule.id,
      Days: 17
    };
    let result = await request.post('/rest/schedule/update/day').send(data);
    result.body.Days.should.be.not.equal(newSchedule.Days);
    done();
  } catch (e) {
    done(e);
  }
});

it("update detail", async (done) => {
  try {
    let data = {
      ScheduleDetailId: scheduleDetail.id,
      weight: 100,
      StartTime: '00:00:01',
      EndTime:'00:02:59'
    };
    let result = await request.post('/rest/schedule/update/detail').send(data);
    result.body.weight.should.be.not.equal(scheduleDetail.weight);
    result.body.StartTime.should.be.not.equal(scheduleDetail.StartTime);
    result.body.EndTime.should.be.not.equal(scheduleDetail.EndTime);
    done();
  } catch (e) {
    done(e);
  }
});

  describe("Detail Config", () => {
    let scheduleDetailConfig
    before(async (done) => {
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
        scheduleDetailConfig = await models.ScheduleDetailConfig.create({
          WW: 100,
          DB: 200,
          BL: 300,
          GR: 400,
          RE: 500,
          CCT: 600,
          Bright: 700,
          GroupId: group.id,
          DeviceId: device.id
        })
        done();
      } catch (e) {
        done(e)
      }
    });

    it("update should success", async (done) => {
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
        let result = await request.post('/rest/schedule/config/update').send(data);
        result.body.WW.should.be.not.equal(scheduleDetailConfig.WW);
        done();
      } catch (e) {
        done(e);
      }
    });

    it("get config should success", async (done) => {
      try {
        let result = await request.get('/rest/schedule/config/'+scheduleDetailConfig.id);
        console.log(result.body);
        result.body.datasets[0].data.should.be.Array;
        done();
      } catch (e) {
        done(e);
      }
    });
  });
});
