

/* 建立 3 Bytes 的記憶體空間 */


export default class Encode {

  constructor () {
    this.data = 0xfeab;
    this.buf = new Buffer(3);
    this.buff = new Buffer([128,1,0,0,50,1,0,0,0,0,0,1,0,0,53,1,0]);
  }

  WordTo3Byte  (u16word) {
    //用於將1Word資料編碼為3Byte

    //u8Byte:用於存放轉好的資料,元素=Bytet,長度=3
    var u16ByteLHbuf = new Buffer([0x0,0x0]);
    //var u8Byte3buf = new Buffer([0x0,0x0,0x0]);
    var u8ByteArry = [0x0,0x0,0x0];
    u16ByteLHbuf.writeUInt16LE(u16word, 0);
    //console.log('u16Buf='+u16ByteLHbuf.toString('hex'));
    u8ByteArry[2] = u16ByteLHbuf[1] >> 6  ;
    u8ByteArry[0] = u16ByteLHbuf[0] & 0x7f;
    u16word = ( u16word << 1) & 0x7f00
    u16ByteLHbuf.writeUInt16LE(u16word, 0);
    u8ByteArry[1] = u16ByteLHbuf[1]
    //console.log(u8Byte3buf);
    // [FEAB]=>[2B, 7D, 03]
    return(u8ByteArry);
  };

  u3ByteToWord  (u3Byte) {
  	//將經編碼之3Byte資料解碼為1Word
  	return(u3Byte[0] + ((u3Byte[1]<<7)&0xff) + (((u3Byte[1]>>1) + (u3Byte[2]<<6))* 0x100));
  };

  WordListToAdd3ByteList ({Data_list, WordDatat_list}) {
  	//用於將WordTypeList編碼為3Byte,並加入3ByteTypeList中
    for (var i = 0; i < WordDatat_list.length; i++) {
  		Data_list = Data_list.concat(this.WordTo3Byte(WordDatat_list[i]));
    } ;
  	return(Data_list);
  };
  //?未測試
  DataListToChkSum3ByteList (Data_Arry) {
  	let u16ChkSum = 0;
  	for(var i = 0; i < Data_Arry.length; i++){
  		u16ChkSum = u16ChkSum + Data_Arry[i];
    }
  	u16ChkSum = u16ChkSum & 0xffff;
    console.log('u16ChkSum='+u16ChkSum);
  	return(this.WordTo3Byte(u16ChkSum));
  };


  CopBitModify (u8DevID, groupID, u8FuncCT, u8DataNum, u8Addr_Arry, u8DataIn_Arry, u8Mask_Arry){
    let u8DataOut_arry =[
      0x80,
      ...this.WordTo3Byte(u8DevID),
      ...this.WordTo3Byte(groupID),
      u8FuncCT,
      ...this.WordTo3Byte(u8DataNum)
    ];
    let addrParams = {
      Data_list: u8DataOut_arry,
      WordDatat_list: u8Addr_Arry
    }
    u8DataOut_arry = this.WordListToAdd3ByteList(addrParams);
    let dataParams = {
      Data_list: u8DataOut_arry,
      WordDatat_list: u8DataIn_Arry
    }
    u8DataOut_arry = this.WordListToAdd3ByteList(dataParams);
    let maskParams = {
      Data_list: u8DataOut_arry,
      WordDatat_list: u8Mask_Arry
    }
    u8DataOut_arry = this.WordListToAdd3ByteList(maskParams);
  	u8DataOut_arry = u8DataOut_arry.concat(this.DataListToChkSum3ByteList(u8DataOut_arry));
  	return (u8DataOut_arry);

    //this.CopBitModify(1, 17, 2, [1,235], [2,253], [233,222])
    //[128,1,0,0,17,2,0,0,1,0,0,107,1,0,2,0,0,125,1,0,105,1,0,94,1,0,74,4,0]
  };


  CopBitInv (u8DevID, groupID, u8FuncCT, u8DataNum, u8Addr_Arry, u8Mask_Arry){
    let u8DataOut_arry =[
      0x80,
      ...this.WordTo3Byte(u8DevID),
      ...this.WordTo3Byte(groupID),
      u8FuncCT,
      ...this.WordTo3Byte(u8DataNum)
    ];
    let addrParams = {
      Data_list: u8DataOut_arry,
      WordDatat_list: u8Addr_Arry
    }
    u8DataOut_arry = this.WordListToAdd3ByteList(addrParams);
    let maskParams = {
      Data_list: u8DataOut_arry,
      WordDatat_list: u8Mask_Arry
    }
    u8DataOut_arry = this.WordListToAdd3ByteList(maskParams);
  	u8DataOut_arry = u8DataOut_arry.concat(this.DataListToChkSum3ByteList(u8DataOut_arry));
  	return (u8DataOut_arry);
  };

