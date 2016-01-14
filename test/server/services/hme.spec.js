describe("hme", () => {

  it("service hello", (done) => {
    let result = services.hme.hello();
    console.log('=== result ===', result);
    done();
  });


  it("SearchDevice", async(done) => {
    try {
      let result = await services.hme.SearchDevice();
      console.log('=== result ===', result);
      done();
    } catch (e) {
      console.log(e);
      done(e);
    }

  });

  it("Get Device Cache", async done => {
    try {
      let result = await services.hme.getCachedDeviceList();
      console.log('device list === ', result);
      // console.log(result[0]);
      result.should.be.Array;
      result[0].dataValues.should.have.any.keys('id','uid','GroupId','SlaveId');
      done();
    } catch (e) {
      done(e);
    }
  });


});
