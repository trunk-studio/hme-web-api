import {SerialPort} from "serialport";
import Encode from "./encode";



let ping = require('ping');

export default class Hme {
  constructor (serialPortName) {
    this.serialPortName = serialPortName;
    this.serialPortIsOpen = false;
    this.serialPort = undefined;
    this.restComm = [128,1,0,0,0,0,0,50,1,0,0,0,0,0,1,0,0,53,1,0];
    this.encode = new Encode();
    this.RxBufArry = [999];
  }

  sleep(ms = 0){
    return new Promise(r => setTimeout(r, ms));
  };




  async connectSerialPort () {
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
        return true;
      } else {
        return false;
        console.log('=== connectSerialPort without serialPortName ===');
      }
    } catch (e) {
      throw e;
    }
  };

  async ping () {
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
  };

  async pingAllSlave () {
    try {

      let hosts = [],
          slaves = [],
          result = [];

      for(let i=1;i<10;i++) {
        hosts.push(`hmepi00${i}.local`);
      }
      hosts.push(`hmepi010.local`);

      for(let host of hosts) {
        console.log("host:",host);
        let exist = await new Promise((done) => {
          ping.sys.probe(host, function (res) {
            done(res);
          });
        });
        if(exist) {
          await models.Slave.findOrCreate({
            where: {
              host: host
            },
            defaults: {
              host: host,
              description: 'test',
              apiVersion : 'test'
            }
          });
          result.push({
              host: host,
              description: 'test',
              apiVersion : 'test'
            });
        }
      }

      return result;
    } catch (e) {
      throw e;
    }
  };

  async UartTxRx ({Comm,RxLen})  {
    try {
      let serialPort = this.serialPort;
      let Rxarry = this.RxBufArry ;
      let DataBufArry =[];
      let T1num = 0;
      const T1NUMMAX = 30;
      const T1MS = 10;
      // T1NUMMAX * T1MS = maximum reception time

      let result = await new Promise((resolve, reject) => {
        //Rxarry= [1];
        Rxarry.length = 0;
        serialPort.write(Comm, function(err, results) {
          if(err) return reject(err);

          var T2id = setTimeout(function(){
            console.log('drain eer' );
            return reject(results);
          },1500);

          serialPort.drain(function (error) {
            console.log('UART drain');
            var T1id = setInterval(function(){
              T1num++;
              if (Rxarry.length == RxLen) {
                results = Rxarry;
                clearInterval(T1id);
                clearTimeout(T2id);
                console.log('TimeCont=',T1num);
                return resolve(results);
              } else if (T1num > T1NUMMAX) {
                console.log('TimeOut!');
                results = [];
                clearInterval(T1id);
                clearTimeout(T2id);
                return resolve(results);
              } else if (Rxarry.length > RxLen) {
                console.log('DataErr!');
                results = [];
                clearInterval(T1id);
                clearTimeout(T2id);
                return resolve(results);
              } else {

              }
            } ,T1MS);
          });
        });
      });
      return result;
    } catch (e) {
      console.log('ERROR!!');
      throw e;
    }
  };

  async uartDataTxRx ({Comm, RxLen, waitTime})  {
    try {
      let serialPort = this.serialPort;
      let Rxarry = this.RxBufArry ;
      let DataBufArry =[];
      let T1num = 0;
      const T1MS = 10;
      let T1NumMax = Math.ceil(waitTime/T1MS);

      // T1NUMMAX * T1MS = maximum reception time
      let success = false;
      let result = await new Promise((resolve, reject) => {
        //Rxarry= [1];
        Rxarry.length = 0;
        let RepeatIndex = 0;

        serialPort.write(Comm, function(err, results) {
          if(err) return reject(err);

          var T2id = setTimeout(function(){
            console.log('drain eer' );
            return reject(results);
          },1500 + waitTime);

          serialPort.drain(function (error) {
            console.log('UART drain');
            console.log("T1NumMax=", T1NumMax);
            var T1id = setInterval(function(){
              T1num++;
              if (Rxarry.length == RxLen) {
                results = Rxarry;
                clearInterval(T1id);
                clearTimeout(T2id);
                console.log('TimeCont=',T1num);
                success = true;
                return resolve(results);
              } else if (T1num > T1NumMax) {
                console.log('TimeOut!');
                results = [];
                clearInterval(T1id);
                clearTimeout(T2id);
                return resolve(results);
              } else if (Rxarry.length > RxLen) {
                console.log('DataErr!');
                results = [];
                clearInterval(T1id);
                clearTimeout(T2id);
                return resolve(results);
              } else {

              }
            } ,T1MS);
          });
        });
      });
      return ({RxData: result, success: success});
    } catch (e) {
      console.log('ERROR!!');
      throw e;
    }
  };

  async SearchDevice () {
    try {

      let result = await this.resetID();

      return result;
    } catch (e) {
      throw e;
    }
  };



  async pollingSearchDevice ()  {
    try {
      let ReDevArry = [];
      let ReDataArry = [];
      const MAXSECHDEVNUM = 100;

      let params = {
        u8DevID:1,
        groupID:0,
        sFunc:'WordRd',
        u8DataNum:1,
        u8Addr_Arry:[1031],  //Device group
        u8DataIn_Arry:[],
        u8Mask_Arry:[],
        RepeatNum:1
      }
      let params2 = {
        Comm:[],
        RxLen:11
      }
      let DecodParams = {
        FuncCT:33,
        devID:1,
        u8RxDataArry:[],
        u8DataNum: params.u8DataNum
      }

      for (let i = 1; i < MAXSECHDEVNUM; i++) {
        params.u8DevID = i;
        console.log('Search DevID:',params.u8DevID);
        params2.Comm = this.encode.ClientOp(params);
        console.log('Sech Comm=',params2.Comm);

        DecodParams.u8RxDataArry =  await this.UartTxRx(params2);
        DecodParams.devID = i;
        ReDataArry = this.encode.RxDecode(DecodParams).ramData;
        if (ReDataArry.length != 0) {
          console.log('out =', i);
          console.log('out =',ReDataArry);
          let DevData = {
            devID:i,
            DevGroup:ReDataArry[0]
          }
          ReDevArry.push(DevData);
          console.log('out =',ReDevArry);
        }
      }
      return(ReDevArry);
    } catch (e) {
      throw e;
    }
  };

  async resetID ()  {
  try {
    let serialPort = this.serialPort;
    let Rxarry = this.RxBufArry ;

    console.log('resetID');
    let restartNum = 5;
    let success = false;

    let RxRawArry = [];
    let ReDevArry = []; //[[devID1, gID1],[devID2, gID2]]

    do {
      Rxarry.length = 0;
      console.log('Pulse');
      await services.hmegpio.gpioPulse(5);
      await this.sleep(15);
      serialPort.write([1,0], function(err, results) {
        if(err) return reject(err);
      });

      await this.sleep(30);
      let waitFlag = false;
      let oldRxLen = 0;

      do {
        await this.sleep(20);
        console.log("Rxarry:", Rxarry);
        console.log("Rxarry.length:", Rxarry.length);
        console.log('Rxarry:', Rxarry,'oldRxLen:',oldRxLen);

        waitFlag = (Rxarry.length > oldRxLen && Rxarry[0] != 1 );
        console.log('Rxarry[0]:',Rxarry[0]);
        console.log('waitFlag:',waitFlag);
        oldRxLen = Rxarry.length;
      } while (waitFlag);

      restartNum--;
      console.log("restartNum:", restartNum);
    } while (!(restartNum <= 0 || Rxarry[0] === 2));


    if (Rxarry.length != 0 && (Rxarry.length % 2) == 0) {
      for (var i = 0; i < Math.ceil(Rxarry.length/2); i++) {
        let DevData = {
          devID:Rxarry[i * 2] + (Rxarry[(i * 2) + 1] * 255) - 1,
          DevGroup:0
        }
        ReDevArry.push(DevData); //0 is counterfeit
      }
    }

    return ReDevArry;

  } catch (e) {
    throw e;
  }
};

  async getSlaveDeviceArray (slaveId)  {
    try {
      let deviceList = await models.Device.findAll({
        where:{
          SlaveId: slaveId
        }
      });
      let result = [];
      for(let device of deviceList) {
        result.push(device.uid);
      }
      return result;
    } catch (e) {
      throw e;
    }
  };

  async getCachedDeviceList ()  {
    try {
      let deviceList = await models.Device.findAll();
      let result = [];
      for(let device of deviceList) {
        result.push({
          devID: device.uid,
          SlaveId: device.SlaveId
        });
      }
      console.log(JSON.stringify(result,null, 4));

      return result;
    } catch (e) {
      throw e;
    }
  };

  async getCachedDeviceListBySlave (slaveId)  {
    try {
      let deviceList = await models.Device.findAll({where: {SlaveId: slaveId}});
      let result = [];
      for(let device of deviceList) {
        result.push({
          devID: device.uid,
          SlaveId: device.SlaveId
        });
      }
      console.log(JSON.stringify(result,null, 4));

      return result;
    } catch (e) {
      throw e;
    }
  };

  async getCachedSlaveList ()  {
    try {
      let slaveList = await models.Slave.findAll();
      let result = [];
      for(let slave of slaveList) {
        result.push({
          id: slave.id,
          host: slave.host,
          description: slave.description,
          apiVersion: slave.apiVersion
        });
      }
      console.log(JSON.stringify(result,null, 4));

      return result;
    } catch (e) {
      throw e;
    }
  };



  async testAll ()  {
    try {
      await this.testGroup(0)
      return (true);
    } catch (e) {
      throw e;
    }
  };

  async testDevID (devID)  {
    try {
      console.log('devID:',devID);
      return (await this.testDevice(devID,0));
    } catch (e) {
      throw e;
    }
  };

  async testGroup (groupID)  {
    try {
      let BrightArry = [5000, 10, 5000, 10, 5000, 10];
      let serialPort = this.serialPort;
      let triggerTimeMs = 500;
      let devID = 0;

      let LedBghParams = {
        devID:devID,
        groupID:groupID,
        Led1Bgt:0,
        Led2Bgt:0,
        Led3Bgt:0,
        Led4Bgt:0,
        Led5Bgt:0
      }
      console.log('devID:',devID);
      console.log('groupID:',groupID);
      console.log('LedBghParams:',LedBghParams);
      if (false == await this.setLedBrighter(LedBghParams)) {
        return (false);
      }
      if (false == await this.setLedCtrlMode(devID, groupID, 'Interact')) {
        return (false);
      }
      for (var i in BrightArry) {
        LedBghParams.Led1Bgt = BrightArry[i];
        LedBghParams.Led2Bgt = BrightArry[i];
        LedBghParams.Led3Bgt = BrightArry[i];
        LedBghParams.Led4Bgt = BrightArry[i];
        LedBghParams.Led5Bgt = BrightArry[i];
        if (false == await this.setLedBrighter(LedBghParams)) {
          return (false);
        }
        await this.sleep(triggerTimeMs);
      }
      if (false == await this.setLedBrighter(LedBghParams)) {
        return (false);
      }
      await this.sleep(triggerTimeMs);
      if (false == await this.setLedCtrlMode(devID, groupID, 'Normal')) {
        return (false);
      }
      return (true);
    } catch (e) {
      throw e;
    }
  };

  async testDevice (devID, groupID)  {
    try {
      let BrightArry = [5000, 10, 5000, 10, 5000, 10];
      let serialPort = this.serialPort;
      let triggerTimeMs = 500;

      let LedBghParams = {
        devID:devID,
        groupID:groupID,
        Led1Bgt:0,
        Led2Bgt:0,
        Led3Bgt:0,
        Led4Bgt:0,
        Led5Bgt:0
      }
      console.log('testDevice,devID:',devID,'groupID:',groupID);
      if (await this.setLedBrighter(LedBghParams) == false){
        return (false);
      }
      if ( await this.setLedCtrlMode(devID, groupID, 'Interact') == false){
        return (false);
      }

      for (var i in BrightArry) {
        LedBghParams.Led1Bgt = BrightArry[i];
        LedBghParams.Led2Bgt = BrightArry[i];
        LedBghParams.Led3Bgt = BrightArry[i];
        LedBghParams.Led4Bgt = BrightArry[i];
        LedBghParams.Led5Bgt = BrightArry[i];
        if ( await this.setLedBrighter(LedBghParams) == false){
          return (false);
        }
        await this.sleep(triggerTimeMs);
      }

      if ( await this.setLedCtrlMode(devID, groupID, 'Normal') == false){
        return (false);
      }
      return (true);

    } catch (e) {
      throw e;
    }
  };


  async setLedCtrlMode (devID, groupID, CtrlMode)  {
    try {
      let CtrlModeTable = {'Normal':0, 'Fast':1, 'Interact':2};
      let accDevParams = {
        u8DevID:devID,
        groupID:groupID,
        sFunc:'WordWt',
        u8DataNum:1,
        u8Addr_Arry:[100],  //Device group
        u8DataIn_Arry:[CtrlModeTable[CtrlMode]],
        u8Mask_Arry:[],
        RepeatNum:5
      }

      console.log('setLedCtrlMode,accDevParams:', accDevParams);
      let result =  await this.accessDevice(accDevParams);
      return (result.success);

    } catch (e) {
      throw e;
    }
  };

  async setLedBrighter ({devID, groupID, Led1Bgt, Led2Bgt, Led3Bgt, Led4Bgt, Led5Bgt})  {
    try {
      let COpParams = {
        u8DevID:devID,
        groupID:groupID,
        sFunc:'WordWt',
        u8DataNum:5,
        u8Addr_Arry:[90],
        u8DataIn_Arry:[Led1Bgt,Led2Bgt,Led3Bgt,Led4Bgt,Led5Bgt],
        u8Mask_Arry:[],
        RepeatNum:1
      }
      let TxParams = {
        Comm:[],
        RxLen:8
      }
      let DecodParams = {
        FuncCT:49,
        devID:devID,
        u8RxDataArry:[]
      }
      console.log('setLedBrighter,COpParams:',COpParams);
      console.log('setLedBrighter,devID:',devID,'groupID:',groupID);
      TxParams.Comm = this.encode.ClientOp(COpParams);
      DecodParams.u8RxDataArry =  await this.UartTxRx(TxParams);
      if(this.encode.u3ByteToWord(DecodParams.u8RxDataArry.slice(1,4)) == devID || devID == 0){
        //await this.setLedCtrlMode(devID, groupID,'Interact');
        return (true);
      } else {
        return (false);
      };

    } catch (e) {
      throw e;
    }
  };

  async setLedBrigh ({devID, groupID, LedCH, BrighNum})  {
    try {
      let COpParams = {
        u8DevID:devID,
        groupID:groupID,
        sFunc:'WordWt',
        u8DataNum:1,
        u8Addr_Arry:[],
        u8DataIn_Arry:[BrighNum],
        u8Mask_Arry:[],
        RepeatNum:1
      }

      switch (LedCH) {
        case 'All':
          COpParams.u8DataNum = 5;
          COpParams.u8Addr_Arry = [90];
          COpParams.u8DataIn_Arry = [BrighNum, BrighNum, BrighNum, BrighNum, BrighNum];
          break;
        case 'LedCH1':
          COpParams.u8Addr_Arry = [90];
          break;
        case 'LedCH2':
          COpParams.u8Addr_Arry = [91];
          break;
        case 'LedCH3':
          COpParams.u8Addr_Arry = [92];
          break;
        case 'LedCH4':
          COpParams.u8Addr_Arry = [93];
          break;
        case 'LedCH5':
          COpParams.u8Addr_Arry = [94];
          break;
        default:
          console.log('setLedBrigh_LedCH_ERROR');
      }
      let TxParams = {
        Comm:[],
        RxLen:8
      }
      let DecodParams = {
        FuncCT:49,
        devID:devID,
        u8RxDataArry:[]
      }
      console.log('setLedBrighter,COpParams:',COpParams);
      console.log('setLedBrighter,devID:',devID,'groupID:',groupID);
      TxParams.Comm = this.encode.ClientOp(COpParams);
      DecodParams.u8RxDataArry =  await this.UartTxRx(TxParams);
      if(this.encode.u3ByteToWord(DecodParams.u8RxDataArry.slice(1,4)) == devID || devID == 0){
        //await this.setLedCtrlMode(devID, groupID,'Interact');
        if ( await this.setLedCtrlMode(devID, groupID, 'Interact') == false){
          return (false);
        }
        return (true);
      } else {
        return (false);
      };

    } catch (e) {
      throw e;
    }
  };

  async setLedDisplay ({devID, groupID, WW, DB, BL, GR, RE, Bright})  {
    try {

        let setParams = {
          devID:devID,
          groupID:groupID,
          Led1Bgt: DB * Bright,
          Led2Bgt: BL * Bright,
          Led3Bgt: GR * Bright,
          Led4Bgt: RE * Bright,
          Led5Bgt: WW * Bright
        }

        let result = await this.setLedCtrlMode(devID, groupID, 'Interact');
        if (result == false) {
            return (result);
        }

        result = await this.setLedBrighter(setParams);
        return (result);
    } catch (e) {
      throw e;
    }
  };

  async setDevID (devID, groupID, newDevID)  {
    try {
        let accDevParams = {
        u8DevID:devID,
        groupID:0,
        sFunc:'WordWt',
        u8DataNum:1,
        u8Addr_Arry:[1030], //Device ID
        u8DataIn_Arry:[groupID],
        u8Mask_Arry:[],
        RepeatNum:5
      }

      console.log('setDevID,accDevParams:', accDevParams);
      let result =  await this.accessDevice(accDevParams);
      return (result.success);

    } catch (e) {
      throw e;
    }
  };

  async setGroupID (devID, groupID)  {
    try {
        let COpParams = {
        u8DevID:devID,
        groupID:0,
        sFunc:'WordWt',
        u8DataNum:1,
        u8Addr_Arry:[1031], //Device group
        u8DataIn_Arry:[groupID],
        u8Mask_Arry:[],
        RepeatNum:5
      }
      let TxParams = {
        Comm:[],
        RxLen:8
      }
      let DecodParams = {
        FuncCT:49,
        devID:devID,
        u8RxDataArry:[]
      }

      TxParams.Comm = this.encode.ClientOp(COpParams);
      DecodParams.u8RxDataArry =  await this.UartTxRx(TxParams);
      if(this.encode.u3ByteToWord(DecodParams.u8RxDataArry.slice(1,4)) == devID){
        if (await this.writeFlashMemory(devID,0)){
          return (true);
        }else {
          return (false);
        }
      } else {
        return (false);
      };


    } catch (e) {
      throw e;
    }
  };

  async writeFlashMemory (devID, groupID)  {
    try {
        let accDevParams = {
        u8DevID:devID,
        groupID:groupID,
        sFunc:'WordWt',
        u8DataNum:1,
        u8Addr_Arry:[1021],  //Addr 1021 = FMC Wr
        u8DataIn_Arry:[1],
        u8Mask_Arry:[],
        RepeatNum:5
      }

      console.log('writeFlashMemory.accDevParams=', accDevParams);
      let result = await this.accessDevice(accDevParams);
        return (result.success);

    } catch (e) {
      throw e;
    }
  };

  async ReadFlashMemory(devID, groupID)  {
    try {
      let accDevParams = {
        u8DevID:devID,
        groupID:0,
        sFunc:'WordWt',
        u8DataNum:1,
        u8Addr_Arry:[1020],  //Addr 1020 = FMC read command
        u8DataIn_Arry:[1],
        u8Mask_Arry:[],
        RepeatNum:5
      }

      console.log('ReadFlashMemory.accDevParams=', accDevParams);
      let result = await this.accessDevice(accDevParams);
        return (result.success);

    } catch (e) {
      throw e;
    }
  };

  async setDayTab (devID, groupID, dayTab)  {
    try {
        let accDevParams = {
        u8DevID:devID,
        groupID:groupID,
        sFunc:'WordWt',
        u8DataNum:18,
        u8Addr_Arry:[1100],  //Addr 1100 = day table
        u8DataIn_Arry:dayTab,
        u8Mask_Arry:[],
        RepeatNum:5
      }

      console.log('setDayTab.COpParams =', accDevParams);
      let result =  await this.accessDevice(accDevParams);
      return (result.success);


    } catch (e) {
      throw e;
    }
  };

  async setTimeTab (devID, groupID, timeTab)  {
    try {
        let accDevParams = {
        u8DevID:devID,
        groupID:groupID,
        sFunc:'WordWt',
        u8DataNum:0,
        u8Addr_Arry:[1200],  //Addr 1200 = time table
        u8DataIn_Arry:[],
        u8Mask_Arry:[],
        RepeatNum:5
      }
      let index = 0;
      while (timeTab.length >  index) {
        if ((timeTab.length - index) > 50) {
          accDevParams.u8DataNum = 50;
          accDevParams.u8Addr_Arry = [(1200 + index)];
          accDevParams.u8DataIn_Arry = timeTab.slice(index, index + accDevParams.u8DataNum);
          index += accDevParams.u8DataNum;
        } else {
          accDevParams.u8DataNum = timeTab.length - index;
          accDevParams.u8Addr_Arry = [(1200 + index)];
          accDevParams.u8DataIn_Arry = timeTab.slice(index, index + accDevParams.u8DataNum);
          index += accDevParams.u8DataNum;
        }
        console.log('setTimeTab.accDevParams', accDevParams);
        let result =  await this.accessDevice(accDevParams);
        if(result.success != true){
          return (false);
        }
      }
      return (true);

    } catch (e) {
      throw e;
    }
  };


  async writeTimeTabToDevices (config, devList) {
    try {
          let devID = 0;
          let groupID = 0;
          let timeTabArry = this.encode.configToTimeTabArry(config);

          for (let i = 0; i < devList.devIDs.length; i++) {
            devID = devList.devIDs[i];
            // console.log(timeTabArry.dayTab);
            console.log(devID);
            console.log(timeTabArry.dayTab);
            let result = await this.setDayTab(devID, groupID, timeTabArry.dayTab);
            if(result == false){
              return (false);
            }
            result = await this.setTimeTab(devID, groupID, timeTabArry.timePwmTab);
            if(result == false){
              return (false);
            }
            result = await this.writeFlashMemory(devID, groupID)
            if(result == false){
              return (false);
            }
          }
          return (true);

    } catch (e) {
      throw e;
    }
  };

  async setLedDisplayMode ({devID, groupID, mode})  {
    try {
        let modeIndex = {'cycle': 0, 'fullPower': 1, '6500k': 2, '4600k': 3,
                '2950k': 4, 'savingE': 5, 'blueRed': 6}
        let accDevParams = {
        u8DevID:devID,
        groupID:groupID,
        sFunc:'WordWt',
        u8DataNum:1,
        u8Addr_Arry:[103], //Normal control index
        u8DataIn_Arry:[modeIndex[mode]],
        u8Mask_Arry:[],
        RepeatNum:5
      }

      let result =  await this.accessDevice(accDevParams);
      return (result.success);

    } catch (e) {
      throw e;
    }
  };

  async setSimRtc ({devID, groupID, year, month, day, hour, min, sec})  {
    try {
        let accDevParams = {
          u8DevID:devID,
          groupID:groupID,
          sFunc:'WordWt',
          u8DataNum:6,
          u8Addr_Arry:[70],  //Addr 70 = RTC simulate set value
          u8DataIn_Arry:[year, month, day, hour, min, sec],
          u8Mask_Arry:[],
          RepeatNum:5
        }

        console.log('setDayTab.accDevParams =', accDevParams);
        let result =  await this.accessDevice(accDevParams);

        return (result.success);

    } catch (e) {
      throw e;
    }
  };

  async getSimRtc (devID, groupID)  {
    try {
        let accDevParams = {
          u8DevID:devID,
          groupID:groupID,
          sFunc:'WordRd',
          u8DataNum:6,
          u8Addr_Arry:[70],  //Addr 70 = RTC simulate set value
          u8DataIn_Arry:[],
          u8Mask_Arry:[],
          RepeatNum:5
        }

        let result =  await this.accessDevice(accDevParams);

        if(result.success){
          return (result.ramData);
        } else {
          return (false);
        };
    } catch (e) {
      throw e;
    }
  };

  async setSimRtcFunc(devID, groupID, func)  {
    try {
        let funcIndex = {init: 0, run: 1, stop: 2}
        let accDevParams = {
          u8DevID:devID,
          groupID:groupID,
          sFunc:'WordWt',
          u8DataNum:1,
          u8Addr_Arry:[60],  //Addr 60 = RTC simulate function
          u8DataIn_Arry:[funcIndex[func]],
          u8Mask_Arry:[],
          RepeatNum:5
        }

        console.log('setDayTab.accDevParams =', accDevParams);
        let result =  await this.accessDevice(accDevParams);
        return (result.success);

    } catch (e) {
      throw e;
    }
  };

  async setSimRtcFastForward(devID, groupID, rate)  {
    try {
        //rate:0~2000
        let accDevParams = {
          u8DevID:devID,
          groupID:groupID,
          sFunc:'WordWt',
          u8DataNum:1,
          u8Addr_Arry:[61],  //Addr 61 = RTC simulate frequency divider (data: 0~2000 -> 2000Hz~1Hz)
          u8DataIn_Arry:[(2000 - rate)],
          u8Mask_Arry:[],
          RepeatNum:5
        }

        console.log('setDayTab.accDevParams =', accDevParams);
        let result =  await this.accessDevice(accDevParams);
        return (result.success);

    } catch (e) {
      throw e;
    }
  };

  async setFastRun (devID, groupID, rate, timeTab)  {
    try {
      let timeTabArry = [];
      for (var i = 0; i < timeTab.length; i++) {
        timeTabArry = [
          ...timeTabArry,
          ...this.encode.timeSetToArry(timeTab[i])
         ]
      }
      console.log('timeTabArry=', timeTabArry);

      if(await this.setTimeTab(devID, groupID, timeTabArry) == false){
        return (false);
      }

      let SimRtc = {
            devID: devID,
            groupID: groupID,
            year: 1900,
            month: 1,
            day: 1,
            hour: 0,
            min: 0,
            sec: 0
          }
      if(await this.setSimRtc(SimRtc) == false){
        console.log('setSimRtc_Error');
        return (false);
      }

      if(await this.setSimRtcFunc(devID, groupID, 'init') == false){
        console.log('setSimRtcFunc_Error');
        return (false);
      }

      if(await this.setLedCtrlMode(devID, groupID, 'Fast') == false){
        console.log('setLedCtrlMode_Error');
        return (false);
      }

      if(await this.setSimRtcFastForward(devID, groupID, rate) == false){
        console.log('setSimRtcFastForward_Error');
        return (false);
      }

      if(await this.setSimRtcFunc(devID, groupID, 'run') == false){
        console.log('setSimRtcFunc_Error');
        return (false);
      }


      return (true);

    } catch (e) {
      throw e;
    }
  };


  async closeFastRun(devID, groupID)  {
    try {

        if(await this.setLedCtrlMode(devID, groupID, 'Normal') == false){
          console.log('clFR.setLedCtrlMode_Error');
          return (false);
        }
        if(await this.ReadFlashMemory(devID, groupID) == false){
          console.log('clFR.ReadFlashMemory_Error');
          return (false);
        }

        return (true);

    } catch (e) {
      throw e;
    }
  };

  async setDevRTC ({year, month, day, hour, min, sec})  {
    try {
        let accDevParams = {
        u8DevID:0,
        groupID:0,
        sFunc:'WordWt',
        u8DataNum:6,
        u8Addr_Arry:[50], //RTC set[50~55]
        u8DataIn_Arry:[year, month, day, hour, min, sec],
        u8Mask_Arry:[],
        RepeatNum:5
      }

      console.log('setDevRTC,accDevParams:', accDevParams);
      let result =  await this.accessDevice(accDevParams);
      if (result.success == false) {
        return(false)
      }

      accDevParams = {
        u8DevID:0,
        groupID:0,
        sFunc:'WordWt',
        u8DataNum:1,
        u8Addr_Arry:[59],  //Addr 59 = RTC set comm
        u8DataIn_Arry:[1],
        u8Mask_Arry:[],
        RepeatNum:5
      }

      result =  await this.accessDevice(accDevParams);
      await this.sleep(500);  // wait RTC write
      return (result.success);
    } catch (e) {
      throw e;
    }
  };

  async getDevRTC (devID, groupID)  {
    try {
        let accDevParams = {
          u8DevID:devID,
          groupID:groupID,
          sFunc:'WordRd',
          u8DataNum:6,
          u8Addr_Arry:[40],  //Addr 40~45 = RTC:Y,M,D,h,m,s
          u8DataIn_Arry:[],
          u8Mask_Arry:[],
          RepeatNum:5
        }

        console.log('getDevRTC.accDevParams=', accDevParams);
        let reData = await this.accessDevice(accDevParams);
        let result = {
          year: reData.ramData[0],
          month: reData.ramData[1],
          day: reData.ramData[2],
          hour: reData.ramData[3],
          min: reData.ramData[4],
          sec: reData.ramData[5],
          success: reData.success
        };

        return (result);

    } catch (e) {
      throw e;
    }
  };

  async setSysTimeToDevRTC ()  {
    try {
      let d = new Date;
      let params = {
        year: d.getFullYear(),
        month: d.getMonth() + 1,
        day: d.getDate(),
        hour: d.getHours(),
        min: d.getMinutes(),
        sec: d.getSeconds()
      }

        console.log('setSysTimeToDevRTC.params=', params);
        let result = await this.setDevRTC(params);
        return (result);

    } catch (e) {
      throw e;
    }
  };



  async getDevState (devID, groupID)  {
    try {
        let accDevParams = {
          u8DevID:devID,
          groupID:groupID,
          sFunc:'DiscWordRd',
          u8DataNum:3,
          u8Addr_Arry:[15, 16 ,30],  //Addr 15 = LED temp, 30 =fan flage
          u8DataIn_Arry:[],
          u8Mask_Arry:[],
          RepeatNum:5
        }

        console.log('getDevTemp.accDevParams=', accDevParams);
        let reData = await this.accessDevice(accDevParams);
        let result = {
          devTemp: reData.ramData[0] / 100,
          envTemp: reData.ramData[1] / 100,
          fanState: (reData.ramData[2] == 0),
          success: reData.success
        };

        return (result);

    } catch (e) {
      throw e;
    }
  };



  async accessDevice ({u8DevID, groupID, sFunc, u8DataNum, u8Addr_Arry, u8DataIn_Arry, u8Mask_Arry, RepeatNum})  {
    try {
      let result = {
        ramData: [],
        success: false
      }
      let COpParams = {
        u8DevID:u8DevID,
        groupID:groupID,
        sFunc:sFunc,
        u8DataNum:u8DataNum,
        u8Addr_Arry:u8Addr_Arry,
        u8DataIn_Arry:u8DataIn_Arry,
        u8Mask_Arry:u8Mask_Arry,
        RepeatNum:RepeatNum
      }
      let TxParams = {
        Comm: [],
        RxLen: undefined,
        waitTime: Math.ceil(u8DataNum * 0.7) + 13
      }

      let FuncCommTable = {'Inital':0, 'Close':0, 'BitModify':17, 'BitInv':18, 'WordRd':33, 'DiscWordRd':34,
    					'WordWt':49, 'DiscWordWt':50};

      // Set RxLen
      if (u8DevID == 0) {
        TxParams.RxLen = 0;
      } else if (sFunc == 'WordRd' || sFunc == 'DiscWordRd') {
        TxParams.RxLen = 8 + (u8DataNum * 3);
      } else {
        TxParams.RxLen = 8;
      }

      // Set Comm
      TxParams.Comm = this.encode.ClientOp(COpParams);

      let DecodParams = {
        FuncCT:(FuncCommTable[sFunc] & 0x7f),
        devID:u8DevID,
        u8RxDataArry:[],
        u8DataNum: u8DataNum
      }

      //Send data
      let receiveRawData  = undefined;
      let repeatIndex = 0;

      do {
        receiveRawData =  await this.uartDataTxRx(TxParams);
        repeatIndex++;
        if (u8DevID == 0 && receiveRawData.success == true) {
          // u8DevID == 0 => Broadcast mode
          // console.log('accDev_group');
          result.ramData = [];
          result.success = true;
          return(result);
        } else if (receiveRawData.RxData.length != 0 && receiveRawData.success == true) {
          //have to discoding
          // console.log('accDev_discoding');
          DecodParams.u8RxDataArry = receiveRawData.RxData;
          let receiveData = this.encode.RxDecode(DecodParams);
          if(receiveData.success){
            result.ramData = receiveData.ramData;
            result.success = true;
            return(result);
          }else {
            //receive is Error
            console.log(' accDev_Error');
            receiveRawData.success = false;
          }
        }

      } while ((RepeatNum > repeatIndex) && (receiveRawData.success != true));
      // if (receiveRawData.success == false) {
      //   return (result);
      // }
      return (result);
    } catch (e) {
      throw e;
    }
  }


  _eventsSetup()  {
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

  };

  async clearOldMessages()  {
    let d = new Date();
    // Set it to one month ago
    d.setMonth(d.getMonth() - 1);
    // Zero the hours
    d.setHours(0,0,0);
    let oldMessages = await models.Message.findAll({
      where: {
        createdAt: {
          lt: d,
          sended: 1
        }
      }
    });
    // oldMessages.destroy();
    oldMessages.map((message) => {
      message.destroy();
    });
    return true
  }

}
