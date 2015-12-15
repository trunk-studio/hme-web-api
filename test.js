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
  var ary = [1,2];
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

  // setTimeout(function(){
  //   clearInterval(T1id);
  //   //console.log('End:TimeOut');
  // }, 5);

}

ser.on("open", function () {
  console.log('serialPor open');
  testUart();
  //process.nextTick(testUart);
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



//ser.open();

/*
ser.on ('open', function (error) {
	console.log('/dev/ttyUSB0 is open');


	  if ( error ) {
		console.log('failed to open: '+error);
	  } else {
		console.log('open');
		ser.on('data', function(data) {
		  console.log('data received: ' + data);
		});
		ser.write("ls\n", function(err, results) {
		  console.log('err ' + err);
		  console.log('results ' + results);
		});
	  }


    var initTest = function () {
		console.log('initTest');
      //ser.write(0x05);
    }

    var initTest2 = function () {
		console.log('initTest2');
     // ser.write(0x05);
    }

    //initTest();



    // ser.on ('data', function( data ) {
    //     console.log("data" + data.toString());
    // });
});

 ser.on('data', function(data) {
      console.log('data received: ' + data);
    });
	*/
