exports.hello = function *() {
  console.log('=== services ===', services);
  let result = yield services.hme.hello()

  this.body = {result}
};


exports.ping = function *() {
  let result = yield services.hme.ping();
  this.body = {result}
};


exports.searchDevice = function *() {
  // let result = yield services.hme.SearchDevice();
  let result = [
    {
      DevID: 8,
      GroupID: 1
    },{
      DevID: 5,
      GroupID: 1
    },{
      DevID: 7,
      GroupID: 2
    }
  ];
  console.log('controller',result);
  this.body = result
};

exports.findAllDeviceGroups = function *() {
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
  this.body = result
}
