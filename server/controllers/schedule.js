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

exports.createEasySchedule = async function(ctx){
  try {
    console.log("==== createEasySchedule ===",ctx.request.body);
    let easyData = ctx.request.body;
    let result = await services.schedule.createEasy(easyData);
    ctx.body =  "ok";
  } catch (e) {
    console.error(e)
  }
}

exports.getOneEasySchedule = async function(ctx) {
  try {
    console.log("==== getOneEasySchedule ===");
    let slaveId = ctx.params.slaveId;
    let result = await services.schedule.findEasy(slaveId);
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

// exports.setEasyScheduleToDevice = async function(ctx) {
//   try {
//     console.log("==== setEasyScheduleToDevice ===",ctx.request);
//     let slaveId = ctx.request.body.slaveId;
//     console.log("slaveId!!",slaveId);
//     let isAll = false;
//     if(slaveId == 0){
//       let slaveList = await models.Slave.findAll();
//       isAll = true;
//       for (let slave of slaveList) {
//         try {
//           await services.schedule.easyScheduleSetData(slave, isAll);
//         } catch (e) {
//           console.log(e);
//         }
//       }
//     }else{
//       let slave = await models.Slave.findById(slaveId);
//       await services.schedule.easyScheduleSetData(slave, isAll);
//     }
//     ctx.body = true;
//   } catch(e) {
//     console.error(e);
//     ctx.body = false;
//   }
// }

exports.setScheduleListToDevice = async function(ctx) {
  try {
    console.log("==== setScheduleListToDevice ===",ctx.request);
    let slaveId = ctx.request.body.slaveId;
    console.log("slaveId!!",slaveId);
    let isAll = false;
    if(slaveId == 0){
      let slaveList = await models.Slave.findAll();
      isAll = true;
      for (let slave of slaveList) {
        try {
          await services.schedule.scheduleSetData(slave, isAll);
        } catch (e) {
          console.log(e);
        }
      }
    }else{
      let slave = await models.Slave.findById(slaveId);
      await services.schedule.scheduleSetData(slave, isAll);
    }
    ctx.body = true;
  } catch(e) {
    console.error(e);
    ctx.body = false;
  }
}

exports.slaveSetScheduleListToDevice = async function(ctx) {
  try {
    console.log("==== slaveSetScheduleListToDevice ===",ctx.request.body);
    let data = ctx.request.body
    let config = data.config;
    let devList = data.devList;
    let result = await services.hme.writeTimeTabToDevices(config, {devIDs: devList});
    console.log("success:",result);
    ctx.body = true;
  } catch (e) {
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

exports.setFastRun = async function(ctx) {
  try {
    console.log("==== setFastRun ===",ctx.request.body);
    let slaveId = ctx.request.body.slaveId;
    let scheduleId = ctx.request.body.scheduleId;
    console.log("slaveId!!",slaveId);
    console.log("slaveId!!",scheduleId);
    let isAll = false;
    if(slaveId == 0){
      let slaveList = await models.Slave.findAll();
      isAll = true;
      for (let slave of slaveList) {
        try {
          await services.schedule.setFastRun(slave, isAll, scheduleId);
        } catch (e) {
          console.log(e);
        }
      }
    }else{
      let slave = await models.Slave.findById(slaveId);
      await services.schedule.setFastRun(slave, isAll, scheduleId);
    }
    ctx.body = true;
  } catch (e) {
    console.error(e);
    ctx.body = false;
  }
}

exports.slaveSetFastRun = async function(ctx) {
  try {
    console.log("==== slaveSetFastRun ===",ctx.request.body);
    let data = ctx.request.body
    let timeTab = data;
    let result = await services.hme.setFastRun(0, 0, 2000, timeTab);
    console.log("success:",result);
    ctx.body = true;
  } catch (e) {
    console.error(e);
    ctx.body = false;
  }
}

exports.setSimRtc = async function(ctx) {
  try {
    console.log("==== setSimRtc ===",ctx.request.body);
    let slaveId = ctx.request.body.slaveId;
    let count = ctx.request.body.count;
    console.log("slaveId!!",slaveId);
    let isAll = false;
    if(slaveId == 0){
      let slaveList = await models.Slave.findAll();
      isAll = true;
      for (let slave of slaveList) {
        try {
          await services.schedule.setSimRtc(slave, count);
        } catch (e) {
          console.log(e);
        }
      }
    }else{
      let slave = await models.Slave.findById(slaveId, count);
      await services.schedule.setSimRtc(slave);
    }
    ctx.body = true;
  } catch (e) {
    console.error(e);
    ctx.body = false;
  }
}

exports.slaveSetSimRtc = async function(ctx) {
  try {
    console.log("==== slaveSetSimRtc ===",ctx.request.body);
    let count = ctx.request.body.count
    let timeParams = {
      devID: 0,
      groupID: 0,
      year: 1900,
      month: 1,
      day: 1,
      hour: 0,
      min: 0,
      sec: 0
    }
    let time = moment([
      timeParams.year,
      timeParams.month - 1,
      timeParams.day,
      timeParams.hour,
      timeParams.min,
      timeParams.sec
    ]);

    time.add(30 * count,'m');
    timeParams.year = time.year();
    timeParams.month = time.month()+1;
    timeParams.day = time.date();
    timeParams.hour = time.hour();
    timeParams.min = time.minute();

    services.hme.setSimRtc(timeParams);

    ctx.body = true;
  } catch (e) {
    console.error(e);
    ctx.body = false;
  }
}
