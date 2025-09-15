// referencing the middleware - json web tokens and the user model
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// protect means to secure routes
const protect = async (req, res, next) => {
  // let token from the request headers
  let token = req.headers.authorization;

  // if the token is not present or does not start with Bearer, return 401
  if (!token || !token.startsWith('Bearer '))
    return res.status(401).json({ msg: 'No token provided' });

  try {
    // decode the token and attach the user to the request object, excluding the password
    const decoded = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select('-password');
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token failed' });
  }
};

module.exports = { protect };
