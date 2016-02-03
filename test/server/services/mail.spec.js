describe.only("mail", () => {


  describe("send mail", () => {
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

    it('test sendMail', async (done) => {
      try {
        await services.mail.send({messages});

        let messageIds = messages.map(message => message.id);

        let results = await models.Message.findAll({where: {id: messageIds}});

        results.forEach(result => result.sended.should.be.true);

        done();
      } catch (e) {
        done(e);
      }

    });

  });

  describe("send info mail", () => {
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

    it('test send info report', async (done) => {
      try {
        await services.mail.sendInfoReport();

        let messageIds = messages.map(message => message.id);

        let results = await models.Message.findAll({
          where: {
            id: messageIds,
            type: 'info'
          }
        });

        results.forEach(result => result.sended.should.be.true);

        done();
      } catch (e) {
        done(e);
      }
    });

  });

  describe.only("send error mail", () => {
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

    it('test send error report', async (done) => {
      try {
        await services.mail.sendErrorReport();

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


});
