const mongoose = require('mongoose');

const RoleSchema = new mongoose.Schema({
  roleName: String,
  minCount: { type: Number, default: 1 }
}, { _id: false });

const ProjectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  hackathonName: String,
  teamSize: { type: Number, default: 4 },
  preferredTime: [String],
  roles: [RoleSchema],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Project', ProjectSchema);
