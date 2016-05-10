import request from 'superagent'
import ini from 'ini'
import {exec, execSync} from 'child_process';

exports.status = async function (ctx) {
  try {
    ctx.body = {hme: 'ready'};
  } catch (e) {
    throw e;
  }
};

exports.hello = async function (ctx) {
  try {
    let result = await services.hme.hello()

    ctx.body = {result}
  } catch (e) {
    throw(e);
  }
};

exports.ping = async function (ctx) {
  try {
    let result = await services.hme.ping();
    ctx.body = {result}
  } catch (e) {
    throw(e);
  }
};


exports.searchDevice = async function (ctx) {
  // let result = await services.hme.SearchDevice();
  try {
    let slaveId = ctx.params.slaveId;
    if(slaveId == 0){
      let host = await services.deviceControl.getDomainHost(ctx.request.header.host);
      console.log("host!!",host);
      let slave = await models.Slave.findOne({
        where:{
          host: { $like: '%'+host+'%' }
        }
      });
      console.log("slave!!",slave);
      slaveId = slave.id;
    }
    await services.deviceControl.syncDevice(slaveId);
    ctx.body = 'ok';
  } catch (e) {
    console.log(e);
    throw e;
  }
};

exports.findAllDeviceGroups = async function (ctx) {
  // let result = await models.groups.findAll();
  try {
    let result = [
      {
        id: 1
      },
      {
        id: 2
      },
      {
        id: 3
      }
    ];
    ctx.body = result
  } catch (e) {
    throw(e);
  }
}

exports.setLedDisplay = async function (ctx) {
  try {
    let data = ctx.request.body;
    console.log('setLedDisplay',data);
    let result = await services.hme.setLedDisplay(data);
    ctx.body = result
  } catch (e) {
    throw(e);
  }
};

exports.previewLedColor = async function (ctx) {
  try {
    let data = ctx.request.body;
    console.log('setLedDisplay',data);
    let schedule = await models.Schedule.findById(data.scheduleID);
    let ledData = {
      WW: data.WW,
      DB: data.DB,
      BL: data.BL,
      GR: data.GR,
      RE: data.RE,
      Bright: data.Bright,
      devID: data.devID,
      groupID: data.groupID,
    };
    let devices;
    if(schedule.SlaveId === null){
      let slaveList = await models.Slave.findAll();
      for (let slave of slaveList) {
        // devices = await models.Device.findAll({
        //   where:{
        //     SlaveId: slave.id
        //   }
        // });
        // for(let device of devices){
          try {
            // ledData.devID = device.uid;
            let result = await new Promise((resolve, reject) => {
              // request.post(`http://${slave.host}:3000/rest/slave/${slave.id}/device/${device.uid}/setLedDisplay`)
              request.post(`http://${slave.host}:3000/rest/slave/${slave.id}/device/0/setLedDisplay`)
              .send(ledData)
              .end((err, res) => {
                if(err) return reject(err);
                resolve(res.body);
              });
            });
          } catch (e) {
            console.log(e);
          }
        // }
      }
    }else{
      let slave = await models.Slave.findById(schedule.SlaveId);
      // devices = await models.Device.findAll({
      //   where:{
      //     SlaveId: schedule.SlaveId
      //   }
      // })
      // ledData.groupID = slave.id;
      // for(let device of devices){
        try {
          // ledData.devID = device.uid;
          let result = await new Promise((resolve, reject) => {
            // request.post(`http://${slave.host}:3000/rest/slave/${schedule.SlaveId}/device/${device.uid}/setLedDisplay`)
            request.post(`http://${slave.host}:3000/rest/slave/${schedule.SlaveId}/device/0/setLedDisplay`)
            .send(ledData)
            .end((err, res) => {
              if(err) return reject(err);
              resolve(res.body);
            });
          });
        } catch (e) {
          console.log(e);
        }
      // }
    }
    ctx.body = 'ok'
  } catch (e) {
    console.log(e);
    throw(e);
  }
};

exports.testAllDevices = async function (ctx) {
  try {
    let result = await services.hme.testAll();
    ctx.body = result
  } catch (e) {
    throw e;
  }
}

