'use strict';

module.exports = (sequelize, DataTypes) => {
  var Schedule = sequelize.define('Schedule', {
    StartDate: DataTypes.DATE,
    Days: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: (models) => {
        Schedule.hasMany(models.ScheduleDetail);
      }
    }
  });

  return Schedule;
};
