const express = require('express');
const Project = require('../models/Project');
const authMiddleware = require('../utils/authMiddleware');
const router = express.Router();

router.post('/', authMiddleware, async (req, res) => {
  try {
    const payload = req.body;
    payload.createdBy = req.user._id;
    const p = new Project(payload);
    await p.save();
    res.json({ project: p });
  } catch (err) { console.error(err); res.status(500).json({ error: 'server error' }); }
});

router.get('/', async (req, res) => {
  const projects = await Project.find({}).limit(100);
  res.json({ projects });
});

router.get('/:id', async (req, res) => {
  const project = await Project.findById(req.params.id);
  if (!project) return res.status(404).json({ error: 'not found' });
  res.json({ project });
});

module.exports = router;
