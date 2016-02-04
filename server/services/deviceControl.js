import request from 'superagent'
import ini from 'ini'
module.exports = {

  saveDevice: async(data, slaveId) => {
    try {
      let deviceList = [];
      for(let device of data){
        let newDevice = {
          uid: device.devID,
          GroupId: device.GroupID,
          SlaveId: slaveId
        }
        newDevice = await models.Device.findOrCreate({
          where:{
            uid: device.devID,
            SlaveId: slaveId
          },
          defaults: newDevice
        });
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
      await services.hme.pingAllSlave();
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
              if(err) return reject(err);
              resolve(res.body);
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
      result.SYSTEM.TYPE = saveSetting.SYSTEM.TYPE;
      result.SYSTEM.REPORT_EMAIL = saveSetting.SYSTEM.REPORT_EMAIL;
      result.SYSTEM.MASTER_NAME = saveSetting.SYSTEM.MASTER_NAME;
      result.SYSTEM.TIMEZONE_OFFSET = saveSetting.SYSTEM.TIMEZONE_OFFSET;
      fs.writeFileSync(appConfig.configPath, ini.stringify(result))
      if(saveSetting.SYSTEM.TYPE === 'slave'){
        let result = await services.deviceControl.registerSlave({
          slaveHostName: saveSetting.SYSTEM.MASTER_NAME + '.local'
        });
      }
      return 'ok';
    }catch(e){
      console.log(e);
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
  }

}
