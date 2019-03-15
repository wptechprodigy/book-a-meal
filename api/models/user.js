import Sequelize from 'sequelize';
import sequelize from '../utils/database';
import Order from '../models/orders';

const User = sequelize.define('user', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  createdAt: Sequelize.DATEONLY,
  updatedAt: Sequelize.DATEONLY,
});

User.hasMany(Order, { constraints: true, onDelete: 'CASCADE' });

export default User;
