'use strict';

module.exports = (sequelize, DataTypes) => {
  var Slave = sequelize.define('Slave', {
    host: DataTypes.STRING,
    description: DataTypes.STRING,
    apiVersion: DataTypes.STRING
  }, {
    classMethods: {
      associate: (models) => {
        Slave.hasMany(models.Device);
      }
    }
  });

  return Slave;
};
