import express from 'express'
import helmet from 'helmet'
import cors from 'cors'
import rateLimit from 'express-rate-limit'
import Database from 'better-sqlite3'
import { z } from 'zod'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const rootDir = path.resolve(__dirname, '..')
const app = express()
const port = Number(process.env.PORT || 3000)
const databasePath = process.env.DATABASE_PATH || path.join(rootDir, 'data', 'waitlist.sqlite')
fs.mkdirSync(path.dirname(path.resolve(databasePath)), { recursive: true })
const db = new Database(databasePath)
db.pragma('journal_mode = WAL')
db.pragma('busy_timeout = 5000')
db.exec(`
  CREATE TABLE IF NOT EXISTS waitlist (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT NOT NULL UNIQUE COLLATE NOCASE,
    source TEXT NOT NULL DEFAULT 'landing-page',
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
  )
`)
const insertEmail = db.prepare('INSERT OR IGNORE INTO waitlist (email, source) VALUES (?, ?)')
const emailSchema = z.object({
  email: z.string().trim().email().max(254),
  source: z.string().trim().max(80).optional().default('landing-page')
}).strict()

app.disable('x-powered-by')
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
      fontSrc: ["'self'", 'https://fonts.gstatic.com', 'data:'],
      imgSrc: ["'self'", 'data:'],
      connectSrc: ["'self'"],
      objectSrc: ["'none'"],
      frameAncestors: ["'none'"],
      upgradeInsecureRequests: process.env.NODE_ENV === 'production' ? [] : null
    }
  },
  crossOriginEmbedderPolicy: false
}))
const allowedOrigin = process.env.CLIENT_ORIGIN
if (allowedOrigin) app.use(cors({ origin: allowedOrigin, methods: ['GET', 'POST'], allowedHeaders: ['Content-Type'] }))
app.use(express.json({ limit: '10kb', strict: true }))
app.use('/api/', rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 30,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  message: { error: 'Too many requests. Please wait a little and try again.' }
}))

app.get('/api/health', (_req, res) => res.json({ status: 'ok' }))

app.post('/api/waitlist', (req, res) => {
  const parsed = emailSchema.safeParse(req.body)
  if (!parsed.success) {
    return res.status(400).json({ error: 'Enter a valid email address to join the waitlist.' })
  }
  const email = parsed.data.email.toLowerCase()
  try {
    const result = insertEmail.run(email, parsed.data.source || 'landing-page')
    if (result.changes === 0) {
      return res.status(200).json({ ok: true, message: 'You’re already on the list. We’ll be in touch.' })
    }
    return res.status(201).json({ ok: true, message: 'You’re on the list. We’ll be in touch.' })
  } catch (error) {
    console.error('Waitlist insert failed:', error.message)
    return res.status(500).json({ error: 'We couldn’t save your signup right now. Please try again later.' })
  }
} )

// Optional CSV export for the owner. Configure ADMIN_API_KEY before enabling public production use.
app.get('/api/admin/waitlist.csv', (req, res) => {
  const secret = process.env.ADMIN_API_KEY
  if (!secret) return res.status(404).json({ error: 'Not found' })
  if (req.get('authorization') !== `Bearer ${secret}`) return res.status(401).json({ error: 'Unauthorized' })
  const rows = db.prepare('SELECT email, source, created_at FROM waitlist ORDER BY id DESC').all()
  const csvCell = value => `"${String(value ?? '').replaceAll('"', '""')}"`
  const csv = ['email,source,created_at', ...rows.map(row => [row.email, row.source, row.created_at].map(csvCell).join(','))].join('\r\n')
  res.setHeader('Content-Type', 'text/csv; charset=utf-8')
  res.setHeader('Content-Disposition', 'attachment; filename="shairo-waitlist.csv"')
  res.send(csv)
})

if (process.env.NODE_ENV === 'production') {
  const dist = path.join(rootDir, 'dist')
  app.use(express.static(dist, { index: false, maxAge: '1h' }))
  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api/')) return next()
    res.sendFile(path.join(dist, 'index.html'))
  })
}

app.use((err, _req, res, _next) => {
  if (err instanceof SyntaxError && 'body' in err) return res.status(400).json({ error: 'Invalid JSON request.' })
  console.error('Unhandled server error:', err.message)
  res.status(500).json({ error: 'Unexpected server error.' })
})

const server = app.listen(port, () => console.log(`Shairo AI server listening on http://localhost:${port}`))
function shutdown() {
  server.close(() => { db.close(); process.exit(0) })
}
process.on('SIGINT', shutdown)
process.on('SIGTERM', shutdown)
