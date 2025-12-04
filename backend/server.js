require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const morgan = require('morgan');

const authRoutes = require('./routes/auth');
const usersRoutes = require('./routes/users');
const projectsRoutes = require('./routes/projects');
const teamsRoutes = require('./routes/teams');
const matchRoutes = require('./routes/match');

const app = express();
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || '*'
}));
app.use(express.json());
app.use(morgan('dev'));
app.use(rateLimit({ windowMs: 60 * 1000, max: 200 }));

app.use('/api/auth', authRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/projects', projectsRoutes);
app.use('/api/teams', teamsRoutes);
app.use('/api/match', matchRoutes);

const PORT = process.env.PORT || 4000;
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(()=> {
  console.log('Connected to MongoDB');
  app.listen(PORT, ()=> console.log(`Server started on port ${PORT}`));
})
.catch(err => {
  console.error('DB connection error:', err);
});
