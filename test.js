console.log('hello');

//var SerialPort = require("serialport").SerialPort
//var serialPort = new SerialPort("/dev/tty-usbserial1", {
//  baudrate: 57600
//}, false); // this is the openImmediately flag [default is true]
var SerialPort = require("serialport").SerialPort;


var serialPort = new SerialPort('/dev/ttyUSB0', {baudrate: 115200}, true);

serialPort.open()

serialPort.on ('open', function () {

    var initTest = function () {
      serialPort.write(0x05);
    }

    var initTest2 = function () {
      serialPort.write(0x05);
    }



    initTest();
    // serialPort.on ('data', function( data ) {
    //     console.log("data" + data.toString());
    // });
});
