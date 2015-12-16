let SerialPort = require("serialport").SerialPort;

export default class Hme {
    constructor (serialPortName) {
      this.serialPortName = serialPortName;
    }

    hello = (app) => {
      let hello = 'yes!';
      return {hello};
    }

    connectSerialPort = async () => {
      if(this.serialPortName != undefined){
        // var RestComm = [128,1,0,0,0,0,0,50,1,0,0,0,0,0,1,0,0,53,1,0]

        var serialPort = new SerialPort(this.serialPortName, {baudrate: 115200}, true);
        this.serialPort = serialPort;

        let openSerialPort = await new Promise((resolve, reject) => {
          serialPort.on ('open', function () {
            resolve(true)
          });
        });

        console.log('=== openSerialPort ===', openSerialPort);
      } else {
        console.log('=== connectSerialPort without serialPortName ===');
      }

    }

}
