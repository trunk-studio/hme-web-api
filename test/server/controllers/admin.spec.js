describe("admin", () => {

  let messages = [];
  before(async done => {

    messages = [
      {
        title: 'test message 1',
        type: 'info'
      },{
        title: 'test message 2',
        type: 'info'
      },{
        title: 'test error message 1',
        type: 'error'
      },{
        title: 'test error message 2',
        type: 'error'
      }
    ]

    messages = await Promise.all(
      messages.map( message => models.Message.create(message))
    );

    done();
  });

  it("send info mail", async done => {
    try {
      let result = await request.get("/rest/admin/sendmail/info");
      let messageIds = messages.map(message => message.id);

      let results = await models.Message.findAll({
        where: {
          id: messageIds,
          type: 'info'
        }
      });
      console.log('rs===', JSON.stringify(results,null,4));
      results.forEach(result => result.sended.should.be.true);

      done();
    } catch (e) {
      done(e);
    }

  });

  it("send error mail", async done => {
    try {
      let result = await request.get("/rest/admin/sendmail/error");
      let messageIds = messages.map(message => message.id);
      let results = await models.Message.findAll({
        where: {
          id: messageIds,
          type: 'error'
        }
      });

      results.forEach(result => result.sended.should.be.true);

      done();
    } catch (e) {
      done(e);
    }

  });

});
