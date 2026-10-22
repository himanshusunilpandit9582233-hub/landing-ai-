// Smoke-test checklist for manual verification after starting the server:
// 1. GET /api/health returns { "status": "ok" }.
// 2. POST /api/waitlist with {"email":"valid@example.com"} returns 201.
// 3. Repeating the same email (different letter case) returns 200 and does not duplicate.
// 4. Invalid email returns 400.
// 5. More than the configured API request limit returns 429.
// 6. With ADMIN_API_KEY set, CSV export requires the matching Bearer token.
