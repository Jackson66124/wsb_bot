import axios from "axios";
import { FINNHUB_API_KEY } from "../config";

export async function fetchStockQuote(symbol) {
  try {
    const response = await axios.get(
      `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${FINNHUB_API_KEY}`
    );
    return { symbol, ...response.data };
  } catch (error) {
    console.error(`Error fetching data for ${symbol}:`, error);
    return null;
  }
}
