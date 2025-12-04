/*const express = require('express');
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

module.exports = router;*/
// backend/seed/seed.js
require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const User = require('../models/User');
const Project = require('../models/Project');
const Team = require('../models/Team');

async function seed() {
  try {
    console.log('🔄 Connecting to DB...');
    await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('✅ Connected to DB');

    // ---------- CLEAR DEV DATA (be careful in production) ----------
    await User.deleteMany({});
    await Project.deleteMany({});
    await Team.deleteMany({});
    console.log('🧹 Collections cleared');

    // ---------- CREATE USERS (passwords hashed) ----------
    const rawUsers = [
      { email: 'asha@example.com', displayName: 'Asha Kumar', college: 'ABC Institute', year: '3rd',
        bio: 'Frontend dev & UI', skills: [{name:'React',level:4},{name:'UI/UX',level:3}], githubUrl:'https://github.com/ashak', githubVerified:true, avgRating:4.6, availability:['evenings'] , password:'pass123' },
      { email: 'rahul@example.com', displayName: 'Rahul Verma', college: 'ABC Institute', year: '2nd',
        bio: 'ML & Data', skills: [{name:'Python',level:4},{name:'ML',level:3}], githubUrl:'', githubVerified:false, avgRating:4.1, availability:['weekends'], password:'pass123' },
      { email: 'priya@example.com', displayName: 'Priya Singh', college: 'XYZ College', year: '3rd',
        bio: 'Designer', skills: [{name:'Figma',level:5},{name:'Design',level:4}], githubUrl:'https://github.com/priya', githubVerified:true, avgRating:4.8, availability:['evenings','weekends'], password:'pass123' },
      { email: 'ankit@example.com', displayName: 'Ankit Sharma', college: 'ABC Institute', year: '4th',
        bio: 'Backend dev', skills: [{name:'Node.js',level:4},{name:'MongoDB',level:4}], githubUrl:'https://github.com/ankit', githubVerified:true, avgRating:4.3, availability:['evenings','weekends'], password:'pass123' },
      { email: 'neha@example.com', displayName: 'Neha Gupta', college: 'ABC Institute', year: '2nd',
        bio: 'Fullstack intern', skills: [{name:'React',level:3},{name:'Node.js',level:3}], githubUrl:'', githubVerified:false, avgRating:4.0, availability:['mornings'], password:'pass123' }
    ];

    // Hash passwords and create
    for (const u of rawUsers) {
      const hash = await bcrypt.hash(u.password, 10);
      const userDoc = new User({
        email: u.email,
        passwordHash: hash,
        displayName: u.displayName,
        college: u.college,
        year: u.year,
        bio: u.bio,
        skills: u.skills,
        projects: [],
        achievements: [],
        githubUrl: u.githubUrl,
        githubVerified: u.githubVerified,
        testimonials: [],
        avgRating: u.avgRating,
        availability: u.availability
      });
      await userDoc.save();
      console.log('➕ Created user', u.email);
    }

    // Fetch created users to reference
    const users = await User.find({}).limit(50);

    // ---------- CREATE A SAMPLE PROJECT ----------
    const sampleProject = new Project({
      title: 'Smart Campus App',
      description: 'Hackathon project to improve campus life',
      createdBy: users[0]._id,
      hackathonName: 'SIH 2025',
      teamSize: 4,
      preferredTime: ['evenings'],
      roles: [{ roleName: 'Frontend', minCount: 1 }, { roleName: 'Backend', minCount: 1 }, { roleName: 'Designer', minCount: 1 }]
    });
    await sampleProject.save();
    console.log('➕ Created project', sampleProject.title);

    // ---------- CREATE A SAMPLE TEAM ----------
    const team = new Team({
      projectId: sampleProject._id,
      members: [
        { userId: users[0]._id, role: 'Frontend' },
        { userId: users[1]._id, role: 'Backend' }
      ],
      status: 'active'
    });
    await team.save();
    console.log('➕ Created team for project', sampleProject.title);

    console.log('🌱 Seeding completed successfully');
    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    console.error('❌ Seeding error:', err);
    process.exit(1);
  }
}

seed();

