import '@babel/polyfill';
import { config } from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import fileUpload from 'express-fileupload';
// import swaggerUi from 'swagger-ui-express';
import sequelize from './utils/database';
import User from './models/user';
import Caterer from './models/caterer';
import Meal from './models/meals';
import Menu from './models/menus';
import Order from './models/orders';
// import swaggerDocument from './swagger.json';

// Routes
import userRoutes from './routes/users.routes';
import catererRoutes from './routes/caterers.routes';
import mealRoutes from './routes/meals.routes';
import menuRoutes from './routes/menus.routes';
import orderRoutes from './routes/orders.routes';

config();

const app = express();

const PORT = process.env.PORT || 9000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(fileUpload());
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const rootRoute = '/api/v1';

app.use(rootRoute, userRoutes);
app.use(rootRoute, catererRoutes);
app.use(rootRoute, mealRoutes);
app.use(rootRoute, menuRoutes);
app.use(rootRoute, orderRoutes);

User.hasMany(Order, { constraints: true, onDelete: 'CASCADE' });
Order.belongsTo(Caterer, { constraints: true, onDelete: 'CASCADE' });
Meal.belongsTo(Caterer, { constraints: true, onDelete: 'CASCADE' });
Menu.belongsTo(Caterer, { constraints: true, onDelete: 'CASCADE' });

app.get('/', (req, res) => {
  res.status(200).send({
    status: 200,
    message: 'Welcome to Book-A-Meal API version 1 (v1)!!!',
  });
});

sequelize
  .sync() // force: true
  .then(() => {
    console.log('DB Connection has been established');
    app.listen(PORT, null, null, () => {
      app.emit('dbConnected');
    });
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

export default app;
