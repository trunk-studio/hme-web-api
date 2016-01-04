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
    before(async done => {
      try {

        done();
      } catch (e) {
        done(e);
      }
    });

    it("SearchDevice", async(done) => {
      try {
        let result = await request.get("/rest/hme/searchDevice");
        result.status.should.be.equal(200);
        result.body.should.be.Array;
        result.body[0].should.have.any.keys('DevID', 'DevGroup');
        done();
      } catch (e) {
        done(e);
      }
    });

    it("allGroup", async(done) => {
      try {
        let result = await request.get('/rest/hme/deviceGroup/findAll');
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

});
