import Sequelize from 'sequelize';
import sequelize from '../utils/database';

const Menu = sequelize.define('menu', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  mealOptions: {
    type: Sequelize.JSON,
    allowNull: false,
  },
  catererId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  createdAt: Sequelize.DATEONLY,
  updatedAt: Sequelize.DATEONLY,
});

export default Menu;
