const mongoose = require('mongoose');
const schema = new mongoose.Schema({
  firstName: String,
  email: { type: String, unique: true },
  password: String,
  memberType: { type: String, enum: ['donor', 'beneficiary'] },
  tokens: { type: Number, default: 0 }
});
module.exports = mongoose.model('Account', schema);
