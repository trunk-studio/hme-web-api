exports.hello = async function (ctx) {
  console.log('=== services ===', services);
  let result = await services.hme.hello()

  ctx.body = {result}
};

exports.ping = async function (ctx) {
  let result = await services.hme.ping();
  ctx.body = {result}
};


exports.searchDevice = async function (ctx) {
  // let result = await services.hme.SearchDevice();
  await services.deviceControl.syncDevice();
  ctx.body = "ok"
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

exports.testAllDevices = async function (ctx) {
  let result = await services.hme.testAll();
  ctx.body = result
}

exports.testDeviceByID = async function (ctx) {
  let devID = ctx.params.id;
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
