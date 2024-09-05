const Model = require('sequelize').Model;

class User extends Model {

}

module.exports = (sequelize, DataTypes) => {
  User.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(255)
    },
    email: {
      type: DataTypes.STRING(255),
    },
    password: {
      type: DataTypes.STRING(255),
    }
  }, {
    sequelize,
    tableName: 'users',
    timestamps: true
  });
  // User.sync();
  return User;
}
