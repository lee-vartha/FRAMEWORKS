const User = require('../models/User');
const Token = require('../models/Token');
const Product = require('../models/Product');

exports.earnTokens = async (req, res) => {
  try {
    if (req.user.role !== 'beneficiary') return res.status(403).json({ msg: "Only beneficiaries can earn tokens" });

    const { amount } = req.body;
    req.user.tokenBalance += amount;
    await req.user.save();

    const tokenRecord = await Token.create({ user: req.user._id, amount, type: 'earn' });
    res.json({ msg: "Tokens earned", balance: req.user.tokenBalance, record: tokenRecord });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.spendTokens = async (req, res) => {
  try {
    if (req.user.role !== 'beneficiary') return res.status(403).json({ msg: "Only beneficiaries can spend tokens" });

    const { productId } = req.body;
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ msg: "Product not found" });

    if (req.user.tokenBalance < product.cost) return res.status(400).json({ msg: "Not enough tokens" });

    req.user.tokenBalance -= product.cost;
    await req.user.save();

    const tokenRecord = await Token.create({ user: req.user._id, amount: product.cost, type: 'spend', product: productId });
    res.json({ msg: `Bought ${product.name}`, balance: req.user.tokenBalance, record: tokenRecord });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
