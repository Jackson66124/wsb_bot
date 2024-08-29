import axios from "axios";
import { useState, useEffect } from "react";

const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  const FetchTrendingStocks = () => {
    const [symbols, setSymbols] = useState([]);

    useEffect(() => {
        const fetchStocks = async () => {
            try {
                const today = getTodayDate();
                const response = await axios.get(`http://127.0.0.1:8000/stock/?date=${today}`);
                const extractedSymbols = response.data.map(stock => stock.symbol);
                setSymbols(extractedSymbols);
            } catch (err) {
                console.error('Error fetching top stocks:', err);
            }};

        fetchStocks();
    }, []);

    return { symbols };
};

export default FetchTrendingStocks;


