import { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL, INTERNAL_API_TOKEN } from "../config";

export function useTrendingStocks(date) {
  const [symbols, setSymbols] = useState([]);

  useEffect(() => {
    const fetchStocks = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/stock/?date=${date}`, {
          headers: {
            "X-Internal-Token": INTERNAL_API_TOKEN,
            "Content-Type": "application/json",
          },
        });
        setSymbols(response.data.map((stock) => stock.symbol));
      } catch (err) {
        console.error(
          "Error fetching trending stocks:",
          err.response ? err.response.data : err.message
        );
      }
    };

    fetchStocks();
  }, [date]);

  return symbols;
}