  CopWordRd (u8DevID, groupID, u8FuncCT, u8DataNum, u8Addr_Arry){
    let u8DataOut_arry =[
      0x80,
      ...this.WordTo3Byte(u8DevID),
      ...this.WordTo3Byte(groupID),
      u8FuncCT,
      ...this.WordTo3Byte(u8DataNum)
    ];
    let addrParams = {
      Data_list: u8DataOut_arry,
      WordDatat_list: [u8Addr_Arry[0]]
    }
    u8DataOut_arry = this.WordListToAdd3ByteList(addrParams);
  	u8DataOut_arry = u8DataOut_arry.concat(this.DataListToChkSum3ByteList(u8DataOut_arry));
  	return (u8DataOut_arry);
    // TEST:
    // let params = {
    //   u8DevID:0xfff,
    //   groupID:0x00,
    //   sFunc:'WordRd',
    //   u8DataNum:5,
    //   u8Addr_Arry:[0x01,0xfff,0x123,0x555,0xf53],
    //   u8DataIn_Arry:[],
    //   u8Mask_Arry:[],
    //   RepeatNum:1
    // }
    //[ 128, 127, 31, 0, 0, 0, 0, 33, 5, 0, 0, 1, 0, 0, 69, 2, 0 ]
  };

  CopDiscWordRd (u8DevID, groupID, u8FuncCT, u8DataNum, u8Addr_Arry){
    let u8DataOut_arry =[
      0x80,
      ...this.WordTo3Byte(u8DevID),
      ...this.WordTo3Byte(groupID),
      u8FuncCT,
      ...this.WordTo3Byte(u8DataNum)
    ];
    let addrParams = {
      Data_list: u8DataOut_arry,
      WordDatat_list: u8Addr_Arry
    }
    u8DataOut_arry = this.WordListToAdd3ByteList(addrParams);
  	u8DataOut_arry = u8DataOut_arry.concat(this.DataListToChkSum3ByteList(u8DataOut_arry));
  	return (u8DataOut_arry);

    // let params = {
    //   u8DevID:0xfff,
    //   groupID:0x00,
    //   sFunc:'DiscWordRd',
    //   u8DataNum:5,
    //   u8Addr_Arry:[0x01,0xfff,0x123,0x555,0xf53],
    //   u8DataIn_Arry:[],
    //   u8Mask_Arry:[],
    //   RepeatNum:1
    // }
    // [ 128,127,31,0,0,0,0,34,5,0,0,1,0,0,127,31,0,35,2,0,85,10,0,83,30,0,89,5,0 ]

  };


  CopDiscWordWt (u8DevID, groupID, u8FuncCT, u8DataNum, u8Addr_Arry, u8DataIn_Arry){
    let u8DataOut_arry = [
      0x80,
      ...this.WordTo3Byte(u8DevID),
      ...this.WordTo3Byte(groupID),
      u8FuncCT,
      ...this.WordTo3Byte(u8DataNum)
    ];
    let addrParams = {
      Data_list: u8DataOut_arry,
      WordDatat_list: u8Addr_Arry
    }
    u8DataOut_arry = this.WordListToAdd3ByteList(addrParams);
    let dataParams = {
      Data_list: u8DataOut_arry,
      WordDatat_list: u8DataIn_Arry
    }
    u8DataOut_arry = this.WordListToAdd3ByteList(dataParams);
  	u8DataOut_arry = u8DataOut_arry.concat(this.DataListToChkSum3ByteList(u8DataOut_arry));
  	return (u8DataOut_arry);
    // let params = {
    //   u8DevID:0x5ff,
    //   groupID:0x00,
    //   sFunc:'DiscWordWt',
    //   u8DataNum:5,
    //   u8Addr_Arry:[0x01,0xfff,0x123,0x555,0xf53],
    //   u8DataIn_Arry:[0xfe3,0xef5,0xa33,0x563,0xa12],
    //   u8Mask_Arry:[],
    //   RepeatNum:1
    // }
    //[ 128,127,11,0,0,0,0,50,5,0,0,1,0,0,127,31,0,35,2,0,85,10,0,83,30,0,99,31,0,117,29,0,51,20,0,99,10,0,18,20,0,67,9,0 ]

  };


