import request from 'superagent'
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

  createEasy: async(data) => {
    try {
      let slaveId ={};
      if(data.slaveId == 0){
        await models.easySchedule.destroy({
          where: {
            SlaveId: null
          }
        });
      }else{
        await models.easySchedule.destroy({
          where: {
            SlaveId: data.slaveId
          }
        });
        slaveId  = {
          SlaveId: data.slaveId
        }
      }
      let easySchedule = await models.easySchedule.create({
        StartDate: data.startDate,
        StartTime: data.sunrise,
        Season: data.season,
        ...slaveId
      });
    } catch (e) {
      console.log(e);
      throw e;
    }
  },

  findEasy: async(slaveId) => {
    try {
      slaveId = slaveId == 0 ? null : slaveId;
      let schedule = await models.easySchedule.findOne({
        where: {
          SlaveId: slaveId
        }
      });
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

  findAllBySlaveId: async(slaveId) => {
    try {
      let schedules = await models.Schedule.findAll({
        where: {
          SlaveId: (slaveId == 'null')? null : slaveId//isNaN(slaveId)? slaveId : null
        }
      });
      return schedules;
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
      let newScheduleList =  await Promise.all(scheduleArray.map( async (item) => {
        let schedule = await models.Schedule.findById(item.id);
        schedule.Days = item.Days || 0;
        schedule.StartDate = item.StartDate;
        schedule = await schedule.save();
        return schedule;
      }));
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

  scheduleSetData: async(slave, isAll) => {
    try {
      let devList = await services.hme.getSlaveDeviceArray(slave.id);
      let id = isAll ? null : slave.id ;
      let config = await services.schedule.getCurrectSetting({
        slaveId: id
      });
      let data = {
        config,
        devList
      }
      let result = await new Promise((resolve, reject) => {
        request
        .post(`http://${slave.host}:3000/rest/slave/${slave.id}/schedule/setOnDevice`)
        .send(data)
        .end((err, res) => {
          if(err) return reject(err);
          resolve(res.body);
        });
      });
    } catch (e) {
      console.log(e);
      throw e;
    }
  },

  setFastRun: async(slave, isAll, scheduleId) => {
    try {
      let id = isAll ? null : slave.id ;
      let config = await services.schedule.getCurrectSetting({
        slaveId: id,
        findScheduleId: {
          id: scheduleId
        }
      });
      let data = config.Schedules[0].Details;
      let result = await new Promise((resolve, reject) => {
        request
        .post(`http://${slave.host}:3000/rest/slave/${slave.id}/schedule/setFastRun`)
        .send(data)
        .end((err, res) => {
          if(err) return reject(err);
          resolve(res.body);
        });
      });
    } catch (e) {
      console.log(e);
      throw e
    }
  },

  setSimRtc: async(slave, count) => {
    try {
      let result = await new Promise((resolve, reject) => {
        request
        .post(`http://${slave.host}:3000/rest/slave/${slave.id}/schedule/setSimRtc`)
        .send({
          count
        })
        .end((err, res) => {
          if(err) return reject(err);
          resolve(res.body);
        });
      });
    } catch (e) {
      console.log(e);
      throw e
    }
  },

  getCurrectSetting: async({Device, Group, slaveId, findScheduleId}) => {
    try {
      let basicSchedules  = await models.Schedule.findAll({
        where:{
          ...findScheduleId,
          SlaveId: slaveId
        },
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
          detailFormat.ScheduleDetailConfig = {};
          detailFormat.ScheduleDetailConfig.WW = detail.ScheduleDetailConfigs[0].WW;
          detailFormat.ScheduleDetailConfig.DB = detail.ScheduleDetailConfigs[0].DB;
          detailFormat.ScheduleDetailConfig.BL = detail.ScheduleDetailConfigs[0].BL;
          detailFormat.ScheduleDetailConfig.GR = detail.ScheduleDetailConfigs[0].GR;
          detailFormat.ScheduleDetailConfig.RE = detail.ScheduleDetailConfigs[0].RE;
          detailFormat.ScheduleDetailConfig.CCT = detail.ScheduleDetailConfigs[0].CCT;
          detailFormat.ScheduleDetailConfig.Bright = detail.weight * 100;
          return detailFormat;
        })
        return format
      })
      return {Device, Group, Schedules} ;
    } catch (e) {
      throw e;
    }
  },

  exportJsonConfig: async({id, name, description}) => {
    try {
      console.log(id, name, description);

      let getScheduleConfig = await models.ScheduleDetail.findAll({
        where:{
          ScheduleId: id
        },
        include:{
          model: models.ScheduleDetailConfig,
          attributes: { exclude: ['id','createdAt','updatedAt','ScheduleDetailId'] }
        },
        attributes: { exclude: ['id','createdAt','updatedAt','ScheduleId'] }
      })
      delete getScheduleConfig.id
      let data = {
        name,
        description,
        dateCreated: 'JS_DATE_FORMAT',
        lastUpdated: 'JS_DATE_FORMAT',
        version: '1.0.0',
        parameters: getScheduleConfig
      }

      fs.outputJson(`./scheduleconfig/${name}`, data, function (err) {
        if(err) throw new Error(err);
      })
      return 'ok';
    } catch (e) {
      console.log(e);
      throw e
    }
  },

  readJson: async({name}) => {
    try {
      fs.readJson(`./scheduleconfig/${name}`, function(err, data) {
        if(err) throw new Error(err);
        return data
      })
    } catch (e) {
      console.log(e);
      throw e
    }
  }

}
