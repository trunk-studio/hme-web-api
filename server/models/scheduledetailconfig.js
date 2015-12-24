'use strict';

module.exports = (sequelize, DataTypes) => {
  var ScheduleDetailConfig = sequelize.define('ScheduleDetailConfig', {
    WW:{
      type: DataTypes.INTEGER,
      allowNull: false
    },
    DB:{
      type: DataTypes.INTEGER,
      allowNull: false
    },
    BL:{
      type: DataTypes.INTEGER,
      allowNull: false
    },
    GR:{
      type: DataTypes.INTEGER,
      allowNull: false
    },
    RE:{
      type: DataTypes.INTEGER,
      allowNull: false
    },
    group:{
      type: DataTypes.STRING
    },
    single:{
      type: DataTypes.STRING
    }
  }, {
    classMethods: {
      associate: (models) => {
      }
    }
  });

  return ScheduleDetailConfig;
};
