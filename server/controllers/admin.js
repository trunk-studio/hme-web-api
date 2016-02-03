

exports.sendInfoReport = async function(ctx) {
  try {
    await services.mail.sendInfoReport();
    console.log('sendInfo');
    ctx.body = 'ok';
  } catch (e) {
    throw(e);
  }
};

exports.sendErrorReport = async function(ctx) {
  try {
    await services.mail.sendErrorReport();
    ctx.body = 'ok';
  } catch (e) {
    throw(e);
  }
};
