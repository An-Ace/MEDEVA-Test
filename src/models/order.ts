import { Model, Sequelize, DataTypes } from 'sequelize';

export class Order extends Model {
  public id?: number;
  public name!: string;
  public amount!: number;
  public reff!: string;
  public expired?: Date;
  public paid?: Date;
  public code!: string;
  public status!: 'unpaid' | 'paid';
}

export default (sequelize: Sequelize) => {
  Order.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(255)
    },
    amount: {
      type: DataTypes.INTEGER,
    },
    reff: {
      type: DataTypes.STRING(255),
    },
    expired: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.literal("NOW() + INTERVAL '1 day'") // 1 hari
    },
    paid: {
      type: DataTypes.DATE,
      allowNull: true
    },
    code: {
      type: DataTypes.STRING,
    },
    userId: {
      type: DataTypes.INTEGER,
    },
    status: {
      type: DataTypes.ENUM('unpaid', 'paid'),
      defaultValue: 'unpaid'
    }
  }, {
    sequelize,
    tableName: 'orders',
    timestamps: true
  });
  // Order.sync();
  return Order
}

