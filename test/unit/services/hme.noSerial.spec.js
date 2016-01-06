
describe("hme without seriel port", () => {

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


  it("ClientOp.CopBitInv", done => {
    try {
      //CopWordRd = function(u8DevID, GroupNum, u8FuncCT, u8DataNum, u8Addr_Arry)
      let params = {
        u8DevID:0xa55,
        GroupNum:0x00,
        sFunc:'BitInv',
        u8DataNum:2,
        u8Addr_Arry:[0xf125,0x123],
        u8DataIn_Arry:[],
        u8Mask_Arry:[0xffff,0xeeee],
        RepeatNum:1
      }
      let result = services.hme.encode.ClientOp(params);
      result[0].should.be.equal(128);
      result[1].should.be.equal(85);
      result[2].should.be.equal(20);
      result[3].should.be.equal(0);
      result[4].should.be.equal(0);
      result[5].should.be.equal(0);
      result[6].should.be.equal(0);
      result[7].should.be.equal(18);
      result[8].should.be.equal(2);
      result[9].should.be.equal(0);
      result[10].should.be.equal(0);
      result[11].should.be.equal(37);
      result[12].should.be.equal(98);
      result[13].should.be.equal(3);
      result[14].should.be.equal(35);
      result[15].should.be.equal(2);
      result[16].should.be.equal(0);
      result[17].should.be.equal(127);
      result[18].should.be.equal(127);
      result[19].should.be.equal(3);
      result[20].should.be.equal(110);
      result[21].should.be.equal(93);
      result[22].should.be.equal(3);
      result[23].should.be.equal(123);
      result[24].should.be.equal(6);
      result[25].should.be.equal(0);
      console.log(result);
      done();
    } catch (e) {
      done(e);
    }
  });

  it("RxDecode", done => {
    try {
      let testArry = [192, 1, 0, 0, 50, 115, 1, 0];
      let params = {
          FuncCT:50,
          DevID:1,
          u8RxDataArry:testArry
        };
      let result = services.hme.encode.RxDecode(params);
      console.log('RxDecode = ', result);
      done();
    } catch (e) {
      done(e);
    }
  });

  it.only("configToTimeTabArry", done => {
    try {
      let config = [
          {
            StartDate: '2016-01-01',
            Days: 7,
            Device: 1,
            Group: 1,
            ScheduleDetails: [
              {
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
          }
        ]
      },
      {
        StartDate: '2016-01-08',
        Days: 30,
        Device: 1,
        Group: 1,
        ScheduleDetails: [
          {
            weight: 1,
            StartTime: '01:10',
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
            StartTime: '02:20',
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
            StartTime: '03:30',
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
            StartTime: '04:40',
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
            StartTime: '05:50',
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
            StartTime: '06:06',
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
            StartTime: '07:07',
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
            StartTime: '08:08',
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
            StartTime: '09:09',
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
            StartTime: '10:10',
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
            StartTime: '11:11',
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
            StartTime: '12:12',
            ScheduleDetailConfig: {
            WW: 5,
            DB: 5,
            BL: 5,
            GR: 5,
            RE: 5,
            CCT: 5,
            Bright: 5
          }
      }
    ]
      }

      ]
      let result = services.hme.encode.configToTimeTabArry(config);
      console.log('RxDecode = ', result);
      done();
    } catch (e) {
      done(e);
    }
  });



});
