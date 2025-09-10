const router = require('express').Router();
const auth = require('../middleware/auth');
const { db } = require('../db/connection');
const { calculateLevel, levelThresholds } = require('../services/gamification');

router.get('/stats', auth, (req, res, next) => {
  try {
    const userId = req.userId;
    const totalPoints = db.prepare('select coalesce(sum(points),0) as total from points_ledger where user_id = ?').get(userId).total || 0;

    // Level calc
    const level = calculateLevel(totalPoints);
    const nextLevelPoints = levelThresholds[level] || (levelThresholds[levelThresholds.length - 1] + 1000);
    const currentLevelPoints = levelThresholds[level - 1] || 0;

    // Streak (days with activity)
    const streakRow = db.prepare(`
      select count(*) as c from (
        select happened_on from activity_log
        where user_id = ? and happened_on >= date('now','-7 day')
        group by happened_on
      ) s
    `).get(userId);
    const streak = streakRow.c || 0;

    // Weekly & monthly points
    const weeklyPoints = db.prepare("select coalesce(sum(points),0) as p from points_ledger where user_id = ? and created_at >= datetime('now','-7 day')").get(userId).p || 0;
    const monthlyPoints = db.prepare("select coalesce(sum(points),0) as p from points_ledger where user_id = ? and created_at >= datetime('now','-30 day')").get(userId).p || 0;

    const badges = db.prepare('select count(*) as c from user_badges where user_id = ?').get(userId).c || 0;

    // Rank
    const all = db.prepare('select user_id, sum(points) as total from points_ledger group by user_id order by total desc').all();
    const rank = all.findIndex(r => r.user_id === userId) + 1 || null;
    const totalUsers = db.prepare('select count(*) as c from users').get().c || 0;

    res.json({
      userStats: {
        points: totalPoints,
        level,
        rank: rank || totalUsers, // If not found, put at end
        totalUsers,
        nextLevelPoints,
        currentLevelPoints,
        weeklyPoints,
        monthlyPoints,
        badges,
        streak
      }
    });
  } catch (e) { next(e); }
});

router.get('/badges', auth, (req, res, next) => {
  try {
    const userId = req.userId;
    const rows = db.prepare(`
      select b.*, ub.earned_at
      from badges b
      left join user_badges ub on ub.badge_id = b.id and ub.user_id = ?
      order by case b.rarity when 'platinum' then 4 when 'gold' then 3 when 'silver' then 2 else 1 end desc
    `).all(userId);
    res.json({ badges: rows });
  } catch (e) { next(e); }
});

module.exports = router;