  CopWordWt (u8DevID, groupID, u8FuncCT, u8DataNum, u8Addr_Arry, u8DataIn_Arry){
    let u8DataOut_arry = [
      0x80,
      ...this.WordTo3Byte(u8DevID),
      ...this.WordTo3Byte(groupID),
      u8FuncCT,
      ...this.WordTo3Byte(u8DataNum)
    ];
  	// var u8Header = 0x80;
    // u8DataOut_arry.push(u8Header);
    // u8DataOut_arry = u8DataOut_arry.concat(this.WordTo3Byte(u8DevID));
    // u8DataOut_arry = u8DataOut_arry.concat(this.WordTo3Byte(groupID));
    // u8DataOut_arry.push(u8FuncCT);
    // u8DataOut_arry = u8DataOut_arry.concat(this.WordTo3Byte(u8DataNum));
    let addrParams = {
      Data_list: u8DataOut_arry,
      WordDatat_list: [u8Addr_Arry[0]]
    }
    u8DataOut_arry = this.WordListToAdd3ByteList(addrParams);
    let dataParams = {
      Data_list: u8DataOut_arry,
      WordDatat_list: u8DataIn_Arry
    }
    u8DataOut_arry = this.WordListToAdd3ByteList(dataParams);
  	u8DataOut_arry = u8DataOut_arry.concat(this.DataListToChkSum3ByteList(u8DataOut_arry));
  	return (u8DataOut_arry);
    // let params = {
    //   u8DevID:0x5ff,
    //   groupID:0x00,
    //   sFunc:'WordWt',
    //   u8DataNum:5,
    //   u8Addr_Arry:[0x01,0xfff,0x123,0x555,0xf53],
    //   u8DataIn_Arry:[0xfe3,0xef5,0xa33,0x563,0xa12],
    //   u8Mask_Arry:[],
    //   RepeatNum:1
    // }
    // let resu
    // [ 128,127,11,0,0,0,0,49,5,0,0,1,0,0,99,31,0,117,29,0,51,20,0,99,10,0,18,20,0,47,6,0 ]

  };
  //未測試
  ClientOp ({u8DevID, groupID, sFunc, u8DataNum, u8Addr_Arry, u8DataIn_Arry, u8Mask_Arry, RepeatNum}){
  	//用於進行通訊,讀寫操作燈具裝置之記憶體
  	//u8DevID = 裝置ID, sFunc = 記憶體操作方式, u8DataNum = 資料長度(Word)
  	//u8Addr_Arry = 欲操作之(燈具)記憶體位址, u8Mask_Arry = 位元操作遮罩, RepeatNum = 重傳次數上限

  	//sFunc:{'Inital':, 'Close':, 'BitModify':寫入特定位元, 'BitInv':翻轉特定位元, 'WordRd':讀取連續記憶體位置,
  	//	 'DiscWordRd':讀取非連續記憶體位置, 'WordWt':寫入連續記憶體位置, 'DiscWordWt':寫入非連續記憶體位置}

  	//要寫入串列通訊的資料
    // console.log('u8DevID', u8DevID);
    // console.log('groupID', groupID);
    // console.log('sFunc', sFunc);
    // console.log('u8DataNum', u8DataNum);
    // console.log('u8Addr_Arry', u8Addr_Arry);
    // console.log('u8DataIn_Arry', u8DataIn_Arry);
    // console.log('u8Mask_Arry', u8Mask_Arry);
    // console.log('RepeatNum', RepeatNum);

  	let u16DataWt_arry = [];

  	let FuncCommTable = {'Inital':0, 'Close':0, 'BitModify':17, 'BitInv':18, 'WordRd':33, 'DiscWordRd':34,
  					'WordWt':49, 'DiscWordWt':50};
    switch (sFunc) {
      case 'DiscWordWt':
        u16DataWt_arry = this.CopDiscWordWt(u8DevID, groupID, (FuncCommTable[sFunc] & 0x7f), u8DataNum, u8Addr_Arry, u8DataIn_Arry);
        break;
      case 'BitModify':
        u16DataWt_arry = this.CopBitModify(u8DevID, groupID, (FuncCommTable[sFunc] & 0x7f), u8DataNum, u8Addr_Arry, u8DataIn_Arry, u8Mask_Arry);
        break;
      case 'BitInv':
        u16DataWt_arry = this.CopBitInv(u8DevID, groupID, (FuncCommTable[sFunc] & 0x7f), u8DataNum, u8Addr_Arry, u8Mask_Arry);
        break;
      case 'WordRd':
        u16DataWt_arry = this.CopWordRd(u8DevID, groupID, (FuncCommTable[sFunc] & 0x7f), u8DataNum, u8Addr_Arry);
        break;
      case 'DiscWordRd':
        u16DataWt_arry = this.CopDiscWordRd(u8DevID, groupID, (FuncCommTable[sFunc] & 0x7f), u8DataNum, u8Addr_Arry);
        break;
      case 'WordWt':
        u16DataWt_arry = this.CopWordWt(u8DevID, groupID, (FuncCommTable[sFunc] & 0x7f), u8DataNum, u8Addr_Arry, u8DataIn_Arry);
        break;
      default:
        console.log('this.ClientOp_Func_ERROR');
        return(0);
    }
  	// //透過串列通訊寫入(u16DataWt_arry)並回傳回饋資料(u16ReData_list)
  	// return(SerialWR(u8DevID, u16DataWt_arry, sFunc, u8DataNum, RepeatNum))
    return(u16DataWt_arry);
  };


