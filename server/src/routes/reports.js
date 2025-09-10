const router = require('express').Router();
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const Joi = require('joi');
const { randomUUID } = require('crypto');

const auth = require('../middleware/auth');
const { db } = require('../db/connection');
const { addPoints, pointsSystem, logActivity, checkAndAwardBadges } = require('../services/gamification');

// Multer storage per-user
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const userId = req.userId || 'anonymous';
    const dir = path.join(__dirname, '..', '..', 'uploads', userId);
    fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname) || '.jpg';
    cb(null, randomUUID() + ext);
  }
});
const upload = multer({ storage });

const createSchema = Joi.object({
  title: Joi.string().min(3).max(200).required(),
  description: Joi.string().allow('').max(5000),
  category: Joi.string().min(2).max(100).required(),
  latitude: Joi.number().optional(),
  longitude: Joi.number().optional(),
  capturedAt: Joi.string().optional(),
});

router.post('/', auth, upload.single('photo'), (req, res, next) => {
  try {
    const { value, error } = createSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.message });
    const { title, description, category, latitude, longitude, capturedAt } = value;

    const id = randomUUID();
    const user_id = req.userId;
    const created_at = new Date().toISOString();
    const photo_url = req.file ? `/uploads/${user_id}/${req.file.filename}` : null;

    db.prepare(`insert into reports(id, user_id, title, description, category, photo_url, latitude, longitude, captured_at, status, created_at)
      values (?,?,?,?,?,?,?,?,?,'open',?)`)
      .run(id, user_id, title, description || '', category, photo_url, latitude || null, longitude || null, capturedAt || null, created_at);

    // Gamification
    addPoints(user_id, 'submitReport', pointsSystem.submitReport, { report_id: id });
    if (photo_url) addPoints(user_id, 'addPhoto', pointsSystem.addPhoto, { report_id: id });

    const count = db.prepare('select count(*) as c from reports where user_id = ?').get(user_id).c;
    if (count === 1) addPoints(user_id, 'firstReportBonus', pointsSystem.firstReportBonus, { report_id: id });

    logActivity(user_id, 'report_submitted');
    checkAndAwardBadges(user_id);

    const report = db.prepare('select * from reports where id = ?').get(id);
    res.status(201).json({ report });
  } catch (e) { next(e); }
});

router.get('/', (req, res, next) => {
  try {
    const { category, status, userId } = req.query;
    let sql = 'select r.*, (select count(*) from report_votes v where v.report_id = r.id) as confirmations from reports r where 1=1';
    const params = [];
    if (category) { sql += ' and r.category = ?'; params.push(category); }
    if (status) { sql += ' and r.status = ?'; params.push(status); }
    if (userId) { sql += ' and r.user_id = ?'; params.push(userId); }
    sql += ' order by r.created_at desc limit 200';

    const rows = db.prepare(sql).all(...params);
    res.json({ reports: rows });
  } catch (e) { next(e); }
});

router.post('/:id/confirm', auth, (req, res, next) => {
  try {
    const report_id = req.params.id;
    const voter_id = req.userId;
    const created_at = new Date().toISOString();

    const report = db.prepare('select * from reports where id = ?').get(report_id);
    if (!report) return res.status(404).json({ error: 'Report not found' });
    if (report.user_id === voter_id) return res.status(400).json({ error: 'Cannot confirm own report' });

    db.prepare('insert into report_votes(report_id, voter_id, created_at) values (?,?,?)').run(report_id, voter_id, created_at);

    addPoints(voter_id, 'confirmReport', pointsSystem.confirmReport, { report_id });

    // Small engagement point to author
    addPoints(report.user_id, 'reportEngaged', 1, { report_id, voter_id });

    checkAndAwardBadges(voter_id);
    checkAndAwardBadges(report.user_id);

    res.status(201).json({ ok: true });
  } catch (e) {
    if (e && e.code === 'SQLITE_CONSTRAINT_PRIMARYKEY') {
      return res.status(409).json({ error: 'Already confirmed' });
    }
    next(e);
  }
});

router.post('/:id/comments', auth, (req, res, next) => {
  try {
    const { content } = req.body || {};
    if (!content || !String(content).trim()) return res.status(400).json({ error: 'Content required' });
    const report_id = req.params.id;
    const user_id = req.userId;
    const created_at = new Date().toISOString();

    const report = db.prepare('select id from reports where id = ?').get(report_id);
    if (!report) return res.status(404).json({ error: 'Report not found' });

    const info = db.prepare('insert into comments(report_id, user_id, content, created_at) values (?,?,?,?)')
      .run(report_id, user_id, content, created_at);

    // Points
    addPoints(user_id, 'addComment', pointsSystem.addComment, { report_id, comment_id: info.lastInsertRowid });

    const comment = db.prepare('select * from comments where id = ?').get(info.lastInsertRowid);
    res.status(201).json({ comment });
  } catch (e) { next(e); }
});

module.exports = router;
