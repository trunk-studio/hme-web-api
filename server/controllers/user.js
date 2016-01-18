

exports.index = async function(ctx) {

  let users = await models.User.findAll()

  ctx.body = {users}
};

exports.get = async function(ctx) {

  let userId = ctx.params.id;

  let user = await models.User.findById(userId);

  ctx.body = {user}
};


exports.create = async function(ctx) {

  let newUser = ctx.request.body;

  let result = null;

  try {
    result = await models.User.create(newUser);
  } catch (e) {
    console.error("create user error", e);
  }

  let user = result;

  ctx.body = {user}
};


exports.delete = async function(ctx) {

  let userId = ctx.params.id;

  let result = null;

  try {
    let user = await models.User.findById(userId);

    result = user.destroy()
  } catch (e) {
    console.error("delete user error", e);
  }

  ctx.body = {result}
};

exports.login = async function (ctx, next) {
  let success = false;
  try {
    let userData = {
      admin: 'admin',
      engineer: 'engineer',
      user: 'user'
    };
    let pass = false;
    let role = ctx.request.body.role;
    let password = ctx.request.body.password;

    if(userData[role] == password)
      success = true;

    ctx.body = { success }
  } catch(e) {
    console.error("delete user error", e);
  }

}
