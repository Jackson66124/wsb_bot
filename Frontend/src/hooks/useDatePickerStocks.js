import { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL, INTERNAL_API_TOKEN } from "../config";

export function useDatePickerStocks(date) {
  const [symbols, setSymbols] = useState([]);

  useEffect(() => {
    if (!date) {
      setSymbols([]);
      return;
    }

    const fetchData = async () => {
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
          "Error fetching stocks by date:",
          err.response ? err.response.data : err.message
        );
      }
    };

    fetchData();
  }, [date]);

  return symbols;
}
