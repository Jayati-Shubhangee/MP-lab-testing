const express = require('express');
const Team = require('../models/Team');
const authMiddleware = require('../utils/authMiddleware');
const router = express.Router();

router.post('/', authMiddleware, async (req, res) => {
  try {
    const payload = req.body;
    const t = new Team(payload);
    await t.save();
    res.json({ team: t });
  } catch (err) { console.error(err); res.status(500).json({ error: 'server error' }); }
});

router.get('/', authMiddleware, async (req, res) => {
  // get teams where user is member
  const userId = req.user._id;
  const teams = await Team.find({ 'members.userId': userId });
  res.json({ teams });
});

module.exports = router;
