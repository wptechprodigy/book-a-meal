import { config } from 'dotenv';
import Sequelize from 'sequelize';

config();

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  logging: false,
});

export default sequelize;
