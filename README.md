
  # GFG KARE Recruitment Site

  This project now includes a MongoDB-backed application flow so applicants can submit directly on the website instead of being redirected to Google Forms.

  ## Setup

  1. Copy [.env.example](.env.example) to `.env` and set `MONGODB_URI` to your MongoDB connection string.
  2. Run `npm i` to install dependencies.
  3. Run `npm run dev` to start the Vite frontend and the Express API together.

  ## Backend

  The API runs on port `4000` by default and exposes:

  1. `GET /api/health` for a quick health check.
  2. `GET /api/applications` to view saved submissions.
  3. `POST /api/applications` to save a new application.

  If you want to change the frontend or backend ports, update `CORS_ORIGIN` and `PORT` in `.env`.
  # Gfg_recruitment
