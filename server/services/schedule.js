module.exports = {
  create: async (data) => {
    try {
      let schedule = await models.Schedule.create(data);
      let scheduleConfig = [];
      for(let a = 0; a<24; a+=2){
        scheduleConfig.push({
          "weight": 1,
          "StartTime": "00:"+ a +":00",
          "ScheduleId": schedule.id
        });
      }
      await models.ScheduleDetail.bulkCreate(scheduleConfig);
      return schedule;
    } catch (e) {
      throw e;
    }
  },

  find: async (id) => {
    try {
      let schedule = await models.Schedule.findOne({
        where:{
          id: id
        },
        include: models.ScheduleDetail
      });
      return schedule;
    } catch (e) {
      throw e;
    }
  },

  findAll: async () => {
    try {
      let schedule = await models.Schedule.findAll();
      return schedule;
    } catch (e) {
      throw e;
    }
  },

  updateDay: async({ScheduleId, Days}) => {
    try {
      let schedule = await models.Schedule.findById(ScheduleId);
      schedule.Days = Days;
      await schedule.save();
      return schedule;
    } catch (e) {
      throw e;
    }
  },

  updateScheduleDetail: async({ScheduleDetailId, weight, StartTime}) => {
    try {
      let scheduleDetail = await models.ScheduleDetail.findById(ScheduleDetailId);
      scheduleDetail.weight = weight;
      scheduleDetail.StartTime = StartTime;
      scheduleDetail = await scheduleDetail.save();
      return scheduleDetail;
    } catch (e) {
      throw e;
    }
  }

}
