module.exports = {
  create: async (data) => {
    try {
      let schedule = await models.Schedule.create(data);
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
