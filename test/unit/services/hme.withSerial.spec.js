
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

    it("serial Port uartDataTxRx", async done => {

      try {
        let restComm = [128,1,0,0,0,0,0,50,1,0,0,0,0,0,1,0,0,53,1,0];
        let params = {
          Comm:restComm,
          RxLen:8,
          waitTime:20
        }
        let result = await services.hme.uartDataTxRx(params);
        //result.should.be.equal[ 192, 1, 0, 0, 50, 115, 1, 0 ];
        console.log('UartTxRx result',result);
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
        //測試特定devID之燈具
        let devID = 1;
        let result = await services.hme.testDevID(devID);
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
        // 當devID != 0，groupID設定無效
        // devID == 0 && groupID == 0，測試全部裝置
        let devID = 1;
        let groupID = 1;
        let result = await services.hme.testDevice(devID, groupID);
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
        let devID = 1;
        let groupID = 1;
        let CtrlMode = 'Normal';
        let result = await services.hme.setLedCtrlMode(devID, groupID, CtrlMode);
        console.log('setLedCtrlMode result',result);
        result.should.be.true;
        done();
      } catch (e) {
        done(e);
      }

    });

    it("serial Port setLedDisplayMode", async done => {
      //設定燈具固定顯示特定色光
      // cycle:預設模式, 根據Schedule設定顯示燈光
      // fullPower, 6500k...blueRed:燈具固定顯示特定色光, 持續不變
      // 固定顯示特定色光時，不接受使用者即時改變燈光
      //進入Schedule頁面時,務必重設'cycle'模式
      try {
        let params = {
          devID: 1,
          groupID: 1,
          mode: '2950k'
        }
        //mode: cycle, fullPower, 6500k, 4600k, 2950k, savingE, blueRed

        let result = await services.hme.setLedDisplayMode(params);
        console.log('setLedDisplayMode result',result);
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
          devID:1,
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
          devID:1,
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


    it("serial Port setSimRtc", async done => {
      try {
        let params = {
          devID: 1,
          groupID: 0,
          year: 2016,
          month: 1,
          day: 18,
          hour: 7,
          min: 11,
          sec: 0
        }
        let result = await services.hme.setSimRtc(params);
        await services.hme.setSimRtcFunc(params.devID, params.groupID, 'init');
        console.log('setSimRtc result',result);
        result.should.be.true;
        done();
      } catch (e) {
        done(e);
      }

    });

    it("serial Port getSimRtc", async done => {
      try {
        let devID = 1;
        let groupID = 1;
        let params = {
          devID: 1,
          groupID: 1,
          year: 2017,
          month: 1,
          day: 5,
          hour: 6,
          min: 11,
          sec: 5
        }
        //await services.hme.setSimRtc(params);
        let result = await services.hme.getSimRtc(devID, groupID);
        console.log('getSimRtc result',result);
        //result.should.be.true;
        done();
      } catch (e) {
        done(e);
      }

    });

    it("serial Port setSimRtcFunc", async done => {
      try {
        let devID = 1;
        let groupID = 1;
        let func = 'init'
        // func = 'init', 'run', 'stop'

        let result = await services.hme.setSimRtcFunc(devID, groupID, func);
        console.log('setSimRtc result',result);
        result.should.be.true;
        done();
      } catch (e) {
        done(e);
      }

    });




    it("serial Port setLedDisplay", async done => {
      // 即時改變LED燈亮度
      // 同時設定為Interact模式
      try {
        let params = {
                      devID:1,
                      groupID:0,
                      WW:10,
                      DB:30,
                      BL:60,
                      GR:80,
                      RE:100,
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
        let devID = 1;
        let groupID = 6;
        let result = await services.hme.setGroupID(devID, groupID);
        console.log('setGroupID result',result);
        result.should.be.true;
        done();
      } catch (e) {
        done(e);
      }

    });

    it("serial Port setDayTab", async done => {

      try {
        let devID = 1;
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
        let result = await services.hme.setDayTab(devID, groupID, dayTab);
        await services.hme.writeFlashMemory(devID, groupID);  //寫入Flash
        console.log('setDayTab result',result);
        result.should.be.true;
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
        result[0].should.have.any.keys('devID');
        result[0].should.have.any.keys('DevGroup');
        done();
      } catch (e) {
        done(e);
      }

    });

    it("serial Port writeTimeTabToDevices", async done => {

      try {
        // writeTimeTabToDevices
        // 用於Slave設定旗下所有Device之Schedule
        // config共用單一設定, 其中Device與Group設置無效
        // config共計5個日程時段，一天12個設定點，每個設定點5(?)個通道
        // devList為Slave旗下所有Device之ID陣列
        // 具有Dev1，Dev2，Dev3時，devList = {devIDs:[1, 2, 3]}
        let config =  {
          Device: 1,
          Group: 0,
          Schedules: [{
            StartDate: '2016-01-01',
            Days: 7,
            Details: [{
                        weight: 1,
                        StartTime: '1:00',
                        ScheduleDetailConfig: {
                          WW: 10,
                          DB: 10,
                          BL: 10,
                          GR: 10,
                          RE: 10,
                          CCT: 10,
                          Bright: 10
                        }
                      },{
                        weight: 1,
                        StartTime: '02:00',
                        ScheduleDetailConfig: {
                          WW: 20,
                          DB: 20,
                          BL: 20,
                          GR: 20,
                          RE: 20,
                          CCT: 20,
                          Bright: 20
                        }
                      },{
                        weight: 1,
                        StartTime: '03:00',
                        ScheduleDetailConfig: {
                        WW: 30,
                        DB: 30,
                        BL: 30,
                        GR: 30,
                        RE: 30,
                        CCT: 30,
                        Bright: 30
                        }
                      },{
                        weight: 1,
                        StartTime: '04:00',
                        ScheduleDetailConfig: {
                        WW: 50,
                        DB: 50,
                        BL: 50,
                        GR: 50,
                        RE: 50,
                        CCT: 50,
                        Bright: 50
                        }
                      },{
                        weight: 1,
                        StartTime: '05:00',
                        ScheduleDetailConfig: {
                          WW: 50,
                          DB: 50,
                          BL: 50,
                          GR: 50,
                          RE: 50,
                          CCT: 50,
                          Bright: 50
                        }
                      },{
                        weight: 1,
                        StartTime: '06:00',
                        ScheduleDetailConfig: {
                          WW: 70,
                          DB: 70,
                          BL: 70,
                          GR: 70,
                          RE: 70,
                          CCT: 70,
                          Bright: 70
                        }
                      },{
                        weight: 1,
                        StartTime: '07:00',
                        ScheduleDetailConfig: {
                        WW: 85,
                        DB: 85,
                        BL: 85,
                        GR: 85,
                        RE: 85,
                        CCT: 85,
                        Bright: 85
                        }
                      },{
                        weight: 1,
                        StartTime: '08:00',
                        ScheduleDetailConfig: {
                        WW: 60,
                        DB: 60,
                        BL: 60,
                        GR: 60,
                        RE: 60,
                        CCT: 60,
                        Bright: 60
                        }
                      },{
                        weight: 1,
                        StartTime: '09:00',
                        ScheduleDetailConfig: {
                          WW: 30,
                          DB: 30,
                          BL: 30,
                          GR: 30,
                          RE: 30,
                          CCT: 30,
                          Bright: 30
                        }
                      },{
                        weight: 1,
                        StartTime: '10:00',
                        ScheduleDetailConfig: {
                          WW: 25,
                          DB: 25,
                          BL: 25,
                          GR: 25,
                          RE: 25,
                          CCT: 25,
                          Bright: 25
                        }
                      },{
                        weight: 1,
                        StartTime: '11:00',
                        ScheduleDetailConfig: {
                        WW: 15,
                        DB: 15,
                        BL: 15,
                        GR: 15,
                        RE: 15,
                        CCT: 15,
                        Bright: 15
                        }
                      },{
                        weight: 1,
                        StartTime: '12:00',
                        ScheduleDetailConfig: {
                        WW: 5,
                        DB: 5,
                        BL: 5,
                        GR: 5,
                        RE: 5,
                        CCT: 5,
                        Bright: 5
                      }
                  }]
          },
          {
            StartDate: '2016-01-08',
            Days: 10,
            Details: [{
                        weight: 1,
                        StartTime: '02:11',
                        ScheduleDetailConfig: {
                          WW: 10,
                          DB: 10,
                          BL: 10,
                          GR: 10,
                          RE: 10,
                          CCT: 10,
                          Bright: 10
                        }
                      },{
                        weight: 1,
                        StartTime: '03:22',
                        ScheduleDetailConfig: {
                          WW: 20,
                          DB: 20,
                          BL: 20,
                          GR: 20,
                          RE: 20,
                          CCT: 20,
                          Bright: 20
                        }
                      },{
                        weight: 1,
                        StartTime: '04:33',
                        ScheduleDetailConfig: {
                        WW: 30,
                        DB: 30,
                        BL: 30,
                        GR: 30,
                        RE: 30,
                        CCT: 30,
                        Bright: 30
                        }
                      },{
                        weight: 1,
                        StartTime: '05:44',
                        ScheduleDetailConfig: {
                        WW: 50,
                        DB: 50,
                        BL: 50,
                        GR: 50,
                        RE: 50,
                        CCT: 50,
                        Bright: 50
                        }
                      },{
                        weight: 1,
                        StartTime: '06:55',
                        ScheduleDetailConfig: {
                          WW: 50,
                          DB: 50,
                          BL: 50,
                          GR: 50,
                          RE: 50,
                          CCT: 50,
                          Bright: 50
                        }
                      },{
                        weight: 1,
                        StartTime: '07:10',
                        ScheduleDetailConfig: {
                          WW: 70,
                          DB: 70,
                          BL: 70,
                          GR: 70,
                          RE: 70,
                          CCT: 70,
                          Bright: 70
                        }
                      },{
                        weight: 1,
                        StartTime: '08:20',
                        ScheduleDetailConfig: {
                        WW: 85,
                        DB: 85,
                        BL: 85,
                        GR: 85,
                        RE: 85,
                        CCT: 85,
                        Bright: 85
                        }
                      },{
                        weight: 1,
                        StartTime: '09:30',
                        ScheduleDetailConfig: {
                        WW: 60,
                        DB: 60,
                        BL: 60,
                        GR: 60,
                        RE: 60,
                        CCT: 60,
                        Bright: 60
                        }
                      },{
                        weight: 1,
                        StartTime: '10:40',
                        ScheduleDetailConfig: {
                          WW: 30,
                          DB: 30,
                          BL: 30,
                          GR: 30,
                          RE: 30,
                          CCT: 30,
                          Bright: 30
                        }
                      },{
                        weight: 1,
                        StartTime: '11:50',
                        ScheduleDetailConfig: {
                          WW: 25,
                          DB: 25,
                          BL: 25,
                          GR: 25,
                          RE: 25,
                          CCT: 25,
                          Bright: 25
                        }
                      },{
                        weight: 1,
                        StartTime: '12:12',
                        ScheduleDetailConfig: {
                        WW: 15,
                        DB: 15,
                        BL: 15,
                        GR: 15,
                        RE: 15,
                        CCT: 15,
                        Bright: 15
                        }
                      },{
                        weight: 1,
                        StartTime: '22:00',
                        ScheduleDetailConfig: {
                        WW: 5,
                        DB: 5,
                        BL: 5,
                        GR: 5,
                        RE: 5,
                        CCT: 5,
                        Bright: 5
                      }
                  }]
          },
          {
            StartDate: '2016-01-18',
            Days: 3,
            Details: [{
                        weight: 1,
                        StartTime: '02:11',
                        ScheduleDetailConfig: {
                          WW: 0,
                          DB: 0,
                          BL: 0,
                          GR: 0,
                          RE: 0,
                          CCT: 0,
                          Bright: 0
                        }
                      },{
                        weight: 1,
                        StartTime: '03:22',
                        ScheduleDetailConfig: {
                          WW: 10,
                          DB: 10,
                          BL: 10,
                          GR: 10,
                          RE: 10,
                          CCT: 10,
                          Bright: 10
                        }
                      },{
                        weight: 1,
                        StartTime: '04:33',
                        ScheduleDetailConfig: {
                        WW: 30,
                        DB: 30,
                        BL: 30,
                        GR: 30,
                        RE: 30,
                        CCT: 30,
                        Bright: 30
                        }
                      },{
                        weight: 1,
                        StartTime: '05:44',
                        ScheduleDetailConfig: {
                        WW: 50,
                        DB: 50,
                        BL: 50,
                        GR: 50,
                        RE: 50,
                        CCT: 50,
                        Bright: 50
                        }
                      },{
                        weight: 1,
                        StartTime: '06:55',
                        ScheduleDetailConfig: {
                          WW: 50,
                          DB: 50,
                          BL: 50,
                          GR: 50,
                          RE: 50,
                          CCT: 50,
                          Bright: 50
                        }
                      },{
                        weight: 1,
                        StartTime: '07:10',
                        ScheduleDetailConfig: {
                          WW: 100,
                          DB: 100,
                          BL: 100,
                          GR: 100,
                          RE: 100,
                          CCT: 100,
                          Bright: 100
                        }
                      },{
                        weight: 1,
                        StartTime: '08:20',
                        ScheduleDetailConfig: {
                        WW: 100,
                        DB: 100,
                        BL: 100,
                        GR: 100,
                        RE: 100,
                        CCT: 100,
                        Bright: 100
                        }
                      },{
                        weight: 1,
                        StartTime: '09:30',
                        ScheduleDetailConfig: {
                        WW: 60,
                        DB: 60,
                        BL: 60,
                        GR: 60,
                        RE: 60,
                        CCT: 60,
                        Bright: 60
                        }
                      },{
                        weight: 1,
                        StartTime: '10:40',
                        ScheduleDetailConfig: {
                          WW: 30,
                          DB: 30,
                          BL: 30,
                          GR: 30,
                          RE: 30,
                          CCT: 30,
                          Bright: 30
                        }
                      },{
                        weight: 1,
                        StartTime: '11:50',
                        ScheduleDetailConfig: {
                          WW: 25,
                          DB: 25,
                          BL: 25,
                          GR: 25,
                          RE: 25,
                          CCT: 25,
                          Bright: 25
                        }
                      },{
                        weight: 1,
                        StartTime: '12:12',
                        ScheduleDetailConfig: {
                        WW: 15,
                        DB: 15,
                        BL: 15,
                        GR: 15,
                        RE: 15,
                        CCT: 15,
                        Bright: 15
                        }
                      },{
                        weight: 1,
                        StartTime: '22:00',
                        ScheduleDetailConfig: {
                        WW: 5,
                        DB: 5,
                        BL: 5,
                        GR: 5,
                        RE: 5,
                        CCT: 5,
                        Bright: 5
                      }
                  }]
          },
          {
            StartDate: '2016-01-20',
            Days: 2,
            Details: [{
                        weight: 1,
                        StartTime: '02:11',
                        ScheduleDetailConfig: {
                          WW: 10,
                          DB: 10,
                          BL: 10,
                          GR: 10,
                          RE: 10,
                          CCT: 10,
                          Bright: 10
                        }
                      },{
                        weight: 1,
                        StartTime: '03:22',
                        ScheduleDetailConfig: {
                          WW: 20,
                          DB: 20,
                          BL: 20,
                          GR: 20,
                          RE: 20,
                          CCT: 20,
                          Bright: 20
                        }
                      },{
                        weight: 1,
                        StartTime: '04:33',
                        ScheduleDetailConfig: {
                        WW: 30,
                        DB: 30,
                        BL: 30,
                        GR: 30,
                        RE: 30,
                        CCT: 30,
                        Bright: 30
                        }
                      },{
                        weight: 1,
                        StartTime: '05:44',
                        ScheduleDetailConfig: {
                        WW: 50,
                        DB: 50,
                        BL: 50,
                        GR: 50,
                        RE: 50,
                        CCT: 50,
                        Bright: 50
                        }
                      },{
                        weight: 1,
                        StartTime: '06:55',
                        ScheduleDetailConfig: {
                          WW: 50,
                          DB: 50,
                          BL: 50,
                          GR: 50,
                          RE: 50,
                          CCT: 50,
                          Bright: 50
                        }
                      },{
                        weight: 1,
                        StartTime: '07:10',
                        ScheduleDetailConfig: {
                          WW: 70,
                          DB: 70,
                          BL: 70,
                          GR: 70,
                          RE: 70,
                          CCT: 70,
                          Bright: 70
                        }
                      },{
                        weight: 1,
                        StartTime: '08:20',
                        ScheduleDetailConfig: {
                        WW: 85,
                        DB: 85,
                        BL: 85,
                        GR: 85,
                        RE: 85,
                        CCT: 85,
                        Bright: 85
                        }
                      },{
                        weight: 1,
                        StartTime: '09:30',
                        ScheduleDetailConfig: {
                        WW: 60,
                        DB: 60,
                        BL: 60,
                        GR: 60,
                        RE: 60,
                        CCT: 60,
                        Bright: 60
                        }
                      },{
                        weight: 1,
                        StartTime: '10:40',
                        ScheduleDetailConfig: {
                          WW: 30,
                          DB: 30,
                          BL: 30,
                          GR: 30,
                          RE: 30,
                          CCT: 30,
                          Bright: 30
                        }
                      },{
                        weight: 1,
                        StartTime: '11:50',
                        ScheduleDetailConfig: {
                          WW: 25,
                          DB: 25,
                          BL: 25,
                          GR: 25,
                          RE: 25,
                          CCT: 25,
                          Bright: 25
                        }
                      },{
                        weight: 1,
                        StartTime: '12:12',
                        ScheduleDetailConfig: {
                        WW: 15,
                        DB: 15,
                        BL: 15,
                        GR: 15,
                        RE: 15,
                        CCT: 15,
                        Bright: 15
                        }
                      },{
                        weight: 1,
                        StartTime: '22:00',
                        ScheduleDetailConfig: {
                        WW: 5,
                        DB: 5,
                        BL: 5,
                        GR: 5,
                        RE: 5,
                        CCT: 5,
                        Bright: 5
                      }
                  }]
          },
          {
            StartDate: '2016-01-22',
            Days: 999,
            Details: [{
                        weight: 1,
                        StartTime: '02:11',
                        ScheduleDetailConfig: {
                          WW: 10,
                          DB: 10,
                          BL: 10,
                          GR: 10,
                          RE: 10,
                          CCT: 10,
                          Bright: 10
                        }
                      },{
                        weight: 1,
                        StartTime: '03:22',
                        ScheduleDetailConfig: {
                          WW: 20,
                          DB: 20,
                          BL: 20,
                          GR: 20,
                          RE: 20,
                          CCT: 20,
                          Bright: 20
                        }
                      },{
                        weight: 1,
                        StartTime: '04:33',
                        ScheduleDetailConfig: {
                        WW: 30,
                        DB: 30,
                        BL: 30,
                        GR: 30,
                        RE: 30,
                        CCT: 30,
                        Bright: 30
                        }
                      },{
                        weight: 1,
                        StartTime: '05:44',
                        ScheduleDetailConfig: {
                        WW: 50,
                        DB: 50,
                        BL: 50,
                        GR: 50,
                        RE: 50,
                        CCT: 50,
                        Bright: 50
                        }
                      },{
                        weight: 1,
                        StartTime: '06:55',
                        ScheduleDetailConfig: {
                          WW: 50,
                          DB: 50,
                          BL: 50,
                          GR: 50,
                          RE: 50,
                          CCT: 50,
                          Bright: 50
                        }
                      },{
                        weight: 1,
                        StartTime: '07:10',
                        ScheduleDetailConfig: {
                          WW: 70,
                          DB: 70,
                          BL: 70,
                          GR: 70,
                          RE: 70,
                          CCT: 70,
                          Bright: 70
                        }
                      },{
                        weight: 1,
                        StartTime: '08:20',
                        ScheduleDetailConfig: {
                        WW: 85,
                        DB: 85,
                        BL: 85,
                        GR: 85,
                        RE: 85,
                        CCT: 85,
                        Bright: 85
                        }
                      },{
                        weight: 1,
                        StartTime: '09:30',
                        ScheduleDetailConfig: {
                        WW: 60,
                        DB: 60,
                        BL: 60,
                        GR: 60,
                        RE: 60,
                        CCT: 60,
                        Bright: 60
                        }
                      },{
                        weight: 1,
                        StartTime: '10:40',
                        ScheduleDetailConfig: {
                          WW: 30,
                          DB: 30,
                          BL: 30,
                          GR: 30,
                          RE: 30,
                          CCT: 30,
                          Bright: 30
                        }
                      },{
                        weight: 1,
                        StartTime: '11:50',
                        ScheduleDetailConfig: {
                          WW: 25,
                          DB: 25,
                          BL: 25,
                          GR: 25,
                          RE: 25,
                          CCT: 25,
                          Bright: 25
                        }
                      },{
                        weight: 1,
                        StartTime: '12:12',
                        ScheduleDetailConfig: {
                        WW: 15,
                        DB: 15,
                        BL: 15,
                        GR: 15,
                        RE: 15,
                        CCT: 15,
                        Bright: 15
                        }
                      },{
                        weight: 1,
                        StartTime: '22:00',
                        ScheduleDetailConfig: {
                        WW: 5,
                        DB: 5,
                        BL: 5,
                        GR: 5,
                        RE: 5,
                        CCT: 5,
                        Bright: 5
                      }
                  }]
          }]
        }
        let devList = {devIDs:[1, 2]};
        let result = await services.hme.writeTimeTabToDevices(config, devList);
        console.log('writeTimeTabToDevices result',result);
        result.should.be.true;
        done();
      } catch (e) {
        done(e);
      }

    });

    it.only("serial Port setFastRun", async done => {
      // 設定快轉預覽時程設定照明效果
      try {
        let devID = 0;
        let groupID = 0;
        let rate = 2000
        let timeTab = [{
                    weight: 1,
                    StartTime: '00:00',
                    ScheduleDetailConfig: {
                      WW: 100,
                      DB: 0,
                      BL: 0,
                      GR: 0,
                      RE: 0,
                      CCT: 0,
                      Bright: 100
                    }
                  },{
                    weight: 1,
                    StartTime: '02:00',
                    ScheduleDetailConfig: {
                      WW: 0,
                      DB: 100,
                      BL: 0,
                      GR: 0,
                      RE: 0,
                      CCT: 0,
                      Bright: 100
                    }
                  },{
                    weight: 1,
                    StartTime: '04:00',
                    ScheduleDetailConfig: {
                    WW: 0,
                    DB: 0,
                    BL: 100,
                    GR: 0,
                    RE: 0,
                    CCT: 0,
                    Bright: 100
                    }
                  },{
                    weight: 1,
                    StartTime: '06:00',
                    ScheduleDetailConfig: {
                    WW: 0,
                    DB: 0,
                    BL: 0,
                    GR: 100,
                    RE: 0,
                    CCT: 0,
                    Bright: 100
                    }
                  },{
                    weight: 1,
                    StartTime: '08:00',
                    ScheduleDetailConfig: {
                      WW: 0,
                      DB: 0,
                      BL: 0,
                      GR: 0,
                      RE: 100,
                      CCT: 0,
                      Bright: 100
                    }
                  },{
                    weight: 1,
                    StartTime: '10:10',
                    ScheduleDetailConfig: {
                      WW: 70,
                      DB: 70,
                      BL: 70,
                      GR: 70,
                      RE: 70,
                      CCT: 70,
                      Bright: 70
                    }
                  },{
                    weight: 1,
                    StartTime: '08:20',
                    ScheduleDetailConfig: {
                    WW: 85,
                    DB: 85,
                    BL: 85,
                    GR: 85,
                    RE: 85,
                    CCT: 85,
                    Bright: 85
                    }
                  },{
                    weight: 1,
                    StartTime: '09:30',
                    ScheduleDetailConfig: {
                    WW: 60,
                    DB: 60,
                    BL: 60,
                    GR: 60,
                    RE: 60,
                    CCT: 60,
                    Bright: 60
                    }
                  },{
                    weight: 1,
                    StartTime: '10:00',
                    ScheduleDetailConfig: {
                      WW: 100,
                      DB: 100,
                      BL: 100,
                      GR: 100,
                      RE: 100,
                      CCT: 0,
                      Bright: 100
                    }
                  },{
                    weight: 1,
                    StartTime: '11:50',
                    ScheduleDetailConfig: {
                      WW: 25,
                      DB: 25,
                      BL: 25,
                      GR: 25,
                      RE: 25,
                      CCT: 25,
                      Bright: 25
                    }
                  },{
                    weight: 1,
                    StartTime: '12:12',
                    ScheduleDetailConfig: {
                    WW: 15,
                    DB: 15,
                    BL: 15,
                    GR: 15,
                    RE: 15,
                    CCT: 15,
                    Bright: 15
                    }
                  },{
                    weight: 1,
                    StartTime: '22:00',
                    ScheduleDetailConfig: {
                    WW: 5,
                    DB: 5,
                    BL: 5,
                    GR: 5,
                    RE: 5,
                    CCT: 5,
                    Bright: 5
                  }
              }];

        let result = await services.hme.setFastRun(devID, groupID, rate, timeTab);

        let timeParams = {
          devID: devID,
          groupID: groupID,
          year: 1900,
          month: 1,
          day: 1,
          hour: 0,
          min: 0,
          sec: 0
        }
        let T2id = setTimeout(function(){
          console.log('Start FastRun');
          clearInterval(TiID);

          console.log('setFastRun result',result);
          result.should.be.true;
          done();

        },60000 );
        let time = new Date(1900, 1, 1, 0, 0, 0);
        let TiID = setInterval(function(){
          time.setMinutes(time.getMinutes() + 30 );
          timeParams.hour = time.getHours();
          timeParams.min = time.getMinutes();
          console.log('timeParams=', timeParams);
          services.hme.setSimRtc(timeParams);
        }, 1000);


      } catch (e) {
        done(e);
      }

    });

    it("serial Port accessDevice", async done => {

      try {
        let params = {
                      devID: 1,
                      groupID: 0,
                      sFunc: 'WordRd',
                      u8DataNum: 2,
                      u8Addr_Arry: [200],
                      u8DataIn_Arry: [],
                      u8Mask_Arry: [],
                      RepeatNum: 2
                    }
        let result = await services.hme.accessDevice(params);
        console.log('accessDevice result',result);
        result.ramData.should.be.Array;

        done();
      } catch (e) {
        done(e);
      }

    });


  });
