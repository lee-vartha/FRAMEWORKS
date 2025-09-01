// models/Token.js
const mongoose = require('mongoose');
const schema = new mongoose.Schema({
  tokenValue: Number,
  accountId: { type: mongoose.Schema.Types.ObjectId, ref: 'Account' },
});
module.exports = mongoose.model('Token', schema);
