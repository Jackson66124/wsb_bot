import { useState, useEffect } from 'react';
import axios from 'axios';

export function FetchDatePickerStocks(date) {
    const [symbols, setSymbols] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/stock/?date=${date}`);
                const extractedSymbols = response.data.map(stock => stock.symbol);
                setSymbols(extractedSymbols);
            } catch (err) {
                console.error('Error fetching top stocks:', err);
            } 
        };

        fetchData();
    }, [date]);

    return { symbols };
}
