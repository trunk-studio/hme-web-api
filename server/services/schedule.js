import request from 'superagent'
module.exports = {
  create: async(data) => {
    try {
      if(! data.SlaveId){
        await models.Schedule.destroy({
          where: {
            SlaveId: {
              $ne: null
            }
          }
        });
        await models.ScheduleDetail.destroy({where: {ScheduleId: null}});
        await models.ScheduleDetailConfig.destroy({where: {ScheduleDetailId: null}});
      }
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

  delete: async(scheduleId) => {
    try {
      await models.Schedule.destroy({where:{id: scheduleId}});
      await models.ScheduleDetail.destroy({where: {ScheduleId: null}});
      await models.ScheduleDetailConfig.destroy({where: {ScheduleDetailId: null}});
    } catch (e) {
      throw e;
    }
  },

  createEasy: async(data) => {
    try {
      let slaveId ={};
      if(data.slaveId == 0){
        // await models.easySchedule.destroy({where: {SlaveId: null}});
        // await models.Schedule.destroy({where: {SlaveId: null}});
        await models.easySchedule.destroy({
          where: {
            id: {
              $gte: 1
            }
          }
        });
        await models.Schedule.destroy({
          where: {
            id: {
              $gte: 1
            }
          }
        });
        await models.ScheduleDetail.destroy({where: {ScheduleId: null}});
        await models.ScheduleDetailConfig.destroy({where: {ScheduleDetailId: null}});
      }else{
        await models.easySchedule.destroy({where: {SlaveId: data.slaveId}});
        await models.Schedule.destroy({where: {SlaveId: data.slaveId}});
        await models.ScheduleDetail.destroy({where: {ScheduleId: null}});
        await models.ScheduleDetailConfig.destroy({where: {ScheduleDetailId: null}});
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
      await services.schedule.createEasyScheduleToScheduleModel(easySchedule.id)
    } catch (e) {
      console.log(e);
      throw e;
    }
  },

  createEasyScheduleToScheduleModel: async(easyScheduleId) => {
    try {
      let easySchedule = await models.easySchedule.findById(easyScheduleId);
      let slave = {
        SlaveId: easySchedule.SlaveId
      }
      let createData = {
        StartDate: easySchedule.StartDate,
        ...slave
      }
      let i = 0;
      for(let season of easySchedule.Season){
        try {
          if(i == 0){
            createData.StartDate = easySchedule.StartDate;
          }else if (i == 1) {
            createData.StartDate = moment(easySchedule.StartDate).add(easySchedule.Season[i-1].days, 'd').format("YYYY-MM-DD");
          }else{
            createData.StartDate = moment(easySchedule.StartDate).add(easySchedule.Season[i-1].days, 'd').add(easySchedule.Season[i-2].days, 'd').format("YYYY-MM-DD");
          }
          createData.Days = season.days
          let schedule = await models.Schedule.create(createData);
          let scheduleConfig = [];
          for (let a = 1; a <= 12; a++) {
            if( a == 1){
              let time = moment({
                hour: easySchedule.StartTime.split(":")[0],
                minute: easySchedule.StartTime.split(":")[1]
              });
              scheduleConfig.push({
                "weight": 0,
                "StartTime":time.format("HH:mm:ss"),
                "ScheduleId": schedule.id
              });
            }else if ( a == 2 ) {
              let time = moment({
                hour: easySchedule.StartTime.split(":")[0],
                minute: easySchedule.StartTime.split(":")[1]
              }).add(5, 'm');
              scheduleConfig.push({
                "weight": 1,
                "StartTime":time.format("HH:mm:ss"),
                "ScheduleId": schedule.id
              });
            }else if ( a == 12 ) {
              let time = moment({
                hour: easySchedule.StartTime.split(":")[0],
                minute: easySchedule.StartTime.split(":")[1]
              }).add(((season.hour*60)/12)*11 + 5, 'm');
              scheduleConfig.push({
                "weight": 0,
                "StartTime":time.format("HH:mm:ss"),
                "ScheduleId": schedule.id
              });
            }else{
              let time = moment({
                hour: easySchedule.StartTime.split(":")[0],
                minute: easySchedule.StartTime.split(":")[1]
              }).add(((season.hour*60)/12)*a, 'm');
              scheduleConfig.push({
                "weight": 1,
                "StartTime":time.format("HH:mm:ss"),
                "ScheduleId": schedule.id
              });
            }
          }
          let timeSorted = scheduleConfig.sort(function(a,b){
            return moment({
                hour: a.StartTime.split(":")[0],
                minute: a.StartTime.split(":")[1]
              }).valueOf() - moment({
                hour: b.StartTime.split(":")[0],
                minute: b.StartTime.split(":")[1]
              }).valueOf()
          })
          console.log("sort: ", timeSorted);
          await models.ScheduleDetail.bulkCreate(timeSorted);
          let findScheduleConfig = await models.ScheduleDetail.findAll({
            where:{
              "ScheduleId": schedule.id
            }
          });
          let scheduleConfigId = [];
          if(i == 0){
            findScheduleConfig.forEach(function(data,i){
              scheduleConfigId.push({
                WW: 66,
                DB: 100,
                BL: 97,
                GR: 78,
                RE: 13,
                "ScheduleDetailId": data.id,
              });
            });
          }else if (i == 1) {
            findScheduleConfig.forEach(function(data,i){
              scheduleConfigId.push({
                WW: 100,
                DB: 100,
                BL: 100,
                GR: 100,
                RE: 100,
                "ScheduleDetailId": data.id,
              });
            });
          }else{
            findScheduleConfig.forEach(function(data,i){
              scheduleConfigId.push({
                WW: 100,
                DB: 11,
                BL: 29,
                GR: 34,
                RE: 95,
                "ScheduleDetailId": data.id,
              });
            });
          }
          await models.ScheduleDetailConfig.bulkCreate(scheduleConfigId);
          i++;
        } catch (e) {
          console.log(e);
        }
      }
      console.log(easySchedule);
    } catch (e) {
      console.log(e);
      throw e
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
      if( ! schedule){
        schedule = await models.easySchedule.findOne({
        where: {
          SlaveId: null
        }
      });
      }
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
      if(schedules.length == 0){
        schedules = await models.Schedule.findAll({
          where: {
            SlaveId: null
          }
        });
      }
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
  deleteSimpleScheduleBySlaveId: async(slaveId) => {
    try {
      let simpleSchedule = await models.easySchedule.find({where:{SlaveId: slaveId}});
      if(simpleSchedule)
        simpleSchedule.destroy();
      return ;
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
