import request from 'superagent'

exports.hello = async function (ctx) {
  let result = await services.hme.hello()

  ctx.body = {result}
};

exports.ping = async function (ctx) {
  let result = await services.hme.ping();
  ctx.body = {result}
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
}

exports.setLedDisplay = async function (ctx) {
  let data = ctx.request.body;
  console.log('setLedDisplay',data);
  let result = await services.hme.setLedDisplay(data);
  ctx.body = result
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
    };
    let devices;
    if(schedule.SlaveId === null){
      let slaveList = await models.Slave.findAll();
      for (let slave of slaveList) {
        devices = await models.Device.findAll({
          where:{
            SlaveId: slave.id
          }
        });
        for(let device of devices){
          try {
            ledData.devID = device.id;
            let result = await new Promise((resolve, reject) => {
              request
              .post(`http://${slave.host}:3000/rest/slave/${slave.id}/device/${device.id}/setLedDisplay`)
              .send(ledData)
              .end((err, res) => {
                if(err) return reject(err);
                resolve(res.body);
              });
            });
          } catch (e) {
            console.log(e);
          }
        }
      }
    }else{
      let slave = await models.Slave.findById(schedule.SlaveId);
      devices = await models.Device.findAll({
        where:{
          SlaveId: schedule.SlaveId
        }
      })
      ledData.groupID = slave.id;
      for(let device of devices){
        try {
          ledData.devID = device.id;
          let result = await new Promise((resolve, reject) => {
            request
            .post(`http://${slave.host}:3000/rest/slave/${schedule.SlaveId}/device/${device.id}/setLedDisplay`)
            .send(ledData)
            .end((err, res) => {
              if(err) return reject(err);
              resolve(res.body);
            });
          });
        } catch (e) {
          console.log(e);
        }
      }
    }
    ctx.body = 'ok'
  } catch (e) {
    console.log(e);
  }
};

exports.testAllDevices = async function (ctx) {
  let result = await services.hme.testAll();
  ctx.body = result
}

exports.testDeviceByID = async function (ctx) {
  let devID = ctx.params.deviceId;
  let result = await services.hme.testDevID(devID);
  ctx.body = result
}

exports.testGruopByID = async function (ctx) {
  let groupID = ctx.params.slaveId;
  let result = await services.hme.testGroup(groupID);
  ctx.body = result
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
    let [slaveList, deviceList] = await Promise.all([services.hme.getCachedSlaveList(), services.hme.getCachedDeviceList()]);
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
