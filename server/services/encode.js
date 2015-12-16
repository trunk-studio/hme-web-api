

/* 建立 3 Bytes 的記憶體空間 */


export default class Encode {

  constructor () {
    this.data = 0xfeab;
    this.buf = new Buffer(3);
    this.buff = new Buffer([128,1,0,0,50,1,0,0,0,0,0,1,0,0,53,1,0]);
  }

  WordTo3Byte = function (u16word) {
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
  }

  u3ByteToWord = function (u3Byte) {
  	//將經編碼之3Byte資料解碼為1Word
  	return(u3Byte[0] + ((u3Byte[1]<<7)&0xff) + (((u3Byte[1]>>1) + (u3Byte[2]<<6))* 0x100));
  }

  WordListToAdd3ByteList = function({Data_list, WordDatat_list}) {
    console.log('=== Data_list ===', Data_list);
    console.log('=== WordDatat_list ===', WordDatat_list);
  	//用於將WordTypeList編碼為3Byte,並加入3ByteTypeList中
    for (var i = 0; i < WordDatat_list.length; i++) {
  		Data_list = Data_list.concat(this.WordTo3Byte(WordDatat_list[i]));
    } ;
  	return(Data_list);
  }
  //?未測試
  DataListToChkSum3ByteList = function(Data_Arry) {
  	let u16ChkSum = 0;
  	for(var i = 0; i < Data_Arry.length; i++){
  		u16ChkSum = u16ChkSum + Data_Arry[i];
    }
  	u16ChkSum = u16ChkSum & 0xffff;
    console.log('u16ChkSum='+u16ChkSum);
  	return(this.WordTo3Byte(u16ChkSum));
  }


  CopBitModify = function(u8DevID, GroupNum, u8FuncCT, u8DataNum, u8Addr_Arry, u8DataIn_Arry, u8Mask_Arry){
    var u8DataOut_arry =[];
  	var u8Header = 0x80;
    u8DataOut_arry.push(u8Header);
    u8DataOut_arry = u8DataOut_arry.concat(this.WordTo3Byte(u8DevID));
    u8DataOut_arry = u8DataOut_arry.concat(this.WordTo3Byte(GroupNum));
    u8DataOut_arry.push(u8FuncCT);
    u8DataOut_arry = u8DataOut_arry.concat(this.WordTo3Byte(u8DataNum));
    let params = {
      Data_list: u8DataOut_arry,
      WordDatat_list: u8Addr_Arry
    }
    u8DataOut_arry = this.WordListToAdd3ByteList(params);
    let params2 = {
      Data_list: u8DataOut_arry,
      WordDatat_list: u8DataIn_Arry
    }
    u8DataOut_arry = this.WordListToAdd3ByteList(params2);
    let params3 = {
      Data_list: u8DataOut_arry,
      WordDatat_list: u8Mask_Arry
    }
    u8DataOut_arry = this.WordListToAdd3ByteList(params3);
  	u8DataOut_arry = u8DataOut_arry.concat(this.DataListToChkSum3ByteList(u8DataOut_arry));
  	return (u8DataOut_arry);

    //this.CopBitModify(1, 17, 2, [1,235], [2,253], [233,222])
    //[128,1,0,0,17,2,0,0,1,0,0,107,1,0,2,0,0,125,1,0,105,1,0,94,1,0,74,4,0]
  }

  //未測試
  CopBitInv = function(u8DevID, GroupNum, u8FuncCT, u8DataNum, u8Addr_Arry, u8Mask_Arry){
    var u8DataOut_arry =[];
  	var u8Header = 0x80;
    u8DataOut_arry.push(u8Header);
    u8DataOut_arry = u8DataOut_arry.concat(this.WordTo3Byte(u8DevID));
    u8DataOut_arry = u8DataOut_arry.concat(this.WordTo3Byte(GroupNum));
    u8DataOut_arry.push(u8FuncCT);
    u8DataOut_arry = u8DataOut_arry.concat(this.WordTo3Byte(u8DataNum));
    let params = {
      Data_list: u8DataOut_arry,
      WordDatat_list: u8Addr_Arry
    }
    u8DataOut_arry = this.WordListToAdd3ByteList(params);
    let params2 = {
      Data_list: u8DataOut_arry,
      WordDatat_list: u8Mask_Arry
    }
    u8DataOut_arry = this.WordListToAdd3ByteList(params2);
  	u8DataOut_arry = u8DataOut_arry.concat(this.DataListToChkSum3ByteList(u8DataOut_arry));
  	return (u8DataOut_arry);
  }

