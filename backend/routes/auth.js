const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'change_me';

router.post('/signup', async (req, res) => {
  const { email, password, displayName } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'missing email/password' });
  try {
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ error: 'user exists' });
    const hash = await bcrypt.hash(password, 10);
    const user = new User({ email, passwordHash: hash, displayName });
    await user.save();
    const token = jwt.sign({ uid: user._id }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, user: { id: user._id, email: user.email, displayName: user.displayName } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'server error' });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: 'invalid creds' });
    const ok = await bcrypt.compare(password, user.passwordHash || '');
    if (!ok) return res.status(400).json({ error: 'invalid creds' });
    const token = jwt.sign({ uid: user._id }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, user: { id: user._id, email: user.email, displayName: user.displayName } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'server error' });
  }
});

module.exports = router;
