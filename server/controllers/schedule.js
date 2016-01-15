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

    let schedules = [];
    let scheduleIDs = this.request.body.scheduleIDs;
    // let schedulesData = yield services.schedule.findWithScheduleDetail(scheduleIDs);

    let schedulesData = yield models.Schedule.findAll({
      where: {
        id: scheduleIDs
      },
      include: {
        model: models.ScheduleDetail,
        include: models.ScheduleDetailConfig
      }
    });

    for(let schedule of schedulesData) {
      let details = [];

      for(let scheduleDetail of schedule.ScheduleDetails) {
        let scheduleDetailConfigs = scheduleDetail.ScheduleDetailConfigs[0];
        let chartData = {
          WW: scheduleDetailConfigs.WW,
          DB: scheduleDetailConfigs.DB,
          BL: scheduleDetailConfigs.BL,
          GR: scheduleDetailConfigs.GR,
          RE: scheduleDetailConfigs.RE,
          CCT: scheduleDetailConfigs.CCT,
          Bright: scheduleDetailConfigs.Bright
        };

        details.push({
          weight: scheduleDetail.weight,
          // '12:15:00' -> '12:15'
          StartTime: scheduleDetail.StartTime.slice(0,5),
          ScheduleDetailConfig: chartData
        });
      }

      schedules.push({
        StartDate: schedule.StartDate,
        Days: schedule.Days,
        Details: details
      });
    }


    let scheduleConfigs = {
      Device: this.body.deviceID,
      Group: this.body.groupID,
      Schedules: schedules
    };

    let result = yield services.hme.writeTimeTabToDevice(scheduleConfigs);
    this.body = result;
    done();
  } catch (e) {
    done(e);
  }
}
