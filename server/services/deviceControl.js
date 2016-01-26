module.exports = {

  saveDevice: async(data) => {
    try {
      let deviceList = await Promise.all(data.map( async (device) => {
        let newDevice = {
          uid: device.devID,
          GroupId: device.GroupID
        }
        newDevice = await models.Device.findOrCreate({
          where:{
            uid: device.devID
          },
          defaults: newDevice
        });
        return newDevice;
      }));
      return deviceList;
    } catch (e) {
      throw e;
    }
  },

  syncDevice: async() => {
    try {
      let deviceArray =  await services.hme.SearchDevice();
      await services.deviceControl.saveDevice(deviceArray);
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

  getAllSlaveDeviceList: () => {
    try {

    } catch (e) {
      console.log(e);
      throw e
    }
  }
}
