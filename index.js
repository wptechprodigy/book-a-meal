import express from 'express';
import bodyParser from 'body-parser';

const app = express();

const PORT = 9000;

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.status(200).send({
    status: 200,
    message: 'Express bootsrapping is working fine! So, everything is working fine',
  });
});

app.listen(PORT);

console.log(`Server running on port ${PORT}`);
