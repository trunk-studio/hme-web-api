
describe("hme with seriel port", () => {
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

    it("serial Port UartTxRx", async done => {

      try {
        let restComm = [128,1,0,0,0,0,0,50,1,0,0,0,0,0,1,0,0,53,1,0];
        let params = {
          Comm:restComm,
          RxLen:8
        }
        let result = await services.hme.UartTxRx(params);
        result.should.be.equal[ 192, 1, 0, 0, 50, 115, 1, 0 ];
        console.log('UartTxRx result',result);
        done();
      } catch (e) {
        done(e);
      }

    });

    it("serial Port SearchDevice", async done => {

      try {
        let result = await services.hme.SearchDevice();
        console.log('SearchDevice result',result);
        result.should.be.Array;
        result[0].should.have.any.keys('DevID', 'DevGroup');
        done();
      } catch (e) {
        done(e);
      }

    });

    it("serial Port testAll", async done => {

      try {
        //測試所有燈具
        let result = await services.hme.testAll();
        console.log('testAll result',result);
        result.should.be.true;
        done();
      } catch (e) {
        done(e);
      }

    });

    it("serial Port testDevID", async done => {

      try {
        //測試特定DevID之燈具
        let DevID = 1;
        let result = await services.hme.testDevID(DevID);
        console.log('testDevID result',result);
        result.should.be.true;
        done();
      } catch (e) {
        done(e);
      }

    });

    it("serial Port testGroup", async done => {

      try {
        //測試特定GroupID分組之燈具
        //使用testGroup功能時，即使該Group不存在也不會報錯
        //只能測試serial part是否將命令發送出去
        let groupID = 1;
        let result = await services.hme.testGroup(groupID);
        console.log('testDevID result',result);
        result.should.be.true;
        done();
      } catch (e) {
        done(e);
      }

    });

    it.only("serial Port testDevice", async done => {

      try {
        // 當DevID != 0，groupID設定無效
        // DevID == 0 && groupID == 0，測試全部裝置
        let DevID = 1;
        let groupID = 1;
        let result = await services.hme.testDevice(DevID, groupID);
        console.log('TestDevice result',result);
        result.should.be.true;
        done();
      } catch (e) {
        done(e);
      }

    });

    it("serial Port SetLedCtrlMode", async done => {
      // 設定燈具使用模式
      // Normal:依照燈具FlashMemory所設定之亮度參數運作
      // Fast:依照燈具FlashMemory所設定之亮度參數運作，但模擬時間加速
      // Interact:反應手動設定，即時DEMO
      // 一開機是進入Normal
      // 燈具維護這類使用者可以直接操作UI讓燈具產生反應的模式是Interact
      try {
        let DevID = 0;
        let groupID = 1;
        let CtrlMode = 'Interact';
        let result = await services.hme.SetLedCtrlMode(DevID, groupID, CtrlMode);
        console.log('SetLedCtrlMode result',result);
        result.should.be.true;
        done();
      } catch (e) {
        done(e);
      }

    });


    it("serial Port SetLedBrighter", async done => {
      // 設定DEMO時的LED燈亮度
      // 在Interact模式下才有效果
      try {
        let params = {
          DevID:0,
          groupID:1,
          Led1Bgt:1000,
          Led2Bgt:500,
          Led3Bgt:100,
          Led4Bgt:50,
          Led5Bgt:1000
        }
        let result = await services.hme.SetLedBrighter(params);
        console.log('SetLedBrighter result',result);
        result.should.be.true;
        done();
      } catch (e) {
        done(e);
      }

    });
  });
