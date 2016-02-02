import request from 'superagent'
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
                uid: device.devID
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
  }
}
