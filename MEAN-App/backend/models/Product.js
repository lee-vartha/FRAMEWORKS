// referencing mongoose
const mongoose = require('mongoose');

// the schema for products
// includes the name of the product (pizza), description (cheese and tomato), cost (in tokens) and owner (the user who added it)
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  cost: { type: Number, required: true }, // token cost
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

// exporting the model
module.exports = mongoose.model('Product', productSchema);
