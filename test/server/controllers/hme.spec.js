describe("hme", () => {



  it("hello", (done) => {

    request.get("/rest/hme/hello")
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

  it.only("SearchDevice", (done) => {
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

});
