exports.hello = function *() {
  console.log('=== services ===', services);
  let result = yield services.hme.hello()

  this.body = {result}
};


exports.ping = function *() {
  let result = yield services.hme.ping()
  this.body = {result}
};
