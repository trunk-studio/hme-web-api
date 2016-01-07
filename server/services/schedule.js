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
      let schedules  = await models.Schedule.findAll({
        include:[{
          model: models.ScheduleDetail,
          include:{
            model: models.ScheduleDetailConfig
          }
        }]
      });
      let
      console.log("getCurrectSetting",JSON.stringify(schedules,null,2));
      return schedules ;
    } catch (e) {
      throw e;
    }
  }

}
