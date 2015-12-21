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
  let result = yield services.hme.SearchDevice();
  console.log('controller',result);
  this.body = {result}
};
