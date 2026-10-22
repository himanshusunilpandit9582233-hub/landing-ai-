# Shairo AI — Launch Landing Page

A responsive React + Tailwind CSS landing page for Shairo AI, with a live countdown to **23 January 2027 at 00:00 IST** and a working email waitlist backed by Express + SQLite.

## Requirements

- Node.js 20 or newer
- npm

## Run locally

```bash
npm install
cp .env.example .env
npm run dev
```

- Frontend: http://localhost:5173
- API: http://localhost:3000/api/health

The Vite development server proxies `/api` requests to the Express server on port 3000. This proxy is already configured in `vite.config.js`.

## Production

```bash
npm install
npm run build
NODE_ENV=production PORT=3000 npm start
```

Deploy as a Node.js web service with persistent disk storage. Set `DATABASE_PATH` to a writable persistent location and configure `CLIENT_ORIGIN` only if your frontend is hosted on a different origin. For a same-origin deployment, leave `CLIENT_ORIGIN` empty.

Set `ADMIN_API_KEY` to a long random secret if you need the protected CSV export:
`GET /api/admin/waitlist.csv` with `Authorization: Bearer YOUR_SECRET`.

## Countdown

The launch date is set in `src/App.jsx` as `2027-01-23T00:00:00+05:30`. This is a fixed timestamp (IST), not a rolling 90-day timer, so all visitors see the same launch moment. The UI recalculates once per second and handles the launch moment.

## Waitlist behavior

- Validates email in the browser and on the server.
- Normalizes email addresses to lowercase.
- Stores signups in SQLite with a unique constraint to prevent duplicates.
- Returns a friendly message for repeat signups.
- Includes API rate limiting, Helmet security headers, bounded JSON payloads, and optional CORS restriction.
- The signup endpoint does not send confirmation emails. Add an email provider (for example, Resend, Postmark, or SES) and verified sender domain if confirmation/launch emails are required.

## Notes before public launch

- Add a privacy policy and contact email with your real business details.
- Configure HTTPS and persistent database storage on the host.
- Back up the SQLite database, or migrate to managed PostgreSQL if you expect multiple instances/high signup volume.
- Test the waitlist API after deployment.
- Font loading uses Google Fonts; replace with self-hosted fonts if you want to avoid third-party font requests.
- The project is a source starter, not a claim that it has been deployed to a live domain.
