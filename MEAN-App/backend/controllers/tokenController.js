// getting the models (user, token and product)
const User = require('../models/User');
const Token = require('../models/Token');
const Product = require('../models/Product');

// earning tokens and spending tokens controller functions
exports.earnTokens = async (req, res) => {
  try {
    // if the user isnt a beneficiary, return 403
    if (req.user.role !== 'beneficiary') return res.status(403).json({ msg: "Only beneficiaries can earn tokens" });

    // the amount from the request body
    const { amount } = req.body;
    // add the amount to the user's token balance and save
    req.user.tokenBalance += amount;
    await req.user.save();

    // getting the token record
    const tokenRecord = await Token.create({ user: req.user._id, amount, type: 'earn' });
    // response of json with message, balance and record
    res.json({ msg: "Tokens earned", balance: req.user.tokenBalance, record: tokenRecord });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// spending tokens controller function
exports.spendTokens = async (req, res) => {
  try {
    // if the user isnt a beneficiary, return 403
    if (req.user.role !== 'beneficiary') return res.status(403).json({ msg: "Only beneficiaries can spend tokens" });

    // productId from the request body
    const { productId } = req.body;
    const product = await Product.findById(productId);
    // if theres no product, return 404
    if (!product) return res.status(404).json({ msg: "Product not found" });

    // if the users token balance is less than the product cost, return 400
    if (req.user.tokenBalance < product.cost) return res.status(400).json({ msg: "Not enough tokens" });

    // the user's token balance is reduced by the product cost and saved
    req.user.tokenBalance -= product.cost;
    await req.user.save();

    // the token record is created
    const tokenRecord = await Token.create({ user: req.user._id, amount: product.cost, type: 'spend', product: productId });
    res.json({ msg: `Bought ${product.name}`, balance: req.user.tokenBalance, record: tokenRecord });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
