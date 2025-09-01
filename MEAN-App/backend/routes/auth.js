const express = require('express');
const router = express.Router();
const Account = require('../models/Account');

// Register
router.post('/register', async (req, res) => {
  const user = new Account(req.body);
  const saved = await user.save();
  res.json(saved);
});

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await Account.findOne({ email, password });
  user ? res.json(user) : res.status(404).send("Invalid login");
});

module.exports = router;
