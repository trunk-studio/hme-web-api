

exports.sendReport = async function(ctx) {
  try {
    let reportType = ctx.params.reportType;
    if(reportType == 'info')
      await services.mail.sendInfoReport();
    else if(reportType == 'error')
      await services.mail.sendErrorReport();

    await services.hme.clearOldMessages();
    ctx.body = 'ok';

  } catch (e) {
    throw(e);
  }
};
