const express = require('express');
const app = express();
const PORT = 3000;
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const Order = require('./models/Orders');

// Mongoose will be unable to read the env file unless this is config is added.
require('dotenv/config');
app.use(bodyParser.json());
app.use(cors());

// Connect to Mongo DB
mongoose.connect(
  process.env.DB_CONNECTION,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => {
    console.log('Connection made to the ordersdb');
  }
);

// Middlewares
app.use(express.static(path.join(__dirname, './static')));

// Route settings
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './static/index.html'));
});

// TEST ENDPOINT
// app.get('/orders', (req, res) => {
//   const people = [
//     {
//       name: 'Jason',
//       occupation: 'frontend developer',
//       workStatus: 'fulltime',
//     },
//     {
//       name: 'Sienna Elise',
//       occupation: 'baby',
//       workStatus: 'fulltime cute baby',
//     },
//     {
//       name: 'Churchelle',
//       occupation: 'QA regulatory',
//       workStatus: 'fulltime',
//     },
//   ];
//   res.json({ people: people });
// });

app.post('/save', async (req, res) => {
  const order = new Order({
    orderDate: req.body.dateOrdered,
    orderItem: req.body.foodItem,
    orderPrice: req.body.price,
    orderShares: req.body.shareCount,
  });

  const savedOrder = await order.save();

  try {
    console.log('order is saved');
  } catch (err) {
    console.log(err);
  }
});

// Check ports for successful run of server
app.listen(PORT, () => {
  console.log(`You are now listening at PORT ${PORT}.`);
});
