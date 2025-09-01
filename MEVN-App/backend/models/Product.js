const mongoose = require('mongoose');
const schema = new mongoose.Schema({
  productName: String,
  companyName: String,
  quantity: Number,
  tokenCost: Number,
  waitTime: Number,
  donorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Account' }
});
module.exports = mongoose.model('Product', schema);
