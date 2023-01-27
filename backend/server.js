import express from 'express';
import data from './data.js';

const app = express();

app.get('/api/products', (req, res) => {
  res.send(data.products);
});

//define port
const port = process.env.PORT || 5000;

//app listen
app.listen(port, () => {
  console.log(`serve at http://localhost:${port}`);
});
