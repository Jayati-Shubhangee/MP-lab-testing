const mongoose = require('mongoose');

const ProjectSubSchema = new mongoose.Schema({
  title: String,
  description: String,
  link: String
}, { _id: false });

const HackathonSubSchema = new mongoose.Schema({
  name: String,
  year: String,
  role: String,
  achievement: String
}, { _id: false });

const TestimonialSchema = new mongoose.Schema({
  fromUserId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  rating: { type: Number, min: 1, max: 5 },
  comment: String,
  createdAt: { type: Date, default: Date.now }
}, { _id: false });

const SkillSchema = new mongoose.Schema({
  name: String,
  level: Number
}, { _id: false });

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, index: true },
  passwordHash: String,
  displayName: String,
  college: String,
  year: String,
  bio: String,
  skills: [SkillSchema],
  projects: [ProjectSubSchema],
  achievements: [String],
  githubUrl: String,
  githubVerified: { type: Boolean, default: false },
  kaggleUrl: String,
  hackathons: [HackathonSubSchema],
  testimonials: [TestimonialSchema],
  avgRating: { type: Number, default: 0 },
  availability: [String],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', UserSchema);
