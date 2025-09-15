const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['member', 'beneficiary'], required: true },
  tokenBalance: { type: Number, default: 0 },
});

module.exports = mongoose.model('User', userSchema);
