
describe("hme", () => {
  describe("with seriel port", () => {
    before(async done => {
      try {
        await services.hme.connectSerialPort();
        done();
      } catch (e) {
        done(e);
      }
    });


    it("serial Port connect", done => {

      try {
        services.hme.serialPortIsOpen.should.be.true;
        done();
      } catch (e) {
        done(e);
      }

    });

    it("serial Port ping", async done => {

      try {
        let result = await services.hme.ping();
        result.should.be.not.null;
        done();
      } catch (e) {
        done(e);
      }

    });
  });

  describe.only("without seriel port", () => {

    it("WordTo3Byte", done => {
      try {
        let result = services.hme.encode.WordTo3Byte('aaabbcc');
        console.log(result);
        done();
      } catch (e) {
        done(e);
      }
    });

    it("u3ByteToWord", done => {
      try {
        let result = services.hme.encode.u3ByteToWord('aaabbcc');
        console.log(result);
        done();
      } catch (e) {
        done(e);
      }
    });

    it("WordListToAdd3ByteList", done => {
      try {
        let params = {
          WordDatat_list: 'aaa',
          Data_list: 'bbb'
        }
        let result = services.hme.encode.WordListToAdd3ByteList(params);
        console.log(result);
        done();
      } catch (e) {
        done(e);
      }
    });



  });



});
