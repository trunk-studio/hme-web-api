'use strict';

module.exports = (sequelize, DataTypes) => {
  var Device = sequelize.define('Device', {
    uid: DataTypes.INTEGER,
    GroupId:{
      type: DataTypes.INTEGER,
      unique: true
    },
    SlaveId:{
      type: DataTypes.INTEGER,
      unique: true
    }
  }, {
    classMethods: {
      associate: (models) => {
      }
    }
  });

  return Device;
};
