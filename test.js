console.log('hello');

//var SerialPort = require("serialport").SerialPort
//var serialPort = new SerialPort("/dev/tty-usbserial1", {
//  baudrate: 57600
//}, false); // this is the openImmediately flag [default is true]
var SerialPort = require("serialport").SerialPort;


var serialPort = new SerialPort('/dev/ttyUSB0', {baudrate: 115200}, true);



 serialPort.on("open", function () {
      console.log('open');

      serialPort.on('data', function(data) {
        console.log('data received: ' + data);		
      });
      
      serialPort.write('AAA', function(err, results) {
        console.log('err ' + err);
        console.log('results ' + results);
      });
    });

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
	