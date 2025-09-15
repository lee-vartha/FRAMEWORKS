const Product = require('../models/Product');

exports.addProduct = async (req, res) => {
  try {
    if (req.user.role !== 'member') return res.status(403).json({ msg: "Only members can add products" });

    const { name, description, cost } = req.body;
    const product = await Product.create({ name, description, cost, owner: req.user._id });

    res.json(product);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find().populate('owner', 'name email');
    res.json(products);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
