import axios from "axios";
import { useState, useEffect } from "react";

  const FetchTrendingStocks = ( {date} ) => {
    const [symbols, setSymbols] = useState([]);

    useEffect(() => {
const fetchStocks = async () => {
    try {
        const token = import.meta.env.VITE_INTERNAL_API_TOKEN;      
        const headers = {
            'X-Internal-Token': token,
            'Content-Type': 'application/json'
        };

        const url = `http://127.0.0.1:8000/stock/?date=${date}`;
        const response = await axios.get(url, { headers });

        const extractedSymbols = response.data.map(stock => stock.symbol);
        setSymbols(extractedSymbols);

    } catch (err) {
        console.error('Error fetching top stocks:', err.response ? err.response.data : err.message);
    }
};

        fetchStocks();
    }, []);

    return { symbols };
};

export default FetchTrendingStocks;


