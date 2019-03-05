import 'dotenv/config';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

// Routes
import mealRoutes from './routes/meal.routes';
import menuRoutes from './routes/menu.routes';
import orderRoutes from './routes/order.routes';

const app = express();
const PORT = process.env.PORT;

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.status(200).send({
    status: 200,
    message: 'Welcome to Book-A-Meal API version 1 (v1)!!!',
  });
});

app.use('/api/v1/meals', mealRoutes);
app.use('/api/v1/menus', menuRoutes);
app.use('/api/v1/orders', orderRoutes);

app.listen(PORT);

console.log(`Server running on port ${PORT}`);

export default app;
