

/* 建立 3 Bytes 的記憶體空間 */


export default class Encode {

  constructor () {
    this.data = 0xfeab;
    this.buf = new Buffer(3);
    this.buff = new Buffer([128,1,0,0,50,1,0,0,0,0,0,1,0,0,53,1,0]);
  }

  WordTo3Byte = function (u16word) {
    console.log('this.WordTo3Byte');
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
    console.log('this.WordTo3Byte= '+u8ByteArry);
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
  	u16ChkSum = 0;
  	for(var i = 0; i < Data_Arry.length; i++){
  		u16ChkSum = u16ChkSum + Data_Arry[i];
    }
  	u16ChkSum = u16ChkSum & 0xffff;
    console.log('u16ChkSum='+u16ChkSum);
  	return(this.WordTo3Byte(u16ChkSum));
  }


  CopBitModify = function(u8DevID, u8FuncCT, u8DataNum, u8Addr_Arry, u8DataIn_Arry, u8Mask_Arry){
    var u8DataOut_arry =[];
  	var u8Header = 0x80;
    u8DataOut_arry.push(u8Header);
    u8DataOut_arry = u8DataOut_arry.concat(this.WordTo3Byte(u8DevID));
    u8DataOut_arry.push(u8FuncCT);
    u8DataOut_arry = u8DataOut_arry.concat(this.WordTo3Byte(u8DataNum));
    u8DataOut_arry = this.WordListToAdd3ByteList(u8Addr_Arry, u8DataOut_arry);
    u8DataOut_arry = this.WordListToAdd3ByteList(u8DataIn_Arry, u8DataOut_arry);
    u8DataOut_arry = this.WordListToAdd3ByteList(u8Mask_Arry, u8DataOut_arry);
  	u8DataOut_arry = u8DataOut_arry.concat(this.DataListToChkSum3ByteList(u8DataOut_arry));
  	return (u8DataOut_arry);

    //this.CopBitModify(1, 17, 2, [1,235], [2,253], [233,222])
    //[128,1,0,0,17,2,0,0,1,0,0,107,1,0,2,0,0,125,1,0,105,1,0,94,1,0,74,4,0]
  }

