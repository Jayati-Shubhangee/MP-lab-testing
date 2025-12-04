const express = require('express');
const User = require('../models/User');
const authMiddleware = require('../utils/authMiddleware');
const router = express.Router();

router.get('/me', authMiddleware, async (req, res) => {
  const user = req.user;
  res.json({ user });
});

router.patch('/me', authMiddleware, async (req, res) => {
  try {
    const updates = req.body;
    // prevent certain overwrites
    delete updates.passwordHash;
    const user = await User.findByIdAndUpdate(req.user._id, updates, { new: true });
    res.json({ user });
  } catch (err) {
    console.error(err); res.status(500).json({ error: 'server error' });
  }
});

router.get('/', async (req, res) => {
  try {
    const { skill, q, githubVerified } = req.query;
    const filter = {};
    if (skill) filter['skills.name'] = { $regex: new RegExp(skill, 'i') };
    if (q) filter.$or = [{ displayName: new RegExp(q, 'i') }, { 'skills.name': new RegExp(q, 'i') }];
    if (githubVerified === 'true') filter.githubVerified = true;
    const users = await User.find(filter).limit(100);
    res.json({ users });
  } catch (err) {
    console.error(err); res.status(500).json({ error: 'server error' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: 'not found' });
    res.json({ user });
  } catch (err) {
    console.error(err); res.status(500).json({ error: 'server error' });
  }
});

module.exports = router;
