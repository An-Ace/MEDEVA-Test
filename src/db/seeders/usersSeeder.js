const UserModel = require('../../models/xuser');
const { DataTypes, Sequelize } = require('sequelize');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');

dotenv.config();
const db_host = String(process.env.DB_HOST);
const db_port = Number(process.env.DB_PORT);
const db_name = String(process.env.DB_NAME);
const db_user = String(process.env.DB_USER);
const db_password = String(process.env.DB_PASSWORD);


const database = new Sequelize({
  dialect: "postgres",
  host: db_host,
  port: db_port,
  database: db_name,
  username: db_user,
  password: db_password,
  logging: false

});

const User = UserModel(database, DataTypes);

module.exports = {
  async up() {
    // Add your user data here
    const userData = [
      { name: 'Test 1', email: 'test1@demo.com', password: bcrypt.hashSync('1234', 10) },
      { name: 'Test 2', email: 'test2@demo.com', password: bcrypt.hashSync('1234', 10) },
      // Add more user data as needed
    ];

    // Loop through the user data and create new User records
    await User.bulkCreate(userData);
  },
  async down() {
    // Delete all User records
    await User.destroy({ where: {} });
  },
};

