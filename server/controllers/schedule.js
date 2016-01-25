exports.configUpdate = async function(ctx) {
  try {
    console.log("==== getConfigDetail ===",ctx.request.body);
    let data = ctx.request.body;
    let config = await models.ScheduleDetailConfig.findById(data.id);
    config.WW= data.WW;
    config.DB= data.DB;
    config.BL= data.BL;
    config.GR= data.GR;
    config.RE= data.RE;
    config.CCT= data.CCT;
    config.Bright = data.Bright;
    config = await config.save();
    ctx.body = config ;
  } catch(e) {
    console.error(e);
  }

},

exports.getConfigDetail = async function(ctx) {
  try {
    console.log("==== getConfigDetail ===",ctx.params.id);
    let id = ctx.params.id;
    let config = await models.ScheduleDetailConfig.findById(id);

    let chartData = [
      config.WW,
      config.DB,
      config.BL,
      config.GR,
      config.RE,
      config.CCT,
      config.Bright
    ];
    ctx.body =  chartData;
  } catch(e) {
    console.error(e);
  }

}


exports.createSchedule = async function(ctx) {
  try {
    console.log("==== createSchedule ===");
    let newSchedule = ctx.request.body;
    let result = await services.schedule.create(newSchedule);
    ctx.body =  result;
  } catch(e) {
    console.error(e);
  }

}

exports.getOneSchedule = async function(ctx) {
  try {
    console.log("==== getOneSchedule ===");
    let id = ctx.params.id;
    let result = await services.schedule.find(id);
    ctx.body =  result;
  } catch(e) {
    console.error(e);
  }
}

exports.getAllSchedule = async function(ctx) {
  try {
    console.log("==== getAllSchedule ===");
    let result = await services.schedule.findAll();
    ctx.body =  result;
  } catch(e) {
    console.error(e);
  }
}

exports.getAllScheduleBySlaveId = async function(ctx) {
  try {
    console.log("==== getAllScheduleBySlaveId ===");
    let slaveId = ctx.params.slaveId;
    console.log('aaaa',slaveId);
    let result = await services.schedule.findAllBySlaveId(slaveId);
    ctx.body =  result;
  } catch(e) {
    console.error(e);
  }
}

exports.updateScheduleDay = async function(ctx) {
  try {
    console.log("==== updateDay ===");
    let data = ctx.request.body;
    let result = await services.schedule.updateDay(data);
    ctx.body =  result;
  } catch(e) {
    console.error(e);
  }
}

exports.updateScheduleList = async function(ctx) {
  try {
    console.log("==== updateScheduleList ===");
    let data = ctx.request.body;
    let result = await services.schedule.updateScheduleList(data);
    ctx.body =  result;
  } catch(e) {
    console.error(e);
  }
}

exports.updateScheduleDetail = async function(ctx) {
  try {
    console.log("==== updateDay ===");
    let data = ctx.request.body;
    let result = await services.schedule.updateScheduleDetail(data);
    ctx.body =  result;
  } catch(e) {
    console.error(e);
  }
}

exports.updateScheduleDetails = async function(ctx) {
  try {
    console.log("==== updateDay ===");
    let scheduleDetails = ctx.request.body;
    let newScheduleDetails = [];
    for(let detail of scheduleDetails) {
      let result = await services.schedule.updateScheduleDetail({
        ScheduleDetailId: detail.id,
        weight: detail.weight,
        StartTime: detail.StartTime
      });
      newScheduleDetails.push(result);
    }
    ctx.body = newScheduleDetails;
  } catch(e) {
    console.error(e);
  }
}

exports.setScheduleListToDevice = async function(ctx) {
  try {
    console.log("==== setScheduleListToDevice ===",ctx.request);
    let slaveId = ctx.request.body.slaveId;
    let hostSlaveId = ctx.params.slaveId;
    console.log("slaveId!!",slaveId);
    console.log("hostSlaveId!!",hostSlaveId);
    slaveId == 0 ? null: slaveId;
    if(hostSlaveId == 0){
      let host = await services.deviceControl.getDomainHost(ctx.request.header.host);
      console.log("host!!",host);
      let slave = await models.Slave.findOne({
        where:{
          host: { $like: '%'+host+'%' }
        }
      });
      console.log("slave!!",slave);
      hostSlaveId = slave.id;
      console.log("hostSlaveId!!",hostSlaveId);
    }
    let config = await services.schedule.getCurrectSetting({
      slaveId: slaveId
    });
    console.log("config!!",config);
    let devList = await services.hme.getSlaveDeviceArray(hostSlaveId);
    console.log("devList!!",devList);
    let result = await services.hme.writeTimeTabToDevices(config, {devIDs: devList});
    ctx.body = true;
  } catch(e) {
    console.error(e);
    ctx.body = false;
  }
}

exports.setSchedulesToDevice = async function(ctx) {
  try {

    let schedules = [];
    let scheduleIDs = ctx.request.body.scheduleIDs;
    // let schedulesData = await services.schedule.findWithScheduleDetail(scheduleIDs);

    let schedulesData = await models.Schedule.findAll({
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
      Device: ctx.body.deviceID,
      Group: ctx.body.groupID,
      Schedules: schedules
    };

    let result = await services.hme.writeTimeTabToDevice(scheduleConfigs);
    ctx.body = result;
  } catch (e) {
    console.error(e);
  }
}
