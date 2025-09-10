const { db } = require('../db/connection');

const pointsSystem = {
  submitReport: 10,
  confirmReport: 2,
  addComment: 1,
  addPhoto: 3,
  firstReportBonus: 5,
  weeklyStreakBonus: 10,
};

const levelThresholds = [
  0, 100, 250, 450, 700, 1000, 1350, 1750, 2200, 2700, 3250, 3850, 4500, 5200, 5950
];

function calculateLevel(points) {
  for (let i = levelThresholds.length - 1; i >= 0; i--) {
    if (points >= levelThresholds[i]) return i + 1;
  }
  return 1;
}

function addPoints(userId, source, points, meta = {}) {
  const created_at = new Date().toISOString();
  db.prepare('insert into points_ledger(user_id, source, points, meta, created_at) values (?,?,?,?,?)')
    .run(userId, source, points, JSON.stringify(meta), created_at);
}

function logActivity(userId, action) {
  const now = new Date();
  const happened_on = now.toISOString().slice(0, 10);
  const created_at = now.toISOString();
  try {
    db.prepare('insert into activity_log(user_id, happened_on, action, created_at) values (?,?,?,?)')
      .run(userId, happened_on, action, created_at);
  } catch (_) {
    // ignore unique conflicts
  }
}

function checkAndAwardBadges(userId) {
  // First Report
  const reportCount = db.prepare('select count(*) as c from reports where user_id = ?').get(userId).c;
  if (reportCount >= 1) {
    db.prepare('insert or ignore into user_badges(user_id, badge_id, earned_at) values (?,?,?)')
      .run(userId, 'first-report', new Date().toISOString());
  }
  // Community Helper (10 confirmations)
  const confirms = db.prepare('select count(*) as c from report_votes where voter_id = ?').get(userId).c;
  if (confirms >= 10) {
    db.prepare('insert or ignore into user_badges(user_id, badge_id, earned_at) values (?,?,?)')
      .run(userId, 'community-helper', new Date().toISOString());
  }
  // Super Reporter (20 reports)
  if (reportCount >= 20) {
    db.prepare('insert or ignore into user_badges(user_id, badge_id, earned_at) values (?,?,?)')
      .run(userId, 'super-reporter', new Date().toISOString());
  }
}

function getUserPoints(userId) {
  const row = db.prepare('select coalesce(sum(points),0) as total from points_ledger where user_id = ?').get(userId);
  return row.total || 0;
}

module.exports = {
  pointsSystem,
  levelThresholds,
  calculateLevel,
  addPoints,
  logActivity,
  checkAndAwardBadges,
  getUserPoints,
};
