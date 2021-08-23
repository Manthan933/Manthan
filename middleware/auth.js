// middleware to create a protected route
const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  // get token from header
  const token = req.header('x-auth-token');

  if (!token) {
    // 401- unauthorized
    return res.status(401).json({ msg: 'no token,authorization denied' });
  }

  // verify token
  try {
    // decode token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // set req user = decoded user
    req.user = decoded.user;
    next(); // callback, important , o.w. we'll get stuck here only
  } catch (err) {
    res.status(401).json({ msg: 'token not valid' });
  }
};
