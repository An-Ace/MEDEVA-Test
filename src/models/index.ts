import { Sequelize } from "sequelize";
import { config } from "../configs/config";
import User from "./user";
import Order from "./order";
import Transaction from "./Transaction";

const sequelize = new Sequelize(config.dbName, config.dbUser, config.dbPass, { dialect: "postgres", timezone: "+07:00" });

const db = {
  User: User(sequelize),
  Order: Order(sequelize),
  Transaction: Transaction(sequelize),
  sequelize,
};
db.User.hasMany(db.Order, { foreignKey: "userId", as: "orders" });
db.Order.belongsTo(db.User, { foreignKey: "userId", as: "user" });
db.User.hasMany(db.Transaction, { foreignKey: "userId", as: "transactions" });
db.Transaction.belongsTo(db.User, { foreignKey: "userId", as: "user" });

db.Order.hasOne(db.Transaction, { foreignKey: "userId", as: "transaction" });
db.Transaction.belongsTo(db.Order, { foreignKey: "userId", as: "order" });

// db.User.findAll({
//   include: {
//     association: db.User.associations.orders,
//   }
// }).then(result => {
//   console.log(result);
// })

export default db;