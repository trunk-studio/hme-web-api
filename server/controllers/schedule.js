exports.configUpdate = function *() {
  try {
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
    let id = this.params.id;
    let config = yield models.ScheduleDetailConfig.findById(id);

    let chartData = [
      config.WW,
      config.DB,
      config.BL,
      config.GR,
      config.RE,
      config.CCT,
      config.Bright
    ];
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

exports.updateScheduleList = function *() {
  try {
    console.log("==== updateScheduleList ===");
    let data = this.request.body;
    let result = yield services.schedule.updateScheduleList(data);
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
}

exports.updateScheduleDetails = function *() {
  try {
    console.log("==== updateDay ===");
    let scheduleDetails = this.request.body;
    let newScheduleDetails = [];
    for(let detail of scheduleDetails) {
      let result = yield services.schedule.updateScheduleDetail({
        ScheduleDetailId: detail.id,
        weight: detail.weight,
        StartTime: detail.StartTime
      });
      newScheduleDetails.push(result);
    }
    this.body = newScheduleDetails;
  } catch(e) {
    console.error("delete user error", e);
  }
}

exports.setSchedulesToDevice = function *() {
  try {
    let scheduleConfigs = [];
    for(let scheduleID of this.request.body) {
      let scheduleData = yield services.schedule.find(scheduleID);
      let config = {
        StartDate: moment(scheduleData.StartDate).format('YYYY-MM-DD'),
        Days: scheduleData.Days,
        Details: []
      };
      for(let scheduleDetail of scheduleData.ScheduleDetails) {
        let detailConfig = yield models.ScheduleDetailConfig.findById(scheduleDetail.id);
        let chartData = {
          WW: detailConfig.WW,
          DB: detailConfig.DB,
          BL: detailConfig.BL,
          GR: detailConfig.GR,
          RE: detailConfig.RE,
          CCT: detailConfig.CCT,
          Bright: detailConfig.Bright
        };

        config.Details.push({
          weight: scheduleDetail.weight,
          // '12:15:00' -> '12:15'
          StartTime: scheduleDetail.StartTime.slice(0,5),
          ScheduleDetailConfig: chartData
        });
      }
      scheduleConfigs.push(config);
    }
    console.log(JSON.stringify(scheduleConfigs,null,4));
    let result = yield services.hme.writeTimeTabToDevice(scheduleConfigs);
    this.body = result;
    done();
  } catch (e) {
    done(e);
  }
}
