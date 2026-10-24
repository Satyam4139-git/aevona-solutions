# Aevona website refresh

The original React/FastAPI application has been refreshed in place. Existing routes, email/password sign-in, Google OAuth, dashboard modules, and billing APIs remain part of the application.

## What changed

- A dark graphite, cyan, and lime visual system with Space Grotesk and DM Mono typography now applies across marketing, authentication, and dashboard screens.
- The public header includes direct contact links and a cost-estimator shortcut. The existing fraud notice is absent.
- Pointer-capable screens have an optional spring cursor, subtle particle trail, card spotlight/tilt, and an animated scroll-direction elevator. Page and card content enters in a staggered alternating motion as it crosses the viewport.
- Service and solution calls to action route through the existing login page and continue to dashboard billing after a successful password or Google sign-in.
- The dashboard billing view loads the actual current subscription and server-provided plans, and includes the supplied Birmingham contact details.
- The public portfolio now loads the published portfolio API when available, with the existing frontend list as an offline fallback. Backend startup seeds any missing brief-supplied portfolio items without replacing existing entries.
- The contact form now stores validated enquiries through `POST /api/contact`; a hidden honeypot drops automated submissions. The project estimator displays a directional range locally and opens a pre-filled email draft; it does not claim to save an estimate.

## Run locally

Follow `DEPLOYMENT.md` for full-stack setup. For the frontend, run `npm ci` and `npm run dev` inside `frontend/`. For the API, install `backend/requirements.txt`, configure `backend/.env` from `.env.example`, then run `uvicorn app.main:app --reload` from `backend/`.

The billing plans retain the server's existing Starter ($199/month), Professional ($799/month), Business ($1,999/month), and Enterprise (custom) amounts. The API persists plan selections but does not process a real card payment unless a payment provider is configured.
