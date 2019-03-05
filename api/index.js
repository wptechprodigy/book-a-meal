import express from 'express';
import { config } from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';
import sequelize from './utils/database';

// Routes
import mealRoutes from './routes/meal.routes';
import menuRoutes from './routes/menu.routes';
import orderRoutes from './routes/order.routes';

config();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.get('/', (req, res) => {
  res.status(200).send({
    status: 200,
    message: 'Welcome to Book-A-Meal API version 1 (v1)!!!',
  });
});

app.use('/api/v1/meals', mealRoutes);
app.use('/api/v1/menus', menuRoutes);
app.use('/api/v1/orders', orderRoutes);

sequelize
  .sync()
  .then(() => {
    console.log('DB Connection has been established');
    app.listen(process.env.PORT, null, null, () => {
      app.emit('dbConnected');
    });
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

export default app;
