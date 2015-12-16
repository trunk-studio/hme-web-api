
var RestComm = [128,1,0,0,0,0,0,50,1,0,0,0,0,0,1,0,0,53,1,0]

var SerialPort = require("serialport").SerialPort;
var ser = new SerialPort('/dev/ttyUSB0', {baudrate: 115200}, true);

ser.on ('open', function () {
  ser.write(RestComm, function(err, results) {
    console.log('Txerr' + err);
    console.log('TX Num =' + results);
  });
});
