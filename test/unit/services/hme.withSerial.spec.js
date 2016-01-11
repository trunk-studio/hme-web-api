
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

    it("serial Port testDevice", async done => {

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

    it("serial Port setLedCtrlMode", async done => {
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
        let result = await services.hme.setLedCtrlMode(DevID, groupID, CtrlMode);
        console.log('setLedCtrlMode result',result);
        result.should.be.true;
        done();
      } catch (e) {
        done(e);
      }

    });


    it("serial Port setLedBrighter", async done => {
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
        let result = await services.hme.setLedBrighter(params);
        console.log('setLedBrighter result',result);
        result.should.be.true;
        done();
      } catch (e) {
        done(e);
      }

    });

    it("serial Port setLedBrigh", async done => {
      // 設定DEMO時的LED燈亮度
      // 在Interact模式下才有效果
      // LedCH: All, LedCH1, LedCH2, LedCH3, LedCH4, LedCH5
      // BrighNum: 1~10000
      try {
        let params = {
          DevID:1,
          groupID:1,
          LedCH:'LedCH2',
          BrighNum:800
        }
        let result = await services.hme.setLedBrigh(params);
        console.log('setLedBrigh result',result);
        result.should.be.true;
        done();
      } catch (e) {
        done(e);
      }

    });


    it.only("serial Port setLedDisplay", async done => {
      // 即時改變LED燈亮度
      // 同時設定為Interact模式
      try {
        let params = {
                      DevID:1,
                      groupID:0,
                      WWBright:10,
                      DBBright:30,
                      BLBright:60,
                      GRBright:80,
                      REBright:100,
                      Bright:5
                    }
        let result = await services.hme.setLedDisplay(params);
        console.log('setLedDisplay result',result);
        result.should.be.true;
        done();
      } catch (e) {
        done(e);
      }
    });


    it("serial Port setGroupID", async done => {

      try {
        //將Device1的groupID設為6
        let DevID = 1;
        let groupID = 6;
        let result = await services.hme.setGroupID(DevID, groupID);
        console.log('setGroupID result',result);
        result.should.be.true;
        done();
      } catch (e) {
        done(e);
      }

    });

    it("serial Port setDayTab", async done => {

      try {
        let DevID = 1;
        let groupID = 1;
        // [date1[year, month, day], ..., date6[...]]
        let dayTab = [
                   ...[2016, 2, 1],
                   ...[2016, 2, 5],
                   ...[2016, 2, 8],
                   ...[2016, 2, 10],
                   ...[2016, 3, 10],
                   ...[2016, 6, 20]
                 ];
        let result = await services.hme.setDayTab(DevID, groupID, dayTab);
        await services.hme.writeFlashMemory(DevID, groupID);  //寫入Flash
        console.log('setDayTab result',result);
        result.should.be.true;
        done();
      } catch (e) {
        done(e);
      }

    });

    // it("serial Port writeTimeTabToDevice", async done => {
    //
    //   try {
    //     //將Device1的groupID設為6
    //     let DevID = 1;
    //     //TimeTabt
    //     //共計5個日程時段，一天12個設定點，每個設定點5(?)個通道
    //     let config = [
    //         {
    //           StartDate: '2016-01-01',
    //           Days: 7,
    //           Device: 1,
    //           Group: 1,
    //           ScheduleDetails: [
    //             {
    //               weight: 1,
    //               StartTime: '01:00',
    //               ScheduleDetailConfig: {
    //                 WW: 10,
    //                 DB: 10,
    //                 BL: 10,
    //                 GR: 10,
    //                 RE: 10,
    //                 CCT: 10,
    //                 Bright: 10
    //               }
    //             },{
    //               weight: 1,
    //               StartTime: '02:00',
    //               ScheduleDetailConfig: {
    //                 WW: 20,
    //                 DB: 20,
    //                 BL: 20,
    //                 GR: 20,
    //                 RE: 20,
    //                 CCT: 20,
    //                 Bright: 20
    //               }
    //             },{
    //               weight: 1,
    //               StartTime: '03:00'
    //               WW: 30,
    //               DB: 30,
    //               BL: 30,
    //               GR: 30,
    //               RE: 30,
    //               CCT: 30,
    //               Bright: 30
    //             },{
    //               weight: 1,
    //               StartTime: '04:00'
    //               WW: 50,
    //               DB: 50,
    //               BL: 50,
    //               GR: 50,
    //               RE: 50,
    //               CCT: 50,
    //               Bright: 50
    //             },{
    //               weight: 1,
    //               StartTime: '05:00',
    //               ScheduleDetailConfig: {
    //                 WW: 50,
    //                 DB: 50,
    //                 BL: 50,
    //                 GR: 50,
    //                 RE: 50,
    //                 CCT: 50,
    //                 Bright: 50
    //               }
    //             },{
    //               weight: 1,
    //               StartTime: '06:00',
    //               ScheduleDetailConfig: {
    //                 WW: 70,
    //                 DB: 70,
    //                 BL: 70,
    //                 GR: 70,
    //                 RE: 70,
    //                 CCT: 70,
    //                 Bright: 70
    //               }
    //             },{
    //               weight: 1,
    //               StartTime: '07:00'
    //               WW: 85,
    //               DB: 85,
    //               BL: 85,
    //               GR: 85,
    //               RE: 85,
    //               CCT: 85,
    //               Bright: 85
    //             },{
    //               weight: 1,
    //               StartTime: '08:00'
    //               WW: 60,
    //               DB: 60,
    //               BL: 60,
    //               GR: 60,
    //               RE: 60,
    //               CCT: 60,
    //               Bright: 60
    //             },{
    //               weight: 1,
    //               StartTime: '09:00',
    //               ScheduleDetailConfig: {
    //                 WW: 30,
    //                 DB: 30,
    //                 BL: 30,
    //                 GR: 30,
    //                 RE: 30,
    //                 CCT: 30,
    //                 Bright: 30
    //               }
    //             },{
    //               weight: 1,
    //               StartTime: '10:00',
    //               ScheduleDetailConfig: {
    //                 WW: 25,
    //                 DB: 25,
    //                 BL: 25,
    //                 GR: 25,
    //                 RE: 25,
    //                 CCT: 25,
    //                 Bright: 25
    //               }
    //             },{
    //               weight: 1,
    //               StartTime: '11:00'
    //               WW: 15,
    //               DB: 15,
    //               BL: 15,
    //               GR: 15,
    //               RE: 15,
    //               CCT: 15,
    //               Bright: 15
    //             },{
    //               weight: 1,
    //               StartTime: '12:00'
    //               WW: 5,
    //               DB: 5,
    //               BL: 5,
    //               GR: 5,
    //               RE: 5,
    //               CCT: 5,
    //               Bright: 5
    //             }
    //           ]
    //         },{
    //           StartDate: '2016-01-08',
    //           Days: 7,
    //           Device: 1,
    //           Group: 1,
    //           ScheduleDetails: [
    //             {
    //               weight: 1,
    //               StartTime: '01:00',
    //               ScheduleDetailConfig: {
    //                 WW: 10,
    //                 DB: 10,
    //                 BL: 10,
    //                 GR: 10,
    //                 RE: 10,
    //                 CCT: 10,
    //                 Bright: 10
    //               }
    //             },{
    //               weight: 1,
    //               StartTime: '02:00',
    //               ScheduleDetailConfig: {
    //                 WW: 20,
    //                 DB: 20,
    //                 BL: 20,
    //                 GR: 20,
    //                 RE: 20,
    //                 CCT: 20,
    //                 Bright: 20
    //               }
    //             },{
    //               weight: 1,
    //               StartTime: '03:00'
    //               WW: 30,
    //               DB: 30,
    //               BL: 30,
    //               GR: 30,
    //               RE: 30,
    //               CCT: 30,
    //               Bright: 30
    //             },{
    //               weight: 1,
    //               StartTime: '04:00'
    //               WW: 50,
    //               DB: 50,
    //               BL: 50,
    //               GR: 50,
    //               RE: 50,
    //               CCT: 50,
    //               Bright: 50
    //             },{
    //               weight: 1,
    //               StartTime: '05:00',
    //               ScheduleDetailConfig: {
    //                 WW: 50,
    //                 DB: 50,
    //                 BL: 50,
    //                 GR: 50,
    //                 RE: 50,
    //                 CCT: 50,
    //                 Bright: 50
    //               }
    //             },{
    //               weight: 1,
    //               StartTime: '06:00',
    //               ScheduleDetailConfig: {
    //                 WW: 70,
    //                 DB: 70,
    //                 BL: 70,
    //                 GR: 70,
    //                 RE: 70,
    //                 CCT: 70,
    //                 Bright: 70
    //               }
    //             },{
    //               weight: 1,
    //               StartTime: '07:00'
    //               WW: 85,
    //               DB: 85,
    //               BL: 85,
    //               GR: 85,
    //               RE: 85,
    //               CCT: 85,
    //               Bright: 85
    //             },{
    //               weight: 1,
    //               StartTime: '08:00'
    //               WW: 60,
    //               DB: 60,
    //               BL: 60,
    //               GR: 60,
    //               RE: 60,
    //               CCT: 60,
    //               Bright: 60
    //             },{
    //               weight: 1,
    //               StartTime: '09:00',
    //               ScheduleDetailConfig: {
    //                 WW: 30,
    //                 DB: 30,
    //                 BL: 30,
    //                 GR: 30,
    //                 RE: 30,
    //                 CCT: 30,
    //                 Bright: 30
    //               }
    //             },{
    //               weight: 1,
    //               StartTime: '10:00',
    //               ScheduleDetailConfig: {
    //                 WW: 25,
    //                 DB: 25,
    //                 BL: 25,
    //                 GR: 25,
    //                 RE: 25,
    //                 CCT: 25,
    //                 Bright: 25
    //               }
    //             },{
    //               weight: 1,
    //               StartTime: '11:00'
    //               WW: 15,
    //               DB: 15,
    //               BL: 15,
    //               GR: 15,
    //               RE: 15,
    //               CCT: 15,
    //               Bright: 15
    //             },{
    //               weight: 1,
    //               StartTime: '12:00'
    //               WW: 5,
    //               DB: 5,
    //               BL: 5,
    //               GR: 5,
    //               RE: 5,
    //               CCT: 5,
    //               Bright: 5
    //             }
    //           ]
    //         }
    //       ]
    //
    //     let result = await services.hme.setGroupID(DevID, groupID);
    //     console.log('setGroupID result',result);
    //     result.should.be.true;
    //     done();
    //   } catch (e) {
    //     done(e);
    //   }
    //
    // });


  });
