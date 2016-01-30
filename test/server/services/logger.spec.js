describe("logger", () => {

  before(done => {
    sinon.stub(services.hme, 'hello', () => {

      logger.error('=== mock error logger ===')
      throw new Error('mock error!');
    });
    done();
  });

  it.only("hello localhost", (done) => {
    request.get("/rest/hme/hello")
      .expect(200)
      .end((error, res) => {
        console.log('res.body', res.body);
        done(error);
      });

  });

  after((done) => {
    services.hme.hello.restore();
    done();
  });
});
