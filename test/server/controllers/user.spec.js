
describe("User", () => {

  it("index all user", (done) => {

    request.get("/rest/user/")
    .expect(200)
    .end((error, res) => {
      res.body.users.should.be.Array;
      res.body.users[0].id.should.greaterThan(0);
      done(error);
    });

  });

  it.only("login success test", async (done) => {
    try {
      let result = await request.get('/rest/hme/login')
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

});
