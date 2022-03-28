const mongoose = require('mongoose');

// Creation of our Orders schema
const OrdersSchema = mongoose.Schema({
  orderDate: {
    type: Date,
    default: Date.now(),
  },
  orderItem: {
    type: String,
    required: true,
  },
  orderPrice: {
    type: Number,
    required: true,
  },
  orderShares: {
    type: Number,
    default: 4,
  },
});

const Orders = mongoose.model('Orders', OrdersSchema);
module.exports = Orders;
