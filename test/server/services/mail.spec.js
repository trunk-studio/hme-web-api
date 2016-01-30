describe.only("mail", () => {
  let messages = [];
  before(async done => {

    messages = [
      {
        title: 'test message 1',
        type: 'info'
      },{
        title: 'test message 2',
        type: 'info'
      }
    ]


    messages = await Promise.all(
      messages.map( message => models.Message.create(message))
    );

    done();
  });


  it("send mail", async (done) => {
    try {
      await services.mail.send({messages});

      done();
    } catch (e) {
      done(e);
    }

  });

});
