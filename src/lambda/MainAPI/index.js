import serverless from 'serverless-http';
import express from 'express';
import productsRouter from './routes/index.js';

const app = express();

app.use('/api/v1/products', productsRouter);

app.all('/', (req, res) => {
  res.send('Incorrect endpoint');
});

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});

export const handler = serverless(app);
