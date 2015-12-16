

exports.index = function *() {

  let users = yield models.User.findAll()

  this.body = {users}
};

exports.get = function *() {

  let userId = this.params.id;

  let user = yield models.User.findById(userId);

  this.body = {user}
};


exports.create = function *() {

  let newUser = this.request.body;

  let result = null;

  try {
    result = yield models.User.create(newUser);
  } catch (e) {
    console.error("create user error", e);
  }

  let user = result;

  this.body = {user}
};


exports.delete = function *() {

  let userId = this.params.id;

  let result = null;

  try {
    let user = yield models.User.findById(userId);

    result = user.destroy()
  } catch (e) {
    console.error("delete user error", e);
  }

  this.body = {result}
};

exports.login = function *() {
  let success = false;
  try {
    let userData = {
      admin: 'admin',
      engineer: 'engineer',
      user: 'user'
    };
    let pass = false;
    let role = this.request.body.role;
    let password = this.request.body.password;

    if(userData[role] == password)
      success = true;

    this.body = { success }
  } catch(e) {
    console.error("delete user error", e);
  }

}