  CopWordRd = function(u8DevID, GroupNum, u8FuncCT, u8DataNum, u8Addr_Arry){
    var u8DataOut_arry =[];
  	var u8Header = 0x80;
    u8DataOut_arry.push(u8Header);
    u8DataOut_arry = u8DataOut_arry.concat(this.WordTo3Byte(u8DevID));
    u8DataOut_arry = u8DataOut_arry.concat(this.WordTo3Byte(GroupNum));
    u8DataOut_arry.push(u8FuncCT);
    u8DataOut_arry = u8DataOut_arry.concat(this.WordTo3Byte(u8DataNum));
    let params = {
      Data_list: u8DataOut_arry,
      WordDatat_list: [u8Addr_Arry[0]]
    }
    u8DataOut_arry = this.WordListToAdd3ByteList(params);
  	u8DataOut_arry = u8DataOut_arry.concat(this.DataListToChkSum3ByteList(u8DataOut_arry));
  	return (u8DataOut_arry);
    // TEST:
    // let params = {
    //   u8DevID:0xfff,
    //   GroupNum:0x00,
    //   sFunc:'WordRd',
    //   u8DataNum:5,
    //   u8Addr_Arry:[0x01,0xfff,0x123,0x555,0xf53],
    //   u8DataIn_Arry:[],
    //   u8Mask_Arry:[],
    //   RepeatNum:1
    // }
    //[ 128, 127, 31, 0, 0, 0, 0, 33, 5, 0, 0, 1, 0, 0, 69, 2, 0 ]


  }

  CopDiscWordRd = function(u8DevID, GroupNum, u8FuncCT, u8DataNum, u8Addr_Arry){
    var u8DataOut_arry =[];
  	var u8Header = 0x80;
    u8DataOut_arry.push(u8Header);
    u8DataOut_arry = u8DataOut_arry.concat(this.WordTo3Byte(u8DevID));
    u8DataOut_arry = u8DataOut_arry.concat(this.WordTo3Byte(GroupNum));
    u8DataOut_arry.push(u8FuncCT);
    u8DataOut_arry = u8DataOut_arry.concat(this.WordTo3Byte(u8DataNum));
    let params = {
      Data_list: u8DataOut_arry,
      WordDatat_list: u8Addr_Arry
    }
    u8DataOut_arry = this.WordListToAdd3ByteList(params);
  	u8DataOut_arry = u8DataOut_arry.concat(this.DataListToChkSum3ByteList(u8DataOut_arry));
  	return (u8DataOut_arry);

    // let params = {
    //   u8DevID:0xfff,
    //   GroupNum:0x00,
    //   sFunc:'DiscWordRd',
    //   u8DataNum:5,
    //   u8Addr_Arry:[0x01,0xfff,0x123,0x555,0xf53],
    //   u8DataIn_Arry:[],
    //   u8Mask_Arry:[],
    //   RepeatNum:1
    // }
    // [ 128,127,31,0,0,0,0,34,5,0,0,1,0,0,127,31,0,35,2,0,85,10,0,83,30,0,89,5,0 ]

  }


  CopDiscWordWt = function(u8DevID, GroupNum, u8FuncCT, u8DataNum, u8Addr_Arry, u8DataIn_Arry){
    var u8DataOut_arry =[];
  	var u8Header = 0x80;
    u8DataOut_arry.push(u8Header);
    u8DataOut_arry = u8DataOut_arry.concat(this.WordTo3Byte(u8DevID));
    u8DataOut_arry = u8DataOut_arry.concat(this.WordTo3Byte(GroupNum));
    u8DataOut_arry.push(u8FuncCT);
    u8DataOut_arry = u8DataOut_arry.concat(this.WordTo3Byte(u8DataNum));
    let params = {
      Data_list: u8DataOut_arry,
      WordDatat_list: u8Addr_Arry
    }
    u8DataOut_arry = this.WordListToAdd3ByteList(params);
    let params2 = {
      Data_list: u8DataOut_arry,
      WordDatat_list: u8DataIn_Arry
    }
    u8DataOut_arry = this.WordListToAdd3ByteList(params2);
  	u8DataOut_arry = u8DataOut_arry.concat(this.DataListToChkSum3ByteList(u8DataOut_arry));
  	return (u8DataOut_arry);
    // let params = {
    //   u8DevID:0x5ff,
    //   GroupNum:0x00,
    //   sFunc:'DiscWordWt',
    //   u8DataNum:5,
    //   u8Addr_Arry:[0x01,0xfff,0x123,0x555,0xf53],
    //   u8DataIn_Arry:[0xfe3,0xef5,0xa33,0x563,0xa12],
    //   u8Mask_Arry:[],
    //   RepeatNum:1
    // }
    //[ 128,127,11,0,0,0,0,50,5,0,0,1,0,0,127,31,0,35,2,0,85,10,0,83,30,0,99,31,0,117,29,0,51,20,0,99,10,0,18,20,0,67,9,0 ]

  }


