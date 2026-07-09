# WSB Trader Frontend

React + Vite app for the WSB sentiment trading bot.

## Setup

```bash
npm install
npm run dev
```

## Environment Variables

Create a `.env` file in this folder:

```
VITE_API_URL=http://localhost:8000
VITE_FINNHUB_API_KEY=your_key
VITE_INTERNAL_API_TOKEN=your_token
```

`VITE_API_URL` falls back to the production Railway URL if not set.

## Scripts

- `npm run dev` — local dev server
- `npm run build` — production build
- `npm run lint` — ESLint
