'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('orders', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING(255)
      },
      amount: {
        type: Sequelize.INTEGER,
      },
      reff: {
        type: Sequelize.STRING(255),
      },
      expired: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("NOW() + INTERVAL '1 day'") // 1 hari
      },
      paid: {
        type: Sequelize.DATE,
        allowNull: true
      },
      code: {
        type: Sequelize.STRING,
      },
      userId: {
        type: Sequelize.INTEGER,
      },
      status: {
        type: Sequelize.ENUM('unpaid', 'paid'),
        defaultValue: 'unpaid'
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    }, { timestamps: true, tableName: 'orders' });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('orders');
  }
};