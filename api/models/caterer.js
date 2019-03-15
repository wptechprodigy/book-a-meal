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

Caterer.hasMany(Order, { constraints: true, onDelete: 'CASCADE' });
Caterer.hasMany(Meal, { constraints: true, onDelete: 'CASCADE' });
Caterer.hasMany(Menu, { constraints: true, onDelete: 'CASCADE' });

export default Caterer;
