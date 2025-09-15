// referencing the product model
const Product = require('../models/Product');

// export controller function - adding the product
exports.addProduct = async (req, res) => {
  try {
    // if the user role is not member, return 403
    if (req.user.role !== 'member') return res.status(403).json({ msg: "Only members can add products" });

    const { name, description, cost } = req.body;
    const product = await Product.create({ name, description, cost, owner: req.user._id });

    // json response with the product
    res.json(product);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// export controller function - getting the products
exports.getProducts = async (req, res) => {
  try {
    // populate the owner field with name and email
    const products = await Product.find().populate('owner', 'name email');
    res.json(products);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
