# Pastebin Lite

A lightweight Pastebin-style service built using Next.js App Router.

This project was implemented as part of a take-home assignment, focusing on
API correctness, backend validation, and clean architecture.

---

## 🚀 Live Demo

https://pastebin-lite-woad-three.vercel.app

---

## 🧩 Features

- Create text pastes via REST API
- Optional expiry time (TTL)
- Optional maximum view limit
- Server-side enforcement of expiry and view limits
- Clean and minimal UI for viewing pastes
- Backend-first design

---

## 🔧 Tech Stack

- Next.js (App Router)
- TypeScript
- Upstash Redis (KV storage)
- Vercel (deployment)

---

## 📡 API Endpoints

### Health Check

GET /api/healthz

Response:
```json
{ "status": "ok" }


Create Paste

POST /api/pastes
{
  "content": "Hello world",
  "expires_in": 60,
  "max_views": 2
}

Response:
{
  "id": "<paste_id>",
  "url": "/p/<paste_id>"
}

View Paste
/p/:id

⏱ Expiry & View Limit Behavior
If a paste is expired → returns 404
If max views are exhausted → returns 404
All rules are enforced server-side

🔐 Environment Variables
KV_REST_API_URL=...
KV_REST_API_TOKEN=...
