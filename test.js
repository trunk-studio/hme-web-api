console.log('hello');

//var SerialPort = require("serialport").SerialPort
//var serialPort = new SerialPort("/dev/tty-usbserial1", {
//  baudrate: 57600
//}, false); // this is the openImmediately flag [default is true]
var SerialPort = require("serialport").SerialPort;


var serialPort = new SerialPort('/dev/ttyUSB0', {baudrate: 115200}, true);

var cbuf = new Buffer([128,1,0,0,50,1,0,0,0,0,0,1,0,0,53,1,0])
var ary = [1,2]

var a = []

console.log(cbuf);

 serialPort.on("open", function () {
      console.log('open');

        serialPort.on('data', function(data) {
          //var buff = new Buffer(data)
          console.log(data);
          console.log('RX='+data);
          console.log('data len: ' + data.length);
          for (var i = 0; i < data.length; i++) {
            a.push(data[i]);
            }


        });

        serialPort.write(ary, function(err, results) {
          console.log('err ' + err);
          console.log('TXDATA=');
          console.log('TX=' + results);
        });


    });


var test1 = function(){
  console.log("Run test1")
}

setTimeout(function(){
  console.log("Run test2");
  serialPort.write('ss', function(err, results) {
    console.log('err ' + err);
    console.log('TXDATA=');
    console.log('TX=' + results);
  });
  test1();
},3000);

  setTimeout(function(str1, str2) {
    console.log(str1 + " " + str2);
    console.log(a);
  }, 5000, "Hello.", "How are you?");


//serialPort.open();

/*
serialPort.on ('open', function (error) {
	console.log('/dev/ttyUSB0 is open');


	  if ( error ) {
		console.log('failed to open: '+error);
	  } else {
		console.log('open');
		serialPort.on('data', function(data) {
		  console.log('data received: ' + data);
		});
		serialPort.write("ls\n", function(err, results) {
		  console.log('err ' + err);
		  console.log('results ' + results);
		});
	  }


    var initTest = function () {
		console.log('initTest');
      //serialPort.write(0x05);
    }

    var initTest2 = function () {
		console.log('initTest2');
     // serialPort.write(0x05);
    }

    //initTest();



    // serialPort.on ('data', function( data ) {
    //     console.log("data" + data.toString());
    // });
});

 serialPort.on('data', function(data) {
      console.log('data received: ' + data);
    });
	*/