  //未測試
  CopBitInv = function(u8DevID, u8FuncCT, u8DataNum, u8Addr_Arry, u8Mask_Arry){
    var u8DataOut_arry =[];
  	var u8Header = 0x80;
    u8DataOut_arry.push(u8Header);
    u8DataOut_arry = u8DataOut_arry.concat(this.WordTo3Byte(u8DevID));
    u8DataOut_arry.push(u8FuncCT);
    u8DataOut_arry = u8DataOut_arry.concat(this.WordTo3Byte(u8DataNum));
    u8DataOut_arry = this.WordListToAdd3ByteList(u8Addr_Arry, u8DataOut_arry);
    u8DataOut_arry = this.WordListToAdd3ByteList(u8Mask_Arry, u8DataOut_arry);
  	u8DataOut_arry = u8DataOut_arry.concat(this.DataListToChkSum3ByteList(u8DataOut_arry));
  	return (u8DataOut_arry);
  }
  //讀寫函式 連續與非連續內容都相同
  //未測試
  CopWordRd = function(u8DevID, u8FuncCT, u8DataNum, u8Addr_Arry){
    var u8DataOut_arry =[];
  	var u8Header = 0x80;
    u8DataOut_arry.push(u8Header);
    u8DataOut_arry = u8DataOut_arry.concat(this.WordTo3Byte(u8DevID));
    u8DataOut_arry.push(u8FuncCT);
    u8DataOut_arry = u8DataOut_arry.concat(this.WordTo3Byte(u8DataNum));
    u8DataOut_arry = this.WordListToAdd3ByteList(u8Addr_Arry, u8DataOut_arry);
  	u8DataOut_arry = u8DataOut_arry.concat(this.DataListToChkSum3ByteList(u8DataOut_arry));
  	return (u8DataOut_arry);
  }
  //未測試
  CopDiscWordRd = function(u8DevID, u8FuncCT, u8DataNum, u8Addr_Arry){
    var u8DataOut_arry =[];
  	var u8Header = 0x80;
    u8DataOut_arry.push(u8Header);
    u8DataOut_arry = u8DataOut_arry.concat(this.WordTo3Byte(u8DevID));
    u8DataOut_arry.push(u8FuncCT);
    u8DataOut_arry = u8DataOut_arry.concat(this.WordTo3Byte(u8DataNum));
    u8DataOut_arry = this.WordListToAdd3ByteList(u8Addr_Arry, u8DataOut_arry);
  	u8DataOut_arry = u8DataOut_arry.concat(this.DataListToChkSum3ByteList(u8DataOut_arry));
  	return (u8DataOut_arry);
  }
  //未測試
  CopDiscWordWt = function(u8DevID, u8FuncCT, u8DataNum, u8Addr_Arry, u8DataIn_Arry){
    var u8DataOut_arry =[];
  	var u8Header = 0x80;
    u8DataOut_arry.push(u8Header);
    u8DataOut_arry = u8DataOut_arry.concat(this.WordTo3Byte(u8DevID));
    u8DataOut_arry.push(u8FuncCT);
    u8DataOut_arry = u8DataOut_arry.concat(this.WordTo3Byte(u8DataNum));
    u8DataOut_arry = this.WordListToAdd3ByteList(u8Addr_Arry, u8DataOut_arry);
    u8DataOut_arry = this.WordListToAdd3ByteList(u8DataIn_Arry, u8DataOut_arry);
  	u8DataOut_arry = u8DataOut_arry.concat(this.DataListToChkSum3ByteList(u8DataOut_arry));
  	return (u8DataOut_arry);

  }
  //未測試
  CopWordWt = function(u8DevID, u8FuncCT, u8DataNum, u8Addr_Arry, u8DataIn_Arry){
    var u8DataOut_arry =[];
  	var u8Header = 0x80;
    u8DataOut_arry.push(u8Header);
    u8DataOut_arry = u8DataOut_arry.concat(this.WordTo3Byte(u8DevID));
    u8DataOut_arry.push(u8FuncCT);
    u8DataOut_arry = u8DataOut_arry.concat(this.WordTo3Byte(u8DataNum));
    u8DataOut_arry = this.WordListToAdd3ByteList(u8Addr_Arry, u8DataOut_arry);
    u8DataOut_arry = this.WordListToAdd3ByteList(u8DataIn_Arry, u8DataOut_arry);
  	u8DataOut_arry = u8DataOut_arry.concat(this.DataListToChkSum3ByteList(u8DataOut_arry));
  	return (u8DataOut_arry);
  }
  //未測試
  ClientOp = function(u8DevID, sFunc, u8DataNum, u8Addr_Arry, u8DataIn_Arry, u8Mask_Arry, RepeatNum){
  	//用於進行通訊,讀寫操作燈具裝置之記憶體
  	//u8DevID = 裝置ID, sFunc = 記憶體操作方式, u8DataNum = 資料長度(Word)
  	//u8Addr_Arry = 欲操作之(燈具)記憶體位址, u8Mask_Arry = 位元操作遮罩, RepeatNum = 重傳次數上限

  	//sFunc:{'Inital':, 'Close':, 'BitModify':寫入特定位元, 'BitInv':翻轉特定位元, 'WordRd':讀取連續記憶體位置,
  	//	 'DiscWordRd':讀取非連續記憶體位置, 'WordWt':寫入連續記憶體位置, 'DiscWordWt':寫入非連續記憶體位置}

  	//要寫入串列通訊的資料
  	u16DataWt_arry = []

  	FuncCommTable = {'Inital':0, 'Close':0, 'BitModify':17, 'BitInv':18, 'WordRd':33, 'DiscWordRd':34,
  					'WordWt':49, 'DiscWordWt':50}
    switch (expression) {
      case 'DiscWordWt':
        u16DataWt_arry = this.CopDiscWordWt(u8DevID, (FuncCommTable[sFunc] & 0x7f), u8DataNum, u8Addr_Arry, u8DataIn_Arry);
        break;
      case 'BitModify':
        u16DataWt_arry = this.CopBitModify(u8DevID, (FuncCommTable[sFunc] & 0x7f), u8DataNum, u8Addr_Arry, u8DataIn_Arry, u8Mask_Arry);
        break;
      case 'BitInv':
        u16DataWt_arry = this.CopBitInv(u8DevID, (FuncCommTable[sFunc] & 0x7f), u8DataNum, u8Addr_Arry, u8Mask_Arry);
        break;
      case 'WordRd':
        u16DataWt_arry = this.CopWordRd(u8DevID, (FuncCommTable[sFunc] & 0x7f), u8DataNum, u8Addr_Arry);
        break;
      case 'DiscWordRd':
        u16DataWt_arry = this.CopDiscWordRd(u8DevID, (FuncCommTable[sFunc] & 0x7f), u8DataNum, u8Addr_Arry);
        break;
      case 'WordWt':
        u16DataWt_arry = this.CopWordWt(u8DevID, (FuncCommTable[sFunc] & 0x7f), u8DataNum, u8Addr_Arry, u8DataIn_Arry);
        break;
      default:
        console.log('this.ClientOp_Func_ERROR');
        return(0);
    }
  	// //透過串列通訊寫入(u16DataWt_arry)並回傳回饋資料(u16ReData_list)
  	// return(SerialWR(u8DevID, u16DataWt_arry, sFunc, u8DataNum, RepeatNum))
    return(u16DataWt_arry);
  }

  initTest2 = function () {

    aa = 'b';
    switch (aa) {
      case 'a':
        console.log('a');
        break;
      case 'b':
        console.log('b');
        break;
      case 'c':
        console.log('c');
        break;
      default:
    }
    return(0);
  }

}

  // [FEAB]=>[2B, 7D, 03]
  //console.log(this.WordTo3Byte(data));

  //console.log(initTest2(0x0180,0xab,0xfeab,[0xfecc,0xfeab]));
  //console.log(this.CopBitModify(1, 17, 2, [1,2], [2,3], [233,156]));
  //console.log(this.CopBitModify(1, 17, 2, [1,235], [2,253], [233,222]));

  //initTest2();
  //WordBufTo3ByteBuf();




  //Serial
  //
  // var SerialPort = require("serialport").SerialPort;
  //
  //
  // var serialPort = new SerialPort('/dev/ttyUSB0', {baudrate: 115200}, true);
  //
  // serialPort.open()
  //
  // serialPort.on("open", function () {
  //      console.log('open');
  //
  //      serialPort.on('data', function(data) {
  //        console.log('data received: ' + data);
  //      });
  //
  //      serialPort.write(buff, function(err, results) {
  //        console.log('err ' + err);
  //        console.log('results ' + results);
  //      });
  //    });
