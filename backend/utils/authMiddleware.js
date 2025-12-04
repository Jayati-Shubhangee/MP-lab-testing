const jwt = require('jsonwebtoken');
const User = require('../models/User');

const JWT_SECRET = process.env.JWT_SECRET || 'change_me';

async function authMiddleware(req, res, next) {
  const auth = req.headers.authorization;
  if (!auth) return res.status(401).json({ error: 'No auth header' });
  const token = auth.split(' ')[1];
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(payload.uid);
    if (!user) return res.status(401).json({ error: 'Invalid token' });
    req.user = user;
    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({ error: 'Invalid token' });
  }
}

module.exports = authMiddleware;
