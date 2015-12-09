console.log('hello');

//var SerialPort = require("serialport").SerialPort
//var serialPort = new SerialPort("/dev/tty-usbserial1", {
//  baudrate: 57600
//}, false); // this is the openImmediately flag [default is true]
var SerialPort = require("serialport").SerialPort;


var serialPort = new SerialPort('COM4', {baudrate: 115200}, true);

serialPort.open()

serialPort.on ('open', function () {
    console.log("Open");
    serialPort.write(0x05);
    serialPort.on ('data', function( data ) {
        console.log("data" + data.toString());
    });
});
