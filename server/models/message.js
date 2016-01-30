module.exports = (sequelize, DataTypes) => {
  var Message = sequelize.define('Message', {
    type: DataTypes.ENUM('info', 'error'),
    to: DataTypes.STRING,
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    sended: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  });

  return Message;
};
