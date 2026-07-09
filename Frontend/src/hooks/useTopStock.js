import { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL, INTERNAL_API_TOKEN } from "../config";

export function useTopStock(date) {
  const [symbols, setSymbols] = useState([]);

  useEffect(() => {
    const fetchStock = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/stock/topstock/?date=${date}`,
          {
            headers: {
              "X-Internal-Token": INTERNAL_API_TOKEN,
              "Content-Type": "application/json",
            },
          }
        );
        setSymbols(response.data.map((stock) => stock.symbol));
      } catch (err) {
        console.error(
          "Error fetching top stock:",
          err.response ? err.response.data : err.message
        );
      }
    };

    fetchStock();
  }, [date]);

  return symbols;
}
