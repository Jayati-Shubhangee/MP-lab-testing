const mongoose = require('mongoose');

const TeamSchema = new mongoose.Schema({
  projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' },
  members: [{ userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, role: String }],
  status: { type: String, default: 'pending' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Team', TeamSchema);
