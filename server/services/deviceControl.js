module.exports = {

  saveDevice: async(data) => {
    try {
      let deviceList = await Promise.all(data.map( async (device) => {
        let newDevice = {
          uid: device.DevID,
          GroupId: device.GroupID
        }
        newDevice = await models.Device.findOrCreate({
          where:{
            uid: device.DevID
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
  }
}
