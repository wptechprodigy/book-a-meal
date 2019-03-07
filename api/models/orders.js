import Sequelize from 'sequelize';
import sequelize from '../utils/database';

const Order = sequelize.define('order', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  order: {
    type: Sequelize.JSON,
    allowNull: false,
  },
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  catererId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  userId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  createdAt: Sequelize.DATEONLY,
  updatedAt: Sequelize.DATEONLY,
});

export default Order;
