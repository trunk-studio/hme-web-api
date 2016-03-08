module.exports = (sequelize, DataTypes) => {
  var Schedule = sequelize.define('Schedule', {
    StartDate: DataTypes.DATE,
    Days: DataTypes.INTEGER,
    Summit: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    }
  }, {
    classMethods: {
      associate: (models) => {
        Schedule.hasMany(models.ScheduleDetail);
        Schedule.belongsTo(models.Device);
        Schedule.belongsTo(models.Group);
        Schedule.belongsTo(models.Slave);
      }
    }
  });

  return Schedule;
};
