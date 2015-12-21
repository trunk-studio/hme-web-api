let SerialPort = require("serialport").SerialPort;
let Encode = require("./encode");

export default class Hme {
  constructor (serialPortName) {
    this.serialPortName = serialPortName;
    this.serialPortIsOpen = false;
    this.serialPort = undefined;
    this.restComm = [128,1,0,0,0,0,0,50,1,0,0,0,0,0,1,0,0,53,1,0];
    this.encode = new Encode();
    this.RxBufArry = [999];
  }


  hello = (app) => {
    let hello = 'yes!';
    return {hello};
  }

  connectSerialPort = async () => {
    try {
      if(this.serialPortName != undefined){

        let serialPort = new SerialPort(this.serialPortName, {baudrate: 115200}, true);
        this.serialPort = serialPort

        this.serialPortIsOpen = await new Promise((resolve, reject) => {
          serialPort.on ('open', function () {
            resolve(true)
          });
        });

        console.log('=== openSerialPort ===', this.serialPortIsOpen);

        this._eventsSetup();
      } else {
        console.log('=== connectSerialPort without serialPortName ===');
      }
    } catch (e) {
      throw e;
    }
  }

  ping = async () => {
    try {
      let serialPort = this.serialPort;
      let restComm = this.restComm;

      let result = await new Promise((resolve, reject) => {
        serialPort.write(restComm, function(err, results) {
          if(err) return reject(err);

          resolve(results);
          console.log('TX1 Num =' + results);
        });
      });

      return result;
    } catch (e) {
      throw e;
    }
  }




  UartTxRx = async ({Comm,RxLen}) => {
    try {
      let serialPort = this.serialPort;
      let Rxarry = this.RxBufArry ;
      let DataBufArry =[];
      let T1num = 0;

      let result = await new Promise((resolve, reject) => {
        //Rxarry= [1];
        Rxarry.length = 0;
        serialPort.write(Comm, function(err, results) {
          if(err) return reject(err);
        console.log('TX=',Comm);
        serialPort.drain(function (error) {
          var T1id = setInterval(function(){
            T1num++;
            if (Rxarry.length == RxLen) {
              results = Rxarry;
              resolve(results);
              console.log('RX arry=',Rxarry);
              clearInterval(T1id);
            } else if (T1num > 5) {
              console.log('TimeOut!');
              results = [];
              resolve(results);
              clearInterval(T1id);
            } else if (Rxarry.length > RxLen) {
              console.log('DataErr!');
              results = [];
              resolve(results);
              clearInterval(T1id);
            } else {
              console.log(Rxarry.length,'Byte');
              console.log(T1num,'ms');
            }
          } ,1);
        });
      });
    });
      return result;
    } catch (e) {
      throw e;
    }
  }

  SearchDevice = async () => {
    try {
      let ReDevArry = [];
      let i = 1;
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
      let Comm = this.encode.ClientOp(params);
      console.log('Comm=',Comm);
      let params2 = {
        Comm:Comm,
        RxLen:11
      }
      let ReDataArry = await this.UartTxRx(params2);
      if (ReDataArry != []) {
        let DevData = {
          DevID:i,
          DevGroup:ReDataArry[0]
        };
        ReDevArry.push(DevData);
      }

      return(ReDevArry);
    } catch (e) {
      throw e;
    }
  }


  _eventsSetup = () => {
    let serialPort = this.serialPort;
    let RxBufArry = this.RxBufArry

    console.log('=== start eventsSetup ===');

    serialPort.on('data', function(data) {
      //var buff = new Buffer(data)
      //console.log(this);
      console.log('RXdata len: ' + data.length);
      for (let i = 0; i < data.length; i++) {
        RxBufArry.push(data[i]);
        // console.log(data[i]);
      }
    });

  }
}
