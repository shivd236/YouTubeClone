const jwt = require('jsonwebtoken');
const User = require('../Modals/user');

const auth = async (req, res, next) => {
  let token;

  // Check for token in Authorization header or cookies
  if ( req.headers.authorization && req.headers.authorization.startsWith('Bearer') ) {

    token = req.headers.authorization.split(' ')[1]; // Extract token from Authorization header
    
  } else if (req.cookies.token) {
    token = req.cookies.token; // Extract token from cookies
  }

  if (!token) {
    return res.status(401).json({ error: 'No token, authorization denied' });
  }

  try {
    const decode = jwt.verify(token, 'Its_My_Secret_Key');
    req.user = await User.findById(decode.userId).select('-password');
    next();
  } catch (error) {
    res.status(401).json({ error: 'Token is not valid' });
  }
};

module.exports = auth;
