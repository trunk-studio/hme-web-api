
var WordTo3Byte = function (u16word) {
  console.log('WordTo3Byte');
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
  console.log('WordTo3Byte= '+u8ByteArry);
  return(u8ByteArry);
}

var u3ByteToWord = function (u3Byte) {
	//將經編碼之3Byte資料解碼為1Word
	return(u3Byte[0] + ((u3Byte[1]<<7)&0xff) + (((u3Byte[1]>>1) + (u3Byte[2]<<6))* 0x100));
}





var RxDecode = function(FuncCT, DevID, u8RxDataArry){
  //檢查接收的資料並解碼

  //分割資料段
  var u8RawHeader = u8RxDataArry[0];
  if (u8RawHeader != 0xC0) {
    console.log('HeaderErr')
    return([]);
  }
  var u8RawIdArry = u8RxDataArry.slice(1,4);
  if(u8RxDataArry.length > 8){
    //沒有回傳記憶體資料時，封包標準長度為8Byte
    var u8RawDataArry = u8RxDataArry.slice(5,u8RxDataArry.length-3);
  } else {
    var u8RawDataArry = [];
  }
  var u8RawChkSumArry = u8RxDataArry.slice(u8RxDataArry.length-3,u8RxDataArry.length);
  var u8RawCommand = u8RxDataArry[4];
  //檢查資料內容
  console.log('ID = '+u8RawIdArry);
  console.log('Data = '+u8RawDataArry);
  console.log('Chk = '+u8RawChkSumArry);
  console.log('Header = '+u8RawHeader);
  console.log('Comm = '+u8RawCommand);


  // #開始驗證資料正確性
  // #Check ChkSumErr
  var RespDataArry = u8RxDataArry.slice(0,u8RxDataArry.length-3);
  var u16ReChkSum = 0xffff & RespDataArry.reduce(function(a, b) { return a + b; });
  console.log(u16ReChkSum);
  if (u16ReChkSum =! u3ByteToWord(u8RawChkSumArry)) {
    console.log('HeaderErr')
    return([]);
  }

  // #Check FormatErr
  // if (u8RawIdArry != WordTo3Byte(DevID) || FuncCT != u8RawCommand) {
  //   console.log('FormatErr');
  //   return([]);
  // }

  // #將原始接接收資料解碼( 3Byte to 1Word )
  var u16ReData2DArry = [];
  var BoolChk = 0;
  for (var i = 0; i < (u8RawDataArry.length/3); i++) {
    u8ReData2DArry[i] = (u8RawDataArry.slice(i*3,i*3+3));
  }
  console.log(u8ReData2DArry);
  if(FunCT == 33 || FunCT == 34){
    //WordRd or DiscWordRd 需做檢查
    for (var i = 0; i < u8ReData2DArry.length; i++) {
      BoolChk +=  (u8ReData2DArry[i][0] & 0x80)
      BoolChk +=  (u8ReData2DArry[i][1] & 0x80)
      BoolChk +=  (u8ReData2DArry[i][2] & 0xfc)
    }
    //     BoolChk +=  (Re3BDataOut_list[i][0] & 0x80)
    //     BoolChk +=  (Re3BDataOut_list[i][1] & 0x80)
    //     BoolChk +=  (Re3BDataOut_list[i][2] & 0xfc)
  }else {
    //其他都不需要做檢查，無記憶體資料回傳
  }
  // Re3BDataOut_list = []
  // BoolChk = 0
  // #print('DR_L=',DataRd_list)
  // ReData_list = DataRd_list[5:len(DataRd_list)-3]
  // #print('RD_L=',ReData_list)
  // #print(DataRd_list)

  // #print('R3B_L=', Re3BDataOut_list)
  // #Chack FormatErr
  // if(Func == 'BitModify')	:
  //   #不需檢查回傳
  //   u16ReData_list = []
  //   #Read Block End
  // else:
  //   for i in range(0, len(Re3BDataOut_list)):
  //     BoolChk +=  (Re3BDataOut_list[i][0] & 0x80)
  //     BoolChk +=  (Re3BDataOut_list[i][1] & 0x80)
  //     BoolChk +=  (Re3BDataOut_list[i][2] & 0xfc)
  //   if(BoolChk == 0):
  //     #Ok
  //     for i in range(0, len(Re3BDataOut_list)):
  //       u16ReData_list.append(u3ByteToWord(Re3BDataOut_list[i]) )
  //     #毒入資料驗證完成, u16ReData_list = 讀入資料
  //     #print('Data = ',u16ReData_list)
  //     #print ('Data = ', [hex(i) for i in u16ReData_list])
  //   else:
  //     RdError_list.append('FormatErr')
  //     print('FormatErr')
  //     #!!
  //     DataRd_list = []
}
RxDecode(0,0,[0xC0,2,3,4,5,6,7,8,9,10,11,12,13,14]);
