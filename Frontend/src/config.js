export const API_BASE_URL =
  import.meta.env.VITE_API_URL ?? "https://wsbbot-production.up.railway.app";

export const ALPACA_CLIENT_ID =
  import.meta.env.VITE_ALPACA_CLIENT_ID ?? "417db213be83cf52f1eea3401059d617";

export const ALPACA_REDIRECT_URI = `${API_BASE_URL}/callback/`;

export const ALPACA_AUTH_URL =
  `https://app.alpaca.markets/oauth/authorize?response_type=code` +
  `&client_id=${ALPACA_CLIENT_ID}&redirect_uri=${ALPACA_REDIRECT_URI}&scope=trading`;

export const ALPACA_DISCONNECT_URL =
  `https://app.alpaca.markets/connect/${ALPACA_CLIENT_ID}`;

export const FINNHUB_API_KEY = import.meta.env.VITE_FINNHUB_API_KEY;

export const INTERNAL_API_TOKEN = import.meta.env.VITE_INTERNAL_API_TOKEN;
