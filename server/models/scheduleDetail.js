'use strict';

module.exports = (sequelize, DataTypes) => {
  var ScheduleDetail = sequelize.define('ScheduleDetail', {
    weight: DataTypes.FLOAT,
    StartTime: DataTypes.TIME
  }, {
    classMethods: {
      associate: (models) => {
        ScheduleDetail.belongsTo(models.Schedule);
        ScheduleDetail.hasMany(models.ScheduleDetailConfig)
      }
    }
  });

  return ScheduleDetail;
};
