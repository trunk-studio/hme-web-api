describe("logger", () => {

  before(done => {
    sinon.stub(services.hme, 'hello', () => {

      logger.error('=== mock error logger ===')
      throw new Error('mock error!');
    });
    done();
  });

  it("error message save", async (done) => {

    try {
      let result = await request.get("/rest/hme/hello")
      result.status.should.be.equal(500);
      let message = await models.Message.findOne({where: {title: 'mock error!'}});
      message.title.should.be.equal('mock error!');
      message.type.should.be.equal('error');

      done();
    } catch (e) {
      done(error);
    }

  });

  it("info message save", async (done) => {

    try {
      await logger.info({info: 'test info'})
      let message = await models.Message.findOne({where: {title: 'test info'}});
      message.title.should.be.equal('test info');
      message.type.should.be.equal('info');


      done();
    } catch (e) {
      done(error);
    }

  });


  after((done) => {
    services.hme.hello.restore();
    done();
  });
});
