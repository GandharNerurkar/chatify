# Chatify

A full-stack real-time chat application built with React, Node.js, Express, MongoDB, and Socket.IO.

## Live Demo

https://chatiffyyy.vercel.app/

## Tech Stack

### Frontend
- React (Vite)
- Tailwind CSS + DaisyUI
- Zustand
- Axios
- Framer Motion
- Socket.IO Client

### Backend
- Node.js + Express
- MongoDB + Mongoose
- Socket.IO
- JWT Authentication
- Cloudinary (media uploads)
- Resend (emails)
- Arcjet (security/rate limiting)

## Project Structure

```text
chatify-master/
  backend/
  frontend/
```

## Prerequisites

- Node.js 20+
- npm
- MongoDB database (Atlas or local)

## Environment Variables

Create `backend/.env` with the following keys:

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
NODE_ENV=development
JWT_SECRET=your_jwt_secret
CLIENT_URL=http://localhost:5173

RESEND_API_KEY=your_resend_api_key
EMAIL_FROM=onboarding@resend.dev
EMAIL_FROM_NAME=Chatify

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

ARCJET_KEY=your_arcjet_key
ARCJET_ENV=development
```

## Installation

From the project root:

```bash
npm install --prefix backend
npm install --prefix frontend
```

## Run Locally

Run backend:

```bash
npm run dev --prefix backend
```

Run frontend (in a second terminal):

```bash
npm run dev --prefix frontend
```

- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:3000/api`

## Production Commands

Build (installs deps + builds frontend):

```bash
npm run build
```

Start backend:

```bash
npm start
```

## Notes

- Keep all secrets in `.env` and never commit real credentials.
- Frontend API base URL is set in `frontend/src/lib/axios.js`.
