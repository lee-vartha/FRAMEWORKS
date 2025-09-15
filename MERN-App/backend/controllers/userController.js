// importing modules
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

// generating JWT token
const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });

// registering a new user
exports.register = async (req, res) => {
  const { name, email, password, role } = req.body;

  // if none of these fields are put in, return 400
  if (!name || !email || !password || !role) return res.status(400).json({ msg: "Missing fields" });

  // if a user with that email already exists, return 400
  const userExists = await User.findOne({ email });
  if (userExists) return res.status(400).json({ msg: "User already exists" });

  // hashing the password and creating the user
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, password: hashedPassword, role });

  // json response with token and user info
  res.json({ token: generateToken(user._id), user: { id: user._id, name, email, role } });
};

// exporting login function
exports.login = async (req, res) => {
  const { email, password } = req.body;

  // finding the user by email
  const user = await User.findOne({ email });
  // if the details are wrong, return 400
  if (!user) return res.status(400).json({ msg: "Invalid credentials" });

  // matching the password
  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(400).json({ msg: "Invalid credentials" });

  // json response with token and user info
  res.json({ token: generateToken(user._id), user: { id: user._id, name: user.name, email, role: user.role } });
};

// exporting getProfile function
exports.getProfile = async (req, res) => {
  const user = await User.findById(req.user.id).select('-password');
  res.json(user);
};
