const fs = require('fs');
const path = require('path');
const { db } = require('./connection');

function ensureSchema() {
  const schemaPath = path.join(__dirname, 'schema.sql');
  const sql = fs.readFileSync(schemaPath, 'utf8');
  db.exec('PRAGMA foreign_keys = ON;');
  db.exec(sql);
}

function seedBadges() {
  const stmt = db.prepare('insert or ignore into badges(id, name, description, rarity, icon_name, color) values (?,?,?,?,?,?)');
  const badges = [
    ['first-report','First Report','Submit your first civic issue report','bronze','award','blue'],
    ['community-helper','Community Helper','Confirm 10 other reports to help the community','silver','users','green'],
    ['super-reporter','Super Reporter','Submit 20 reports total','platinum','trophy','red']
  ];
  const trx = db.transaction(() => {
    for (const b of badges) stmt.run(b);
  });
  trx();
}

module.exports = { ensureSchema, seedBadges };
