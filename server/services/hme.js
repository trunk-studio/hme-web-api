let SerialPort = require("serialport").SerialPort;

export default class Hme {
    constructor (serialPortName) {
      this.serialPortName = serialPortName;
      this.serialPortIsOpen = false;
      this.serialPort = undefined;
    }

    hello = (app) => {
      let hello = 'yes!';
      return {hello};
    }

    connectSerialPort = async () => {
      if(this.serialPortName != undefined){
        // var RestComm = [128,1,0,0,0,0,0,50,1,0,0,0,0,0,1,0,0,53,1,0]

        this.serialPort = new SerialPort(this.serialPortName, {baudrate: 115200}, true);
        this.serialPortIsOpen = await new Promise((resolve, reject) => {
          serialPort.on ('open', function () {
            resolve(true)
          });
        });

        console.log('=== openSerialPort ===', this.serialPortIsOpen);
      } else {
        console.log('=== connectSerialPort without serialPortName ===');
      }

    }

}
