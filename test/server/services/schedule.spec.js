
import moment from 'moment';

describe.skip("schedule", () => {


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

      } catch (e) {
        done(e);
      }
    });

    it( "All" , async done => {
      try {
        let result = await services.schedule.findAll();

        result.toJSON()[0].should.have.any.keys('StartDate', 'Days');

        done();
      } catch (e) {
        done(e);
      }
    });

  });

});
