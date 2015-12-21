let gRxBufArry = [];

serialPort.on('data', function(data) {
  //var buff = new Buffer(data)
  console.log('RXdata len: ' + data.length);
  for (var i = 0; i < data.length; i++) {
    gRxBufArry.push(data[i]);
  }
});

//發送並接收
var UartTxRx = function(u8TxDataArry){
  var DataBufArry = [];
  var T1num = 0;
  var RxLen = 0;

  console.log('testUart ');
  serialPort.write(u8TxDataArry, function(err, results) {
    console.log('testerr ' + err);
    console.log('testTX=' + results);
  });

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
      return(DataBufArry);
    }else if (T1num > 500) { //設定時須注意單位時間
      clearInterval(T1id);
      console.log('End:TimeOut');
      return([]);
    }
  } ,1);
}


var SearchDevice = function(){
  let ReDevArry = [];
    //輪詢ID:1~200
  let params = {
    u8DevID:i,
    GroupNum:0,
    sFunc:'WordRd',
    u8DataNum:1,
    u8Addr_Arry:[1031],  //Device group
    u8DataIn_Arry:[],
    u8Mask_Arry:[],
    RepeatNum:1
  }
  let Comm = services.hme.encode.ClientOp(params);
  let ReDataArry = services.hme.UartTxRx(Comm);
  if (ReDataArry != []) {
    let DevData = {
      DevID:i,
      DevGroup:ReDataArry[0]
    };
    ReDevArry.push(DevData);
  }

  return(ReDevArry);
}
