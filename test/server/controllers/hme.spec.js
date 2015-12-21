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
    let result = request.get("/rest/hme/searchDevice")
    .expect(200)
    .end(error, res) => {
      console.log('res.body', res.body);
      done(error);
    });
    result.body.should.be.Array;
    result[0].should..have.any.keys('DevID', 'DevGroup');
  });

});
