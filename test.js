
console.log('hello');

//var SerialPort = require("serialport").SerialPort
//var ser = new SerialPort("/dev/tty-usbserial1", {
//  baudrate: 57600
//}, false); // this is the openImmediately flag [default is true]

var serialport = require("serialport");
var SerialPort = serialport.SerialPort; // localize object constructor

var ser = new SerialPort('/dev/ttyUSB0', {baudrate: 115200,  parser: serialport.parsers.raw}, true);

var cbuf = new Buffer([128,1,0,0,50,1,0,0,0,0,0,1,0,0,53,1,0])

var gRxBufArry = [];
var gRxF = [];

var DataBufArry = [];

//接收UART
ser.on('data', function(data) {
  //var buff = new Buffer(data)
  console.log('RXdata len: ' + data.length);
  for (var i = 0; i < data.length; i++) {
    gRxBufArry.push(data[i]);
  }
});

var chkDataBuf = function(){
   while(RxBufArry.length != 0) {
     DataBufArry.push(RxBufArry.shift());
     RxLen++;
     console.log('read...'+RxLen)
   }
}

//測試發送並接收
var testUart = function(){
  var DataBufArry = [];
  var T1num = 0;
  var RxLen = 0;

  console.log('testUart ');
  ser.write(cbuf, function(err, results) {
    console.log('testerr ' + err);
    console.log('testTX=' + results);
  });
  //接收2Byte
  // console.log('testRx ');
  // var RxLen = 0;
  //  while (RxLen < 2) {
  //    //console.log('readwhile...')
  //    if (RxBufArry.length != 0) {
  //      DataBufArry.push(RxBufArry.shift());
  //      RxLen++;
  //      console.log('read...')
  //    }
  //  };

  //每0.5ms檢查是否有接收並複製
  var T1id = setInterval(function(){
    while(gRxBufArry.length != 0) {
      DataBufArry.push(gRxBufArry.shift());
      RxLen++;
      //console.log('read...'+RxLen)
    }
    T1num++;
    console.log(T1num + 'ms');
    if (RxLen == 17) {
      clearInterval(T1id);
      console.log('End:Rx OK');
      console.log(DataBufArry);
    }else if (T1num > 10) { //設定時須注意單位時間
      clearInterval(T1id);
      console.log('End:TimeOut');
    }
  } ,0.5);
}

var RxDecode = function(u8RxDataArry){
  //檢查接收的資料並解碼

  //分割資料段
  var u8RawIdArry = u8RxDataArry.slice(1,4);
  if(u8RxDataArry.length > 8){
    //沒有回傳記憶體資料時，封包標準長度為8Byte
    var u8RawDataArry = u8RxDataArry.slice(5,u8RxDataArry.length-3);
  } else {
    var u8RawDataArry = [];
  }
  var u8RawChkSumArry = u8RxDataArry.slice(u8RxDataArry.length-3,u8RxDataArry.length);
  var u8RawHeader = u8RxDataArry[0];
  var u8RawCommand = u8RxDataArry[4];
  //檢查資料內容
  // console.log('ID = '+u8RawIdArry);
  // console.log('Data = '+u8RawDataArry);
  // console.log('Chk = '+u8RawChkSumArry);
  // console.log('Header = '+u8RawHeader);
  // console.log('Comm = '+u8RawCommand);

  // #開始驗證資料正確性
  // #Check ChkSumErr
  // RespData_list = DataRd_list[0:len(DataRd_list)-3]
  // ChkSum_list = DataRd_list[len(DataRd_list)-3:len(DataRd_list)]
  // u16ReChkSum = sum(RespData_list) & 0xffff
  // u8ReChkSum_list = WordTo3Byte(u16ReChkSum)
  // if(ChkSum_list != u8ReChkSum_list):
  //   RdError_list.append('ChkSumErr')
  //   print('ChkSumErr')
  //   # !!
  //   DataRd_list = []
  //   #錯誤即結束
  //   return()


  // #Check FormatErr
  // HeadIdComm_list = RespData_list[0:5]
  // #print('HIC_L=',HeadIdComm_list)
  // if(HeadIdComm_list[0] != 0xc0 or HeadIdComm_list[1:4] != WordTo3Byte(DevID) or FuncCommTable[Func] != HeadIdComm_list[4]):
  //   RdError_list.append('FormatErr')
  //   print('FormatErr')
  //   # !!
  //   DataRd_list = []
  //   #錯誤即結束
  //   return()
  //
  // #將原始接接收資料解碼( 3Byte to 1Word )
  // Re3BDataOut_list = []
  // BoolChk = 0
  // #print('DR_L=',DataRd_list)
  // ReData_list = DataRd_list[5:len(DataRd_list)-3]
  // #print('RD_L=',ReData_list)
  // #print(DataRd_list)
  // for i in range(0, (len(ReData_list)//3)):
  //   Re3BDataOut_list.append(ReData_list[i*3:i*3+3] )
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


var UartTxRx = function(DataOutArry, RxDataLen){
  // 測試發送並接收
  var DataBufArry = [];
  var T1num = 0;
  var RxLen = 0;
  ser.write(DataOutArry, function(err, results) {
    console.log('Txerr ' + err);
    console.log('TX=' + results);
  });

  //每0.5ms檢查是否有接收並複製,逾時則結束接收
  var T1id = setInterval(function(){
    while(gRxBufArry.length != 0) {
      DataBufArry.push(gRxBufArry.shift());
      RxLen++;
    }
    T1num++;
    if (RxLen > RxDataLen) {
      //Check RespNumErr
      clearInterval(T1id);
      //接收數量超出預期，失敗,結束
      return([]);
    }else if (RxLen == RxDataLen) {
      clearInterval(T1id);
      //接收完成，回傳並結束
      return(DataBufArry);
    }else if (T1num > 10) { //設定時須注意單位時間
      clearInterval(T1id);
      //逾時,接收失敗,結束
      return([]);
    }
  } ,0.5);
}

ser.on("open", function () {
  var aaa = [1];
  console.log('serialPor open');
  //RxDecode([1,2,3,4,5,6,7,8,9,10]);
  testUart();
});





//test1();

// setTimeout(function(str1, str2) {
//   console.log(str1 + " " + str2);
//   testUart();
// }, 2000, "Hello.", "How are you?");


// setTimeout(function(){
//   console.log("Run test2");
//   ser.write('ss', function(err, results) {
//     console.log('err ' + err);
//     console.log('TXDATA=');
//     console.log('TX=' + results);
//   });
//   test1();
// },3000);
//
