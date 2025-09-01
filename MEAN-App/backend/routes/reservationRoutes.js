const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const Account = require('../models/Account');
const Reservation = require('../models/Reservation');

router.post('/', async (req, res) => {
  const { productId, beneficiaryId } = req.body;
  const product = await Product.findById(productId);
  const beneficiary = await Account.findById(beneficiaryId);

  if (beneficiary.tokens < product.tokenCost) {
    return res.status(400).json({ message: "Not enough tokens" });
  }

  product.quantity -= 1;
  beneficiary.tokens -= product.tokenCost;

  await product.save();
  await beneficiary.save();

  const reservation = new Reservation({
    productId,
    beneficiaryId,
    tokensSpent: product.tokenCost
  });

  const saved = await reservation.save();
  res.json(saved);
});

module.exports = router;
