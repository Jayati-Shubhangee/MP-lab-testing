const express = require('express');
const Project = require('../models/Project');
const User = require('../models/User');
const { ruleBasedScore, getMLRanking } = require('../utils/matchEngine');

const router = express.Router();

router.post('/suggest', async (req, res) => {
  const { projectId } = req.body;
  if (!projectId) return res.status(400).json({ error: 'projectId required' });
  const project = await Project.findById(projectId);
  if (!project) return res.status(404).json({ error: 'project not found' });

  // candidate pool: for demo get all users
  const candidates = await User.find({}).limit(200);

  // try ML service first
  const mlUrl = process.env.ML_SERVICE_URL; // e.g. http://localhost:8000/infer
  const candidateIds = candidates.map(c => c._id.toString());

  const mlRes = mlUrl ? await getMLRanking(projectId, candidateIds, mlUrl) : null;
  if (mlRes && mlRes.suggestions) {
    // map results to full user profiles
    const suggestions = [];
    for (const item of mlRes.suggestions) {
      const user = candidates.find(c => c._id.toString() === item.candidateId);
      if (user) suggestions.push({ user, score: item.score, breakdown: item.breakdown });
    }
    return res.json({ suggestions });
  }

  // fallback to rule-based scoring
  const scored = candidates.map(u => {
    const s = ruleBasedScore(u, project);
    return { user: u, score: s.finalScore, breakdown: s.breakdown };
  }).sort((a,b) => b.score - a.score);

  res.json({ suggestions: scored.slice(0, 50) });
});

module.exports = router;
