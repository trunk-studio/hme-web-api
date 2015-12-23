'use strict';

module.exports = (sequelize, DataTypes) => {
  var Device = sequelize.define('Device', {
  }, {
    classMethods: {
      associate: (models) => {
      }
    }
  });

  return Device;
};