exports.testDeviceByID = async function (ctx) {
  try {
    let devID = ctx.params.deviceId;
    let result = await services.hme.testDevID(devID);
    ctx.body = result
  } catch (e) {
    throw e;
  }
}

exports.testGruopByID = async function (ctx) {
  try {
    let groupID = ctx.params.slaveId;
    let result = await services.hme.testGroup(0);
    ctx.body = result
  } catch (e) {

  }
}

exports.getCachedDeviceList = async function (ctx) {
  try {
    let result = await services.hme.getCachedDeviceList();
    ctx.body = result;
  } catch (e) {
    throw e;
  }
}

exports.getCachedDeviceListBySlave = async function (ctx) {
  try {
    let slaveId = ctx.params.slaveId;
    let result = await services.hme.getCachedDeviceListBySlave(slaveId);
    ctx.body = result;
  } catch (e) {
    throw e;
  }
}

exports.searchSlave = async function(ctx) {
  try {
    let result = await services.hme.pingAllSlave();
    ctx.body = result;
  } catch (e) {
    throw e;
  }
}

exports.getCachedSlaveList = async function (ctx) {
  try {
    let result = await services.hme.getCachedSlaveList();
    ctx.body = result;
  } catch (e) {
    throw e;
  }
}

exports.getCachedSlaveAndDeviceList = async function (ctx) {
  try {
    // let [slaveList, deviceList] = await Promise.all([services.hme.getCachedSlaveList(), services.hme.getCachedDeviceList()]);
    let slaveList = await services.hme.getCachedSlaveList();
    let slaveIdArray = slaveList.map((slave) => slave.id);
    let deviceList = await services.hme.getCachedDeviceList(slaveIdArray);
    ctx.body = {
      slaveList: slaveList,
      deviceList: deviceList
    };
  } catch (e) {
    throw e;
  }
}

exports.syncAllSlaveAndDevice = async function (ctx) {
  try{
    let result = await services.deviceControl.syncAllSlaveAndDevice();
    ctx.body = 'ok';
  }catch(e){
    throw e;
  }
}

exports.saveEmail = async function (ctx) {
  try {
    let emails = ctx.request.body.emails;
    console.log(emails);
    let result = await services.deviceControl.saveEmail(emails);
    ctx.body = 'ok';
  } catch (e) {
    throw e;
  }
}

exports.loadEmail = async function (ctx) {
  try {
    let result = await services.deviceControl.loadEmail();
    ctx.body = { emails: result};
  } catch (e) {
    throw e;
  }
}

exports.registerSlave = async function (ctx) {
  try {
    let data = ctx.request.body;
    let result = await services.deviceControl.registerSlave(data);
    ctx.body = 'ok';
  } catch (e) {
    throw e;
  }
}


exports.slaveSyncNewSlave = async function (ctx) {
  try {
    let data = ctx.request.body;
    let result = await services.deviceControl.slaveSyncNewSlave(data);
    ctx.body = 'ok';
  } catch (e) {
    throw e;
  }
}

exports.saveSetting = async function (ctx) {
  try {
    let data = ctx.request.body;
    let result = await services.deviceControl.saveSetting(data);
    ctx.body = {result};
  } catch (e) {
    throw e;
  }
}

exports.getSetting = async function (ctx) {
  try {
    let result = await services.deviceControl.getSetting();
    ctx.body = result;
  } catch (e) {
    throw e;
  }
}

exports.getDeviceStatus = async function (ctx) {
  try {
    let slaveId = ctx.params.slaveId;
    let devId = ctx.params.deviceId;
    let result = await services.hme.getDevState(devId);
    ctx.body = result;
  } catch (e) {
    ctx.body = e;
    throw e;
  }
}

