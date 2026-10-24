# Free deployment: Vercel (frontend) + Render (backend) + Neon (database)

## 1. Database: Neon
1. Create a free project at neon.tech.
2. Copy the connection string (`postgresql://...`). The backend converts it automatically.

## 2. Backend: Render
1. Push this project to GitHub.
2. Render -> New -> Blueprint -> select the repo (uses `render.yaml`).
3. Fill in the variables when asked:
   - `DATABASE_URL`: the Neon string
   - `ADMIN_PASSWORD`: choose a strong admin password (the admin login is created from this)
   - `CORS_ORIGINS` and `FRONTEND_URL`: your Vercel URL (add after step 3, then redeploy)
   - `GOOGLE_CLIENT_ID`, `ADMIN_GOOGLE_EMAILS`, `SMTP_*`: only if you use them
4. Open `https://<your-backend>.onrender.com/health`. You should see `{"status":"ok",...}`.

## 3. Frontend: Vercel
1. Import the repo. Root Directory: `frontend`. Preset: Vite.
2. Environment variables:
   - `VITE_API_URL` = your Render URL (no trailing slash)
   - `VITE_GOOGLE_CLIENT_ID` = same Google client ID (if used)
3. Deploy, then put the Vercel URL into `CORS_ORIGINS` and `FRONTEND_URL` on Render and redeploy.

## 4. Keep Render awake
Create a free monitor at uptimerobot.com (HTTP(s), every 5 min) on
`https://<your-backend>.onrender.com/health`.

## 5. Google login (only if used)
Add your Vercel URL under Authorized JavaScript origins in Google Cloud Console.

## Notes
- Do not commit `.env` files. Use the dashboards for secrets.
- Local Docker still works: `docker compose up --build -d`.
