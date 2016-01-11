module.exports = {
  create: async(data) => {
    try {
      let schedule = await models.Schedule.create(data);
      let scheduleConfig = [];
      for (let a = 0; a < 24; a += 2) {
        scheduleConfig.push({
          "weight": 1,
          "StartTime": a +":00:00",
          "ScheduleId": schedule.id
        });
      }
      await models.ScheduleDetail.bulkCreate(scheduleConfig);
      let findScheduleConfig = await models.ScheduleDetail.findAll({
        where:{
          "ScheduleId": schedule.id
        }
      });
      let scheduleConfigId = [];
      findScheduleConfig.forEach(function(i){
        scheduleConfigId.push({
          "ScheduleDetailId": i.id,
        });
      });
      await models.ScheduleDetailConfig.bulkCreate(scheduleConfigId);
      return schedule;
    } catch (e) {
      throw e;
    }
  },

  find: async(id) => {
    try {
      let schedule = await models.Schedule.findOne({
        where: {
          id: id
        },
        include: models.ScheduleDetail
      });
      return schedule;
    } catch (e) {
      throw e;
    }
  },

  findAll: async() => {
    try {
      let schedule = await models.Schedule.findAll();
      return schedule;
    } catch (e) {
      throw e;
    }
  },

  updateDay: async({
    ScheduleId, Days
  }) => {
    try {
      let schedule = await models.Schedule.findById(ScheduleId);
      schedule.Days = Days;
      await schedule.save();
      return schedule;
    } catch (e) {
      throw e;
    }
  },

  updateScheduleList: async(scheduleArray) => {
    try {
      let newScheduleList =  await* scheduleArray.map( async (item) => {
        let schedule = await models.Schedule.findById(item.id);
        schedule.Days = item.Days || 0;
        schedule.StartDate = item.StartDate;
        schedule = await schedule.save();
        return schedule;
      });
      return newScheduleList;
    } catch (e) {
      throw e;
    }
  },

  updateScheduleDetail: async({
    ScheduleDetailId, weight, StartTime
  }) => {
    try {
      let scheduleDetail = await models.ScheduleDetail.findById(ScheduleDetailId);
      scheduleDetail.weight = weight;
      scheduleDetail.StartTime = StartTime;
      scheduleDetail = await scheduleDetail.save();
      return scheduleDetail;
    } catch (e) {
      throw e;
    }
  },

  getCurrectSetting: async() => {
    try {
      let basicSchedules  = await models.Schedule.findAll({
        include:[{
          model: models.ScheduleDetail,
          include:{
            model: models.ScheduleDetailConfig
          }
        }]
      });
      let Schedules = basicSchedules.map((schedule)=>{
        let format = {};
        format.StartDate = moment(schedule.StartDate).format('YYYY-MM-DD');
        format.Days = schedule.Days;
        format.Details = [];
        format.Details = schedule.ScheduleDetails.map((detail) => {
          let detailFormat = {};
          detailFormat.weight = detail.weight;
          let StartTime = detail.StartTime.split(":")
          detailFormat.StartTime = StartTime[0] +":"+ StartTime[1];
          detailFormat.Config = {};
          detailFormat.Config.WW = detail.ScheduleDetailConfigs[0].WW;
          detailFormat.Config.DB = detail.ScheduleDetailConfigs[0].DB;
          detailFormat.Config.BL = detail.ScheduleDetailConfigs[0].BL;
          detailFormat.Config.GR = detail.ScheduleDetailConfigs[0].GR;
          detailFormat.Config.RE = detail.ScheduleDetailConfigs[0].RE;
          detailFormat.Config.CCT = detail.ScheduleDetailConfigs[0].CCT;
          detailFormat.Config.Bright = detail.ScheduleDetailConfigs[0].Bright;
          return detailFormat;
        })
        return format
      })
      return {Schedules} ;
    } catch (e) {
      throw e;
    }
  }

}
