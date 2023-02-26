import express from 'express';
import data from './data.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import seedRouter from './routes/seedRoutes.js';
import productRouter from './routes/productRoute.js';
import userRouter from './routes/userRoutes.js';

dotenv.config();
mongoose.set('strictQuery', false);

//loading connection string from .env MONGODB_URI
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('connected to db');
  })
  .catch((err) => {
    console.log(err.message);
  });
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/seed', seedRouter);
app.use('/api/products', productRouter);

app.use('/api/users', userRouter);

//Below codes is cut and modified in order to perform mongoDB saving in productRoute.js

// app.get('/api/products', (req, res) => {
//   res.send(data.products);
// });

/*
//Backend api to return priduct based on value of slug of product
app.get('/api/products/slug/:slug', (req, res) => {
  const product = data.products.find((x) => x.slug === req.params.slug);
  if (product) {
    res.send(product);
  } else {
    res.send(404).send({ message: 'Product Not Found' });
  }
});

//Backend api to cart based on unique _id
app.get('/api/products/:id', (req, res) => {
  const product = data.products.find((x) => x._id === req.params.id);
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: 'Product Not Found' });
  }
});
*/

//To handle error of express-async-handler
app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

//define port
const port = process.env.PORT || 5000;

//app listen
app.listen(port, () => {
  console.log(`serve at http://localhost:${port}`);
});
