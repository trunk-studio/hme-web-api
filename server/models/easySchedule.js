'use strict';

module.exports = (sequelize, DataTypes) => {
  var easySchedule = sequelize.define('easySchedule', {
    StartDate: DataTypes.DATE,
    Days: DataTypes.INTEGER,
    StartTime: DataTypes.TIME,
    Season:{
      type: DataTypes.TEXT,
      get: function() {
        var value = this.getDataValue('Season');
        if(value) {
          return JSON.parse(value);
        }
        return [];
      },
      set: function(value) {
        return this.setDataValue('Season', JSON.stringify(value));
      }
    }
  }, {
    classMethods: {
      associate: (models) => {
        easySchedule.belongsTo(models.Slave);
      }
    }
  });

  return easySchedule;
};
