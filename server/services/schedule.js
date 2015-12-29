module.exports = {
  create: async (data) => {
    try {
      let schedule = await models.Schedule.create(data);
      let sdfgcheduleConfig = [];
      for(let a = 0; a<24; a+=2){
        sdfgcheduleConfig.push({
          "weight": 1,
          "StartTime": "00:"+ a +":00",
          "EndTime": "00:"+ (a+1) +":59",
          "ScheduleId": schedule.id
        });
      }
      await models.ScheduleDetail.bulkCreate(sdfgcheduleConfig);
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
  }
}
