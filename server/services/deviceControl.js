import request from 'superagent'
import ini from 'ini'
import ping from 'ping';
import {exec, execSync} from 'child_process';
import pjson from '../../package.json';
import { EventEmitter } from 'events';
let event = new EventEmitter();

event.on('downloadCmd', async(cmd) =>  {
  let isFinish =  await services.deviceControl.checkHasUpdateFile();
  if (!isFinish) {
    console.log("event cmd => ", cmd);
    let cmdOutput = await new Promise((done) => {
      exec(cmd, function(error, stdout, stderr) {
        if (error) {
          throw error;
        }
        console.log(stdout);
        done(stdout);
      });
    });
    console.log(cmdOutput);
  }
  event.emit('checkMd5');
});

event.on('checkMd5', async(cmd) => {
  try {
    const config =  await services.deviceControl.getUpdateSetting();
    let hasMd5Cmd =  `cat ${config.SYSTEM.UPDATE_PACKAGE_PATH}/hme.md5`;
    let hasMd5 = await new Promise((done) => {
      try {
        exec(hasMd5Cmd, function(error, stdout, stderr) {
          if(error) throw e;
          done(stdout);
        });
      } catch (e) {
        console.log(e);
      }
    });
    const checkMd5Cmd = `cd ${config.SYSTEM.UPDATE_PACKAGE_PATH}; md5sum -c hme.md5`;
    console.log("checkMd5Cmd => ",checkMd5Cmd);
    let onlineVersion = '';
    if (hasMd5) {
      onlineVersion = await new Promise((done) => {
        try {
          exec(checkMd5Cmd, function(error, stdout, stderr) {
            done(stdout);
          });
        } catch (e) {
          console.log(e);
        }
      });
    }
    const isOk = onlineVersion.indexOf('OK') !== -1;
    console.log("isOk =>", isOk);
    if(isOk){
      let systemConfig =  await services.deviceControl.getSetting();
      if(systemConfig.SYSTEM.TYPE === 'master'){
        let slaveList = await models.Slave.findAll();
        for (let slave of slaveList) {
          try {
            if(slave.host.indexOf(systemConfig.SYSTEM.HME_SERIAL) === -1){
              let result = await new Promise((resolve, reject) => {
                console.log(`get http://${slave.host}:3000/rest/master/downloadUpgrade`);
                request.get(`http://${slave.host}:3000/rest/master/downloadUpgrade`)
                .end((err, res) => {
                  if(err) return reject(err);
                  resolve(res.body);
                });
              });
            }
          } catch (e) {
            console.log(e);
          }
        }
      }
      event.emit('untar');
    }
  } catch (e) {
    console.log(e);
  }
});

event.on('untar', async(cmd) => {
  try {
    const unTarBackCmd = `make untar > /dev/null 2>&1;`;
    console.log("unTarBackCmd => ",unTarBackCmd);
    let unTarBack = await new Promise((done) => {
      exec(unTarBackCmd, function(error, stdout, stderr) {
        if (error || stderr) {
          throw error;
        }
        done(stdout);
      });
    });
    console.log(unTarBack);
    let systemConfig = await ini.parse(fs.readFileSync(appConfig.configPath, 'utf-8'));
    systemConfig.SYSTEM.UPDATE = true;
    fs.writeFileSync(appConfig.configPath, ini.stringify(systemConfig));
  } catch (e) {
    console.log(e);
  }
});

