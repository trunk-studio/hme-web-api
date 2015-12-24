describe("schedule", () => {

  it.only("create", async (done) => {
    try {
      // let result = await* Schedule.findAndCountAll({});
      // console.log('result',result);
      let newSchedule = {
        StartDate: '2015/11/10',
        Days: 15
      };
      let result = await services.schedule.create();
      result.body[0].should.have.any.keys('StartDate','Days');
      done();

    } catch (e) {
      done(e);
    }

  });

});