  CopWordWt = function(u8DevID, GroupNum, u8FuncCT, u8DataNum, u8Addr_Arry, u8DataIn_Arry){
    var u8DataOut_arry =[];
  	var u8Header = 0x80;
    u8DataOut_arry.push(u8Header);
    u8DataOut_arry = u8DataOut_arry.concat(this.WordTo3Byte(u8DevID));
    u8DataOut_arry = u8DataOut_arry.concat(this.WordTo3Byte(GroupNum));
    u8DataOut_arry.push(u8FuncCT);
    u8DataOut_arry = u8DataOut_arry.concat(this.WordTo3Byte(u8DataNum));
    let params = {
      Data_list: u8DataOut_arry,
      WordDatat_list: [u8Addr_Arry[0]]
    }
    u8DataOut_arry = this.WordListToAdd3ByteList(params);
    let params2 = {
      Data_list: u8DataOut_arry,
      WordDatat_list: u8DataIn_Arry
    }
    u8DataOut_arry = this.WordListToAdd3ByteList(params2);
  	u8DataOut_arry = u8DataOut_arry.concat(this.DataListToChkSum3ByteList(u8DataOut_arry));
  	return (u8DataOut_arry);
    // let params = {
    //   u8DevID:0x5ff,
    //   GroupNum:0x00,
    //   sFunc:'WordWt',
    //   u8DataNum:5,
    //   u8Addr_Arry:[0x01,0xfff,0x123,0x555,0xf53],
    //   u8DataIn_Arry:[0xfe3,0xef5,0xa33,0x563,0xa12],
    //   u8Mask_Arry:[],
    //   RepeatNum:1
    // }
    // let resu
    // [ 128,127,11,0,0,0,0,49,5,0,0,1,0,0,99,31,0,117,29,0,51,20,0,99,10,0,18,20,0,47,6,0 ]

  }
  //未測試
  ClientOp = function({u8DevID, GroupNum, sFunc, u8DataNum, u8Addr_Arry, u8DataIn_Arry, u8Mask_Arry, RepeatNum}){
  	//用於進行通訊,讀寫操作燈具裝置之記憶體
  	//u8DevID = 裝置ID, sFunc = 記憶體操作方式, u8DataNum = 資料長度(Word)
  	//u8Addr_Arry = 欲操作之(燈具)記憶體位址, u8Mask_Arry = 位元操作遮罩, RepeatNum = 重傳次數上限

  	//sFunc:{'Inital':, 'Close':, 'BitModify':寫入特定位元, 'BitInv':翻轉特定位元, 'WordRd':讀取連續記憶體位置,
  	//	 'DiscWordRd':讀取非連續記憶體位置, 'WordWt':寫入連續記憶體位置, 'DiscWordWt':寫入非連續記憶體位置}

  	//要寫入串列通訊的資料
    console.log('u8DevID', u8DevID);
    console.log('GroupNum', GroupNum);
    console.log('sFunc', sFunc);
    console.log('u8DataNum', u8DataNum);
    console.log('u8Addr_Arry', u8Addr_Arry);
    console.log('u8DataIn_Arry', u8DataIn_Arry);
    console.log('u8Mask_Arry', u8Mask_Arry);
    console.log('RepeatNum', RepeatNum);

  	let u16DataWt_arry = [];

  	let FuncCommTable = {'Inital':0, 'Close':0, 'BitModify':17, 'BitInv':18, 'WordRd':33, 'DiscWordRd':34,
  					'WordWt':49, 'DiscWordWt':50};
    switch (sFunc) {
      case 'DiscWordWt':
        u16DataWt_arry = this.CopDiscWordWt(u8DevID, GroupNum, (FuncCommTable[sFunc] & 0x7f), u8DataNum, u8Addr_Arry, u8DataIn_Arry);
        break;
      case 'BitModify':
        u16DataWt_arry = this.CopBitModify(u8DevID, GroupNum, (FuncCommTable[sFunc] & 0x7f), u8DataNum, u8Addr_Arry, u8DataIn_Arry, u8Mask_Arry);
        break;
      case 'BitInv':
        u16DataWt_arry = this.CopBitInv(u8DevID, GroupNum, (FuncCommTable[sFunc] & 0x7f), u8DataNum, u8Addr_Arry, u8Mask_Arry);
        break;
      case 'WordRd':
        u16DataWt_arry = this.CopWordRd(u8DevID, GroupNum, (FuncCommTable[sFunc] & 0x7f), u8DataNum, u8Addr_Arry);
        break;
      case 'DiscWordRd':
        u16DataWt_arry = this.CopDiscWordRd(u8DevID, GroupNum, (FuncCommTable[sFunc] & 0x7f), u8DataNum, u8Addr_Arry);
        break;
      case 'WordWt':
        u16DataWt_arry = this.CopWordWt(u8DevID, GroupNum, (FuncCommTable[sFunc] & 0x7f), u8DataNum, u8Addr_Arry, u8DataIn_Arry);
        break;
      default:
        console.log('this.ClientOp_Func_ERROR');
        return(0);
    }
  	// //透過串列通訊寫入(u16DataWt_arry)並回傳回饋資料(u16ReData_list)
  	// return(SerialWR(u8DevID, u16DataWt_arry, sFunc, u8DataNum, RepeatNum))
    return(u16DataWt_arry);
  }


}
  // [FEAB]=>[2B, 7D, 03]
  //console.log(this.WordTo3Byte(data));

  //console.log(initTest2(0x0180,0xab,0xfeab,[0xfecc,0xfeab]));
  //console.log(this.CopBitModify(1, 17, 2, [1,2], [2,3], [233,156]));
  //console.log(this.CopBitModify(1, 17, 2, [1,235], [2,253], [233,222]));

  //initTest2();
  //WordBufTo3ByteBuf();
