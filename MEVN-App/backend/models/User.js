// referencing mongoose
const mongoose = require('mongoose');

// the schema for users
// includes name, email, password, role (member or beneficiary) and token balance
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['member', 'beneficiary'], required: true },
  tokenBalance: { type: Number, default: 0 },
});

// exporting the model
module.exports = mongoose.model('User', userSchema);
