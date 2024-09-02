import { useState, useEffect } from 'react';
import axios from 'axios';

export function FetchDatePickerStocks(date) {
    const [symbols, setSymbols] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = import.meta.env.VITE_INTERNAL_API_TOKEN;                
                const headers = {
                    'X-Internal-Token': token,
                    'Content-Type': 'application/json'
                };
        
                const url = `https://wsbbot-production.up.railway.app/stock/?date=${date}`;
                const response = await axios.get(url, { headers });
        
                const extractedSymbols = response.data.map(stock => stock.symbol);
                setSymbols(extractedSymbols);

            } catch (err) {
                console.error('Error fetching top stocks:', err.response ? err.response.data : err.message);
            }
        };

        fetchData();
    }, [date]);

    return { symbols };
}
