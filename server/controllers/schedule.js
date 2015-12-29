exports.configUpdate = function *() {
  try {
<<<<<<< HEAD

    this.body = { success }
=======
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
>>>>>>> cc0d6db3d2f26fa62f17d072eb381cc8be4abdd7
  } catch(e) {
    console.error("delete user error", e);
  }

},

exports.getConfigDetail = function *() {
  try {
    console.log("==== getConfigDetail ===",this.params.id);
<<<<<<< HEAD


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

=======
    let id = this.params.id;
    let config = yield models.ScheduleDetailConfig.findById(id);

    let chartData = {
      labels: ["", "", "", "", "", "",""],
      datasets: [
        {
          label: "My Second dataset",
          fillColor: "rgba(151,187,205,0.2)",
          strokeColor: "rgba(151,187,205,1)",
          pointColor: "rgba(151,187,205,1)",
          pointStrokeColor: "#fff",
          pointHighlightFill: "#fff",
          pointHighlightStroke: "rgba(151,187,205,1)",
          data: [
            config.WW,
            config.DB,
            config.BL,
            config.GR,
            config.RE,
            config.CCT,
            config.Bright
          ]
        }
      ]
    };
    this.body =  chartData;
  } catch(e) {
    console.error("delete user error", e);
  }

}


exports.createSchedule = function *() {
  try {
    console.log("==== createSchedule ===");
    let newSchedule = this.request.body;
    let result = yield services.schedule.create(newSchedule);
    this.body =  result;
  } catch(e) {
    console.error("delete user error", e);
  }

}

exports.getOneSchedule = function *() {
  try {
    console.log("==== getOneSchedule ===");
    let id = this.params.id;
    let result = yield services.schedule.find(id);
    this.body =  result;
  } catch(e) {
    console.error("delete user error", e);
  }
}

exports.getAllSchedule = function *() {
  try {
    console.log("==== getAllSchedule ===");
    let result = yield services.schedule.findAll();
    this.body =  result;
  } catch(e) {
    console.error("delete user error", e);
  }
}

exports.updateScheduleDay = function *() {
  try {
    console.log("==== updateDay ===");
    let data = this.request.body;
    let result = yield services.schedule.updateDay(data);
    this.body =  result;
  } catch(e) {
    console.error("delete user error", e);
  }
}

exports.updateScheduleDetail = function *() {
  try {
    console.log("==== updateDay ===");
    let data = this.request.body;
    let result = yield services.schedule.updateScheduleDetail(data);
    this.body =  result;
  } catch(e) {
    console.error("delete user error", e);
  }
>>>>>>> cc0d6db3d2f26fa62f17d072eb381cc8be4abdd7
}