  RxDecode ({FuncCT, devID, u8RxDataArry, u8DataNum}){
    //檢查接收的資料並解碼
    let receiveData = {
      devID: undefined,
      commd: undefined,
      ramData: [],
      success: false
    }
    //分割資料段
    //驗證標頭正確性
    let u8RawHeader = u8RxDataArry[0];
    if (u8RawHeader != 0xC0) {
      console.log('HeaderErr')
      return(receiveData);
    }

    // #開始驗證接收資料完整性
    // #Check ChkSumErr
    let u8RawChkSumArry = u8RxDataArry.slice(u8RxDataArry.length-3,u8RxDataArry.length);
    let RespDataArry = u8RxDataArry.slice(0,u8RxDataArry.length-3);
    let u16ReChkSum = 0xffff & RespDataArry.reduce(function(a, b) { return a + b; });
    if (u16ReChkSum != this.u3ByteToWord(u8RawChkSumArry)) {
      console.log('ChkSumErr')
      return(receiveData);
    }
    if (FuncCT == 33 || FuncCT == 34) {
      if (u8RxDataArry.length != (8 + (u8DataNum * 3))) {
        console.log('DataLengErr')
        return(receiveData);
      }
    }else {
      if (u8RxDataArry.length != 8) {
        console.log('DataLengErr')
        return(receiveData);
      }
    }


    //驗證裝置ID正確性
    let u8RawIdArry = u8RxDataArry.slice(1,4);
    let reDevID = this.u3ByteToWord(u8RawIdArry);
    if (devID != reDevID) {
      console.log('DevIDErr')
      return(receiveData);
    }

    //驗證Comm正確性
    let u8RawCommand = u8RxDataArry[4];
    let reCommd = u8RawCommand;
    if (devID != reDevID) {
      console.log('CommErr')
      return(receiveData);
    }

    //驗證完成 寫入資料
    receiveData.devID = reDevID;
    receiveData.commd = reCommd;
    let u8RawDataArry = [];
    if(u8RxDataArry.length > 8){
      //沒有回傳記憶體資料時，封包標準長度為8Byte
      u8RawDataArry = u8RxDataArry.slice(5,u8RxDataArry.length-3);
    }

    let u8ReData2DArry = [];
    let u16ReDataArry = [];
    let BoolChk = 0;
    for (let i = 0; i < (u8RawDataArry.length/3); i++) {
      u8ReData2DArry[i] = (u8RawDataArry.slice(i*3,i*3+3));
    }
    // console.log(u8ReData2DArry);
    if(FuncCT == 33 || FuncCT == 34){
      //WordRd or DiscWordRd 需做檢查
      for (let i = 0; i < u8ReData2DArry.length; i++) {
        BoolChk +=  (u8ReData2DArry[i][0] & 0x80);
        BoolChk +=  (u8ReData2DArry[i][1] & 0x80);
        BoolChk +=  (u8ReData2DArry[i][2] & 0xfc);
      }
      if (BoolChk == 0) {
        for (let i = 0; i < (u8ReData2DArry.length); i++) {
          // #將原始接接收資料解碼( 3Byte to 1Word )
          u16ReDataArry = u16ReDataArry.concat(this.u3ByteToWord(u8ReData2DArry[i]));
        }
        receiveData.ramData = u16ReDataArry;
        receiveData.success = true;
        return(receiveData)
      } else {
        console.log('chk false');
        receiveData.success = false;
        return(receiveData)
      }
    }else {
      //其他都不需要做檢查，無記憶體資料回傳
      // console.log('No Data');
      receiveData.success = true;
      return(receiveData);
    }

    //檢查資料內容
    // console.log('ID = '+u8RawIdArry);
    // console.log('Data = '+u8RawDataArry);
    // console.log('Chk = '+u8RawChkSumArry);
    // console.log('Header = '+u8RawHeader);
    // console.log('Comm = '+u8RawCommand);





  };

