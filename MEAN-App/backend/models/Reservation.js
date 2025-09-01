const mongoose = require('mongoose');
const schema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  beneficiaryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Account' },
  tokensSpent: Number
});
module.exports = mongoose.model('Reservation', schema);
