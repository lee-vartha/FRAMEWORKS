const mongoose = require('mongoose');

const tokenSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  amount: { type: Number, required: true },
  type: { type: String, enum: ['earn', 'spend'], required: true },
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
}, { timestamps: true });

module.exports = mongoose.model('Token', tokenSchema);
