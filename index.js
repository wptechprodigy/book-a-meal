import express from 'express';

const app = express();

const PORT = 9000;

app.get('/', (req, res) => {
  res.status(200).send({
    status: 200,
    message: 'Express bootsrapping is working fine! So, everything is working fine',
  });
});

app.listen(PORT);

console.log(`Server running on port ${PORT}`);
