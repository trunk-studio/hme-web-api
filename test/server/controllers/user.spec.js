
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

  it.only("login test", async (done) => {
    try {
      let result = await request.get('/rest/hme/login')
        .send({
          role:'admin',
          password: 'admin'
        });
      console.log(result.body);
      done();
    } catch (e) {
      done(e);
    }
  });

});
