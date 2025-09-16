// referencing mongoose
const mongoose = require('mongoose');

// the schema for tokens
// includes the user who earned/spent the tokens, the amount, the type (earn/spend) and the associated product (if spending)
const tokenSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  amount: { type: Number, required: true },
  type: { type: String, enum: ['earn', 'spend'], required: true },
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
}, { timestamps: true });

// exporting the module
module.exports = mongoose.model('Token', tokenSchema);
