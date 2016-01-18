
describe("User", () => {

  it("index all user", (done) => {

    request.get("/rest/master/user/")
    .expect(200)
    .end((error, res) => {
      res.body.users.should.be.Array;
      res.body.users[0].id.should.greaterThan(0);
      done(error);
    });

  });

  it("login success test", async (done) => {
    try {
      let result = await request.post('/rest/master/login')
        .send({
          role:'admin',
          password: 'admin'
        });
      result.body.success.should.be.true;
      done();
    } catch (e) {
      done(e);
    }
  });

  it("login failed test", async (done) => {
    try {
      let result = await request.post('/rest/master/login')
        .send({
          role:'admin',
          password: '123'
        });
      result.body.success.should.be.false;
      done();
    } catch (e) {
      done(e);
    }
  });

});
