'use strict';

module.exports = (sequelize, DataTypes) => {
  var Slave = sequelize.define('Slave', {
    host: DataTypes.STRING,
    description: {
      type: DataTypes.STRING,
      defaultValue: ''
    },
    apiVersion: {
      type: DataTypes.STRING,
      defaultValue: ''
    }
  }, {
    classMethods: {
      associate: (models) => {
        Slave.hasMany(models.Device);
      }
    }
  });

  return Slave;
};