exports.checkAllDeviceStatus = async function (ctx) {
  try {
    let config =  await services.deviceControl.getSetting();
    let host = config.SYSTEM.HME_SERIAL;
    console.log("host!!",host);
    let slave = await models.Slave.findOne({
      where:{
        host: { $like: '%'+host+'%' }
      }
    });
    let slaveId = slave.id;
    let deviceList = await models.Device.findAll({where: {SlaveId: slaveId}});
      for(let device of deviceList) {
        let result = await services.hme.getDevState(device.uid);
        let tempError = result.devTemp >= parseInt(config.SYSTEM.TEMP_LIMIT, 10);
        let fanError = !result.fanState;
        let statusFail = tempError || fanError;
        if (statusFail) {
          let info = '';
          if(tempError) {
            info += 'Temp Error, ';
          }
          if(fanError) {
            info += 'Fan Statu Error ';
          }
          await models.Message.create({
            title: `${host} device ${device.uid} ${info}`,
            content: `${host} device ${device.uid} ${info}`,
            type: 'error',
          });
        }
      }
    ctx.body = 'ok';
  } catch (e) {
    ctx.body = e;
    throw e;
  }
}

exports.updateAllSlaveTime = async function (ctx) {
  try {
    let slaveList = await models.Slave.findAll();
    for (let slave of slaveList) {
      let result = await new Promise((resolve, reject) => {
        request
        .post(`http://${slave.host}:3000/rest/slave/${slave.id}/updateTime`)
        .end((err, res) => {
          if(err) return reject(err);
          resolve(res.body);
        });
      });
    }
    ctx.body = 'ok';
  } catch (e) {
    ctx.body = e;
    throw e;
  }
}

exports.updateTime = async function (ctx) {
  try {
    let result = await services.deviceControl.getMasterTimeAndUpdate();
    ctx.body = result;
  } catch (e) {
    ctx.body = e;
    throw e;
  }
}

exports.getAllSlaveLogs = async function (ctx) {
  try {
    let slaves = await models.Slave.findAll();
    for (let slave of slaves) {
      try {
        let result = await new Promise((resolve, reject) => {
          request.get(`http://${slave.host}:3000/rest/slave/logs`)
          .end((err, res) => {
            if(err) return reject(err);
            resolve(res.body);
          });
        });

        let slaveLogs = result.map(message => {
          let log = {
            title: message.title,
            content: message.content,
            type: message.type,
          }
          return log;
        });
        await Promise.all(
          slaveLogs.map( message => models.Message.create(message))
        );
      } catch (e) {
        console.log(e);
      }
    }
    let logs = await services.deviceControl.getLogs();
    ctx.body = logs;
  } catch (e) {
    ctx.body = e;
  }
}

exports.logs = async function (ctx) {
  try {
    let config =  await services.deviceControl.getSetting();
    let logs = []
    if(config.SYSTEM.TYPE === 'slave'){
      logs = await services.deviceControl.salveLogsToMaster();
    }
    ctx.body = logs;
  } catch (e) {
    ctx.body = e;
  }
}

exports.reboot = async function (ctx) {
  try {
    let saveSetting = await ini.parse(fs.readFileSync(appConfig.configPath, 'utf-8'));
    if(saveSetting.SYSTEM.TYPE === 'slave'){
      await services.deviceControl.registerSlave({
        slaveHostName: saveSetting.SYSTEM.MASTER_NAME + '.local'
      });
    }else{
      await services.deviceControl.registerSlave({
        slaveHostName: saveSetting.SYSTEM.HME_SERIAL + '.local'
      });
    }
    execSync('cd /root/hme-web-api/wifiConfig && make client_mode && cd -');
    execSync('sudo /sbin/reboot');
    ctx.body = 'ok';
  } catch (e) {
    ctx.body = e;
    throw e;
  }
}

exports.tempLimit = async function (ctx) {
  try {
    let data = ctx.request.body;
    let result = await ini.parse(fs.readFileSync(appConfig.configPath, 'utf-8'));
    result.SYSTEM.TEMP_LIMIT = Math.round(data.tempLimit*10)/10;
    fs.writeFileSync(appConfig.configPath, ini.stringify(result))
    ctx.body = logs;
  } catch (e) {
    ctx.body = e;
  }
}

exports.getTimeZone = async function (ctx) {
  try {
    let config =  await services.deviceControl.getSetting();
    ctx.body = {
      timeZone: config.SYSTEM.TIMEZONE_OFFSET,
      timeZoneIndex: config.SYSTEM.TIMEZONE_INDEX,
    };
  } catch (e) {
    ctx.body = e;
  }
}
