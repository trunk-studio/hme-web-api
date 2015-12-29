exports.configUpdate = function *() {
  try {


    this.body = { success }

    console.log("==== getConfigDetail ===",this.request.body);
    let data = this.request.body;
    let config = yield models.ScheduleDetailConfig.findById(data.id);
    config.WW= data.WW;
    config.DB= data.DB;
    config.BL= data.BL;
    config.GR= data.GR;
    config.RE= data.RE;
    config.CCT= data.CCT;
    config.Bright = data.Bright;
    config = yield config.save();
    this.body = config ;

  } catch(e) {
    console.error("delete user error", e);
  }

},

exports.getConfigDetail = function *() {
  try {
    console.log("==== getConfigDetail ===",this.params.id);
    // let chartData = {
    //   labels: ["", "", "", "", "", "",],
    //   datasets: [
    //     {
    //       label: "My Second dataset",
    //       fillColor: "rgba(151,187,205,0.2)",
    //       strokeColor: "rgba(151,187,205,1)",
    //       pointColor: "rgba(151,187,205,1)",
    //       pointStrokeColor: "#fff",
    //       pointHighlightFill: "#fff",
    //       pointHighlightStroke: "rgba(151,187,205,1)",
    //       data: [28, 48, 40, 19, 86, 27, 90]
    //     }
    //   ]
    // };
    this.body = { success }
  } catch(e) {
    console.error("delete user error", e);
  }


}
