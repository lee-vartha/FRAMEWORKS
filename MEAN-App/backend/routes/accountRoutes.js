const express = require('express');
const router = express.Router();
const Account = require('../models/Account');

// Register
router.post('/register', async (req, res) => {
  const account = new Account(req.body);
  const saved = await account.save();
  res.json(saved);
});

// Login
router.post('/login', async (req, res) => {
  const user = await Account.findOne({ email: req.body.email, password: req.body.password });
  if (!user) return res.status(401).json({ message: 'Invalid credentials' });
  res.json(user);
});

module.exports = router;
