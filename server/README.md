Civic Backend (Node/Express + SQLite)

Overview
- Lightweight Express server with SQLite (better-sqlite3)
- JWT auth (email/password)
- File uploads with Multer (served from /uploads)
- Endpoints for reports, confirmations (votes), comments
- Gamification points + badges + leaderboard

Quick start
1) cd server
2) cp .env.example .env
   - Set JWT_SECRET and PORT if desired
3) npm install
4) npm run dev

Environment (.env)
PORT=5000
JWT_SECRET=replace-with-a-long-random-string

Folder structure
server/
  - index.js               # App entry
  - package.json           # Backend dependencies
  - .env.example           # Env template
  - uploads/               # Uploaded photos (static)
  - src/
      db/
        - connection.js    # SQLite connection
        - schema.sql       # Database schema
        - init.js          # Initialize DB + seed badges
      middleware/
        - auth.js          # JWT auth middleware
        - error.js         # Global error handler
      routes/
        - health.js        # Health check
        - auth.js          # Login & register
        - reports.js       # Reports, votes, comments
        - leaderboard.js   # Leaderboard
        - gamification.js  # User stats & badges
      services/
        - gamification.js  # Points & badges logic
      utils/
        - passwords.js     # Hash/verify

Base URL
- Default: http://localhost:5000

Key endpoints
- Auth
  - POST /api/auth/register {name,email,password}
  - POST /api/auth/login {email,password}
  - GET  /api/auth/me (auth)

- Reports
  - POST /api/reports (auth, multipart/form-data: title, description, category, photo, latitude, longitude, capturedAt)
  - GET  /api/reports?category=&status=&userId=
  - POST /api/reports/:id/confirm (auth)
  - POST /api/reports/:id/comments (auth) {content}

- Gamification & Leaderboard
  - GET /api/gamification/stats (auth)
  - GET /api/gamification/badges (auth)
  - GET /api/leaderboard

Static files
- Uploaded images are available under /uploads/<userId>/<filename>

Notes
- This backend is self-contained; runs separately from the React app.
- Customize validation and security as needed before production.
