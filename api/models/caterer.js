import Sequelize from 'sequelize';
import sequelize from '../utils/database';

const Caterer = sequelize.define('caterer', {
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
  phone: {
    type: Sequelize.INTEGER,
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

export default Caterer;
