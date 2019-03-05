import Sequelize from 'sequelize';
import sequelize from '../util/database';

const Menu = sequelize.define('menu', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false
  },
  avaialableOn: {
      type: Sequelize.DATEONLY,
      allowNull: false,
      primary: true
  },
  mealOptions: {
    type: Sequelize.ARRAY,
    allowNull: false
  },
  createdAt: Sequelize.DATEONLY,
  updatedAt: Sequelize.DATEONLY
});

export default Menu;
