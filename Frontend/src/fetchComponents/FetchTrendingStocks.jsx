import axios from "axios";
import { useState, useEffect } from "react";

  const FetchTrendingStocks = ( {date} ) => {
    const [symbols, setSymbols] = useState([]);

    useEffect(() => {
        const fetchStocks = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/stock/?date=${date}`);
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


