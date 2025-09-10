const router = require('express').Router();
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const { db } = require('../db/connection');
const { hashPassword, verifyPassword } = require('../utils/passwords');
const { randomUUID } = require('crypto');

const registerSchema = Joi.object({
  name: Joi.string().min(2).max(100).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(100).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(100).required(),
});

function signToken(userId) {
  const secret = process.env.JWT_SECRET || 'dev-secret';
  return jwt.sign({}, secret, { subject: userId, expiresIn: '7d' });
}

router.post('/register', async (req, res, next) => {
  try {
    const { value, error } = registerSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.message });
    const { name, email, password } = value;

    const exists = db.prepare('select id from users where email = ?').get(email);
    if (exists) return res.status(409).json({ error: 'Email already registered' });

    const id = randomUUID();
    const password_hash = await hashPassword(password);
    const created_at = new Date().toISOString();
    db.prepare('insert into users(id, name, email, password_hash, created_at) values (?,?,?,?,?)')
      .run(id, name, email, password_hash, created_at);

    const token = signToken(id);
    res.status(201).json({ token, user: { id, name, email } });
  } catch (e) { next(e); }
});

router.post('/login', async (req, res, next) => {
  try {
    const { value, error } = loginSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.message });
    const { email, password } = value;

    const user = db.prepare('select * from users where email = ?').get(email);
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });

    const valid = await verifyPassword(password, user.password_hash);
    if (!valid) return res.status(401).json({ error: 'Invalid credentials' });

    const token = signToken(user.id);
    res.json({ token, user: { id: user.id, name: user.name, email: user.email } });
  } catch (e) { next(e); }
});

const authMiddleware = require('../middleware/auth');
router.get('/me', authMiddleware, (req, res) => {
  const user = db.prepare('select id, name, email, created_at from users where id = ?').get(req.userId);
  res.json({ user });
});

module.exports = router;
