'use strict';

module.exports = (sequelize, DataTypes) => {
  var ScheduleDetail = sequelize.define('ScheduleDetail', {
<<<<<<< HEAD
    weight: DataTypes.FLOAT
=======
    weight: DataTypes.FLOAT,
    StartTime: DataTypes.TIME
>>>>>>> cc0d6db3d2f26fa62f17d072eb381cc8be4abdd7
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