module.exports = {

  saveDevice: async(data, slaveId) => {
    try {
      await models.Device.destroy({
        where: {
          SlaveId: slaveId
        }
      });
      let deviceList = [];
      for(let device of data){

        let newDevice = {
          uid: device.devID,
          GroupId: device.GroupID,
          SlaveId: slaveId
        }

        newDevice = await models.Device.create(newDevice);

        deviceList.push(newDevice);
      }
      return deviceList;
    } catch (e) {
      throw e;
    }
  },

  syncDevice: async(slaveId) => {
    try {
      let deviceArray =  await services.hme.SearchDevice();
      await services.deviceControl.saveDevice(deviceArray, slaveId);
    } catch (e) {
      throw e;
    }
  },

  getSlaveHost: async(id) => {
    try {
      let slave = await models.Slave.findOne({
        where:{
          id: id
        },
        attributes: { exclude: ['createdAt','updatedAt'] }
      });
      return slave
    } catch (e) {
      throw e;
    }
  },

  getDomainHost: (url) => {
    try {
      var domain;
      //find & remove protocol (http, ftp, etc.) and get domain
      if (url.indexOf("://") > -1) {
        domain = url.split('/')[2];
      }
      else {
        domain = url.split('/')[0];
      }
      domain = domain.split(':')[0];
      return domain;

    } catch (e) {
      console.log(e);
      throw e
    }
  },

  syncAllSlaveAndDevice: async() => {
    try {
      // await services.hme.pingAllSlave();
      let slaveList = await models.Slave.findAll();
      let devicesLists =[];
      for (let slave of slaveList) {
        try {
          let result = await new Promise((resolve, reject) => {
            request.get(`http://${slave.host}:3000/rest/slave/${slave.id}/searchDevice`).end((err, res) => {
              if(err) return reject(err);
              resolve(res.body);
            });
          });

        } catch (e) {
          console.log(e);
        }
      }
      for (let slave of slaveList) {
        try {
          let result = await new Promise((resolve, reject) => {
            request.get(`http://${slave.host}:3000/rest/slave/${slave.id}/getCachedDeviceList`).end((err, res) => {
              if(err) return reject(err);
              resolve(res.body);
            });
          });
          devicesLists.push(result);
          for(let device of result) {
            await models.Device.findOrCreate({
              where: {
                uid: device.devID,
                SlaveId: device.SlaveId
              },
              defaults: {
                uid: device.devID,
                SlaveId: device.SlaveId
              }
            })
          }
        } catch (e) {
          console.log(e);
        }
      }
    } catch (e) {
      console.log(e);
      throw e
    }
  },

  saveEmail: async(emailString) => {
    try {
      fs.outputFile('./email', emailString, function (err) {
        if(err) throw new Error(err);
      })
      return 'ok';
    } catch (e) {
      console.log(e);
      throw e;
    }
  },

  loadEmail: async() => {
    try {
      let result = await new Promise((resolve, reject) => {
        fs.readFile('./email', 'utf8', function (err, data) {
          if(err) return reject(err);
          resolve(data);
        });
      });
      return result
    } catch (e) {
      console.log(e);
      throw e;
    }
  },

  registerSlave: async({slaveHostName}) => {
    try {
      let slave = await models.Slave.findOrCreate({
        where:{
          host:slaveHostName,
        },
        defaults: {
          host:slaveHostName,
          description: 'null',
          apiVersion: 'null'
        }
      });
      await services.deviceControl.syncNewSlave();
      return slave
    } catch (e) {
      console.log(e);
      throw e;
    }
  },

  syncNewSlave: async() => {
    try {
      let slaves = await models.Slave.findAll();
      for (let slave of slaves) {
        try {
          let result = await new Promise((resolve, reject) => {
            request.post(`http://${slave.host}:3000/rest/slave/${slave.id}/sync/slave`)
            .send(slaves)
            .end((err, res) => {
              if(err) console.log(err);
              resolve('ok');
            });
          });
        } catch (e) {
          console.log(e);
        }
      }
    } catch (e) {
      console.log(e);
      throw e
    }
  },

  slaveSyncNewSlave: async(slaves) => {
    try {
      let updateSlave = []
      for(let slave of slaves){
        try {
          let findSlave = await models.Slave.findById(slave.id)
          if( ! findSlave ){
            findSlave = await models.Slave.create(slave)
          }
          let isUpdate = false;
          if(findSlave.host !== slave.host){
            findSlave.host = slave.host;
            isUpdate = true;
          }
          if(findSlave.description !== slave.description){
            findSlave.description = slave.description;
            isUpdate = true;
          }
          if(findSlave.apiVersion !== slave.apiVersion){
            findSlave.apiVersion = slave.apiVersion;
            isUpdate = true;
          }
          if(isUpdate){
            findSlave = await findSlave.save();
          }
          updateSlave.push(findSlave);
        } catch (e) {
          console.log(e);
        }
      }
      return updateSlave;
    } catch (e) {
      console.log(e);
      throw e
    }
  },

  saveSetting: async(saveSetting) => {
    try{
      let result = await ini.parse(fs.readFileSync(appConfig.configPath, 'utf-8'));
      result.WIFI.SSID = saveSetting.WIFI.SSID;
      result.WIFI.PASSWORD = saveSetting.WIFI.PASSWORD;
      result.SYSTEM.MODE = 'CLIENT';
      result.SYSTEM.TYPE = saveSetting.SYSTEM.TYPE;
      result.SYSTEM.REPORT_EMAIL = saveSetting.SYSTEM.REPORT_EMAIL;
      result.SYSTEM.MASTER_NAME = saveSetting.SYSTEM.MASTER_NAME;
      result.SYSTEM.TIMEZONE_OFFSET = saveSetting.SYSTEM.TIMEZONE_OFFSET;
      result.SYSTEM.TIMEZONE_INDEX = saveSetting.SYSTEM.TIMEZONE_INDEX;
      result.SYSTEM.SETTED = true;
      fs.writeFileSync(appConfig.configPath, ini.stringify(result))
      return true;

    }catch(e){
      console.log(e);
      return false;
      throw e
    }
  },

  getSetting: async() => {
    try{
      let result = await ini.parse(fs.readFileSync(appConfig.configPath, 'utf-8'));
      return result;
    }catch(e){
      console.log(e);
      throw e
    }
  },

  masterCrontab: async() => {
    try {
      let cmd = `service ntp stop && ntpdate 0.debian.pool.ntp.org && service ntp start`;
      let updateSysRtc = await new Promise((done) => {
        exec(cmd, function(error, stdout, stderr) {
          if (error ||  stderr) {
            console.log(error, stderr);
            // throw error;
          }
          console.log(stdout);
          done(stdout);
        });
      });
      let crontab = 'crontab -r; crontab -l | { cat; echo "* */12 * * * wget -O - --post-data=json localhost:3000/rest/slave/0/updateTime"; echo "* * */5 * * wget -O - localhost:3000/rest/admin/sendmail/error"; echo "*/4 * * * * curl localhost:3000/rest/master/logs";} | crontab -'
      exec(crontab, function(error, stdout, stderr) {
        if (error) {
          console.log(error);
          throw error;
        }
        console.log(stdout);
      });
    } catch (e) {
      console.log(e);
      throw e
    }
  },

  getMasterTimeAndUpdate: async() => {
    try {
      let config =  await services.deviceControl.getSetting();
      if(config.SYSTEM.TYPE === 'slave'){
        let host = config.SYSTEM.MASTER_NAME + '.local'
        let exist = await new Promise((done) => {
          ping.sys.probe(host, function (res) {
            done(res);
          });
        });
        console.log(exist, host);
        if(exist){
          let result = await new Promise((resolve, reject) => {
            request.get(`http://${host}/rest/master/timezone`)
            .end((err, res) => {
              if(err) {
                console.log(err);
              }else{
                resolve(res.body);
              }
            });
          });
          if (result) {
            let oridinConfig = await ini.parse(fs.readFileSync(appConfig.configPath, 'utf-8'));
            oridinConfig.SYSTEM.TIMEZONE_OFFSET = result.timeZone;
            oridinConfig.SYSTEM.TIMEZONE_INDEX = result.timeZoneIndex;
            fs.writeFileSync(appConfig.configPath, ini.stringify(oridinConfig))
            let cmd = `sh /etc/rc.local`;
            let updateTimeZone = await new Promise((done) => {
              exec(cmd, function(error, stdout, stderr) {
                if (error ||  stderr) {
                  console.log(error, stderr);
                  // throw error;
                }
                console.log(stdout);
                done(stdout);
              });
            });
          }
          let cmd = `service ntp stop && ntpdate ${host} && hwclock -w && hwclock -s`;
          let updateSysRtc = await new Promise((done) => {
            exec(cmd, function(error, stdout, stderr) {
              if (error ||  stderr) {
                console.log(error, stderr);
                // throw error;
              }
              console.log(stdout);
              done(stdout);
            });
          });
          await services.hme.setSysTimeToDevRTC();
        }
        let crontab = 'crontab -r; crontab -l | { cat; echo "* */12 * * * wget -O - --post-data=json localhost:3000/rest/slave/0/updateTime"; echo "*/5 * * * * curl localhost:3000/rest/slave/checkStatus";} | crontab -'
        exec(crontab, function(error, stdout, stderr) {
          if (error) {
            console.log(error);
            throw error;
          }
          console.log(stdout);
        });
      }
      return 'ok'
    } catch (e) {
      console.log(e);
      throw e;
    }
  },

  salveLogsToMaster: async() => {
    try{
      let logs = await models.Message.findAll({
        where:{
          sended: false,
        }
      });

      let sendedMessages = logs.map(message => {
        message.sended = true;
        return message;
      });
      await Promise.all(
        sendedMessages.map( message => message.save())
      );

      return logs;
    }catch(e){
      console.log(e);
      throw e
    }
  },

  getLogs: async() => {
    try{
      let logs = await models.Message.findAll({
        where:{
          type: 'error'
        },
        order: 'id DESC',
        limit: 100
      })
      return logs;
    }catch(e){
      console.log(e);
      throw e
    }
  },

  getUpdateSetting: async() => {
    try{
      let result = await ini.parse(fs.readFileSync('./updateConfig.txt', 'utf-8'));
      return result;
    }catch(e){
      console.log(e);
      throw e
    }
  },

  needUpdate: async() => {
    try {
      let config =  await services.deviceControl.getUpdateSetting();
      const url = `${config.SYSTEM.DOWNLOAD_LINK}`;
      const cmd = `wget "${url}/hme.info" -O ${config.SYSTEM.UPDATE_PACKAGE_PATH}/hme.info > /dev/null 2>&1; cat ${config.SYSTEM.UPDATE_PACKAGE_PATH}/hme.info`;
      console.log("cmd => ",cmd);
      let onlineVersion = await new Promise((done) => {
        exec(cmd, function(error, stdout, stderr) {
          if (error) {
            throw error;
          }
          console.log(stdout);
          done(stdout);
        });
      });
      console.log("npm_package_version => ",pjson.version);
      const nowVersion = pjson.version.split('.');
      console.log("nowVersion => ",nowVersion);
      console.log("onlineVersion => ",onlineVersion);
      onlineVersion = onlineVersion.split('.');
      for (let i = 0; i < nowVersion.length; i++) {
        console.log(nowVersion[i],onlineVersion[i]);
        if (parseInt(nowVersion[i], 10) < parseInt(onlineVersion[i], 10)) {
          return true;
        } else if (parseInt(nowVersion[i], 10) != parseInt(onlineVersion[i], 10)) {
          return false
        }
      }
      return false;
    } catch (e) {
      console.log(e);
      throw e;
    }
  },

  downloadUpdate: async() => {
    try {
      const config =  await services.deviceControl.getUpdateSetting();
      let systemConfig =  await services.deviceControl.getSetting();
      let url = '';
      if (systemConfig.SYSTEM.TYPE === 'master'){
        url = `${config.SYSTEM.DOWNLOAD_LINK}`;
      } else {
        url = `${systemConfig.SYSTEM.MASTER_NAME}.local:3000/rest/master/download`;
      }
      const downloadTgz = `wget "${url}/${config.SYSTEM.UPDATE_PACKAGE_NAME}" -O ${config.SYSTEM.UPDATE_PACKAGE_PATH}/${config.SYSTEM.UPDATE_PACKAGE_NAME};`;
      const downloadMd5 = `wget "${url}/hme.md5" -O ${config.SYSTEM.UPDATE_PACKAGE_PATH}/hme.md5;`;
      const downloadInfo = `wget "${url}/hme.info" -O ${config.SYSTEM.UPDATE_PACKAGE_PATH}/hme.info;`;
      const downloadCmd = downloadTgz + downloadMd5 + downloadInfo;
      // const downloadCmd = downloadMd5 + downloadInfo;
      console.log("downloadCmd => ", downloadCmd);
      event.emit('downloadCmd', downloadCmd);
      return true;
    } catch (e) {
      console.log(e);
      throw e;
    }
  },

  checkHasUpdateFile: async() => {
    try {
      let systemConfig =  await services.deviceControl.getSetting();
      const isUnTar = systemConfig.SYSTEM.UPDATE;
      console.log('isUnTar', isUnTar);
      return isUnTar;
    } catch (e) {
      console.log(e);
      throw e;
    }
  },

  slaveSyncUpdateFile: async() => {
    try {
      let systemConfig =  await services.deviceControl.getSetting();
      const isUnTar = systemConfig.SYSTEM.UPDATE;
      console.log('isUnTar', isUnTar);
      return isUnTar;
    } catch (e) {
      console.log(e);
      throw e;
    }
  },

}