  configToTimeTabArry (config){
    let ScheduleDetailsLen = 12;
    let dayTab = [];
    let dateLen = 0;
    let timePwmTab = [];
    let re = /(\d+):(\d+)/;
    let strST = '';
    let arrST = '';


    for (let i = 0; i < ScheduleDetailsLen; i++) {
      timePwmTab = [
        ...timePwmTab,
        ...[i * 2, 0, 0],  //h,m,s
        ...[0, 0, 0, 0, 0]  //CH1~CH5
      ];
    }

    for (let i = 0; i < 6; i++) {
      if (config.Schedules[i] != undefined) {
        // Date-->
        dateLen = config.Schedules[i].Days;
        var startDate = new Date(config.Schedules[i].StartDate);
        dayTab = [
          ...dayTab,
          startDate.getFullYear(),
          startDate.getMonth() + 1, //0~11
          startDate.getDate()
        ];
        // <--Date

        for (var j = 0; j < ScheduleDetailsLen; j++) {
          strST = config.Schedules[i].Details[j].StartTime;
          arrST = strST.match(re);
          let Bright = config.Schedules[i].Details[j].ScheduleDetailConfig.Bright
          timePwmTab = [
            ...timePwmTab,
            parseInt(arrST[1], 10), //H
            parseInt(arrST[2], 10), //M
            0,  //S
            config.Schedules[i].Details[j].ScheduleDetailConfig.DB * Bright, //CH1
            config.Schedules[i].Details[j].ScheduleDetailConfig.BL * Bright, //CH2
            config.Schedules[i].Details[j].ScheduleDetailConfig.RE * Bright, //CH3
            config.Schedules[i].Details[j].ScheduleDetailConfig.GR * Bright, //CH4
            config.Schedules[i].Details[j].ScheduleDetailConfig.WW * Bright, //CH5
          ];
        }
      } else {
        // Date-->
        let endDate = new Date(startDate);
        endDate.setDate(startDate.getDate() + dateLen);
        dayTab = [
            ...dayTab,
            endDate.getFullYear(),
            endDate.getMonth() + 1,
            endDate.getDate()
          ]
        // <--Date

        //-->undefine timetab set 0
        for (let i = 0; i < ScheduleDetailsLen; i++) {
          timePwmTab = [
            ...timePwmTab,
            ...[0, 0, 0],  //h,m,s
            ...[0, 0, 0, 0, 0]  //CH1~CH5
          ];
        }

      }
    }

    let result = {
      timePwmTab,
      dayTab
    }
  	return (result);

  };

  timeSetToArry (timeSet) {
    let re = /(\d+):(\d+)/;
    let strST = '';
    let arrST = '';


    strST = timeSet.StartTime;
    arrST = strST.match(re);
    let Bright = timeSet.ScheduleDetailConfig.Bright
    let timePwmTab = [
      parseInt(arrST[1], 10), //H
      parseInt(arrST[2], 10), //M
      0,  //S
      timeSet.ScheduleDetailConfig.DB * Bright, //CH1
      timeSet.ScheduleDetailConfig.BL * Bright, //CH2
      timeSet.ScheduleDetailConfig.RE * Bright, //CH3
      timeSet.ScheduleDetailConfig.GR * Bright, //CH4
      timeSet.ScheduleDetailConfig.WW * Bright, //CH5
    ];

    return (timePwmTab);

  }

}
