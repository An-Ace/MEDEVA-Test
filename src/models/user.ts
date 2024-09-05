import { Model, Sequelize, DataTypes } from 'sequelize';

export class User extends Model {
  public id?: number;
  public name!: string;
  public email!: string;
  public password!: String;
  public orders?: String;
  public transactions?: String;
}

export default (sequelize: Sequelize) => {
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
