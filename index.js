import express from 'express';
import bodyParser from 'body-parser';

// Routes
import mealRoutes from './api/routes/meal.routes';

const app = express();
const PORT = 9000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.status(200).send({
    status: 200,
    message: 'The API is still working...Hooray!!!',
  });
});

app.use('/api/v1/meals', mealRoutes);

app.listen(PORT);

console.log(`Server running on port ${PORT}`);
