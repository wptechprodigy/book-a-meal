import Sequelize from 'sequelize';
import 'dotenv/config';

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  logging: false
});

export default sequelize;
