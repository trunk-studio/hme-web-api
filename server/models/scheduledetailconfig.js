'use strict';

module.exports = (sequelize, DataTypes) => {
  var ScheduleDetailConfig = sequelize.define('ScheduleDetailConfig', {
    WW:{
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false
    },
    DB:{
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false
    },
    BL:{
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false
    },
    GR:{
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false
    },
    RE:{
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false
    },
    CCT:{
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false
    },
    Bright:{
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false
    }
  }, {
    classMethods: {
      associate: (models) => {
      }
    }
  });

  return ScheduleDetailConfig;
};
