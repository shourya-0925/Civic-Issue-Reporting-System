require('dotenv').config();
const path = require('path');
const express = require('express');
const cors = require('cors');

const { ensureSchema, seedBadges } = require('./src/db/init');
const healthRoutes = require('./src/routes/health');
const authRoutes = require('./src/routes/auth');
const reportRoutes = require('./src/routes/reports');
const leaderboardRoutes = require('./src/routes/leaderboard');
const gamificationRoutes = require('./src/routes/gamification');
const errorHandler = require('./src/middleware/error');

const app = express();

// Core middleware
app.use(cors({ origin: true, credentials: true }));
app.use(express.json({ limit: '10mb' }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Init DB
ensureSchema();
seedBadges();

// Routes
app.use('/api/health', healthRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/leaderboard', leaderboardRoutes);
app.use('/api/gamification', gamificationRoutes);

// Error handling
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
