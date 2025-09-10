const router = require('express').Router();
const { db } = require('../db/connection');

router.get('/', (req, res, next) => {
  try {
    const rows = db.prepare(`
      select u.id as user_id, u.name, u.email,
             coalesce((select sum(points) from points_ledger p where p.user_id = u.id),0) as total_points
      from users u
      order by total_points desc
      limit 100
    `).all();
    // add rank
    const leaderboard = rows.map((r, i) => ({ rank: i + 1, ...r }));
    res.json({ leaderboard });
  } catch (e) { next(e); }
});

module.exports = router;
