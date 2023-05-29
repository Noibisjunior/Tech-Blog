const jwt = require('jsonwebtoken');
const User = require('../model/user');

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: 'Authentication failed' });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // req.userId = decoded.id;
    // console.log('User ID:', req.userId);
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ message: 'Unauthorized access' });
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized access' });
  }
};
module.exports = authMiddleware;