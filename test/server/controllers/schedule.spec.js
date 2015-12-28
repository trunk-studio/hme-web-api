
describe.only("Schedule", () => {

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
