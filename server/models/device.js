module.exports = (sequelize, DataTypes) => {
  var Device = sequelize.define('Device', {
    uid: {
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
