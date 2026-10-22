# Shairo AI — Launch Landing Page

A minimal black-and-white launch landing page for Shairo AI, with a live countdown to launch and an email waitlist.

## Stack

- React + Vite
- Tailwind CSS
- Express API
- SQLite waitlist storage

## Requirements

Node.js 20 or newer.

## Development

```bash
npm install
npm run dev
```

Vite runs the frontend locally. Start the API separately with `npm start` when testing the waitlist backend.

## Production build

```bash
npm run build
npm start
```

Configure `PORT` and `DATABASE_PATH` for your deployment environment as needed. See `.env.example` for supported environment variables.

## Tests

```bash
npm test
```

## Waitlist API

- `GET /api/health` — health status.
- `POST /api/waitlist` — subscribes an email address.

The landing page countdown is configured in `src/App.jsx` for **January 23, 2027, 12:00 AM India Standard Time (IST)**. Update that timestamp there when the launch date changes.
