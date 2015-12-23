'use strict';

module.exports = (sequelize, DataTypes) => {
  var Group = sequelize.define('Group', {
  }, {
    classMethods: {
      associate: (models) => {
        Group.hasMany(models.Device);
      }
    }
  });

  return Group;
};
