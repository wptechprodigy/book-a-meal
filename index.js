import express from 'express';

const app = express();

const PORT = 9000;

app.get('/', (req, res) => {
  res.status(200).send('Hello World!');
});

app.listen(PORT);

console.log(`Server running on port ${PORT}`);
