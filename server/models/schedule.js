'use strict';

module.exports = (sequelize, DataTypes) => {
  var Schedule = sequelize.define('Schedule', {
    StartDate: DataTypes.DATE,
    Days: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: (models) => {
        Schedule.hasMany(models.ScheduleDetail);
        Schedule.belongsTo(models.Device);
        Schedule.belongsTo(models.Group);
      }
    }
  });

  return Schedule;
};
