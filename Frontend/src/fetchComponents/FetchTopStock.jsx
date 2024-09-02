import { useEffect, useState } from 'react';
import axios from 'axios';

const FetchTopStock = () => {
    const [symbol, SetSymbol] = useState([]);

    useEffect(() => {
      const fetchStock = async () => {
        try {
            const token = import.meta.env.VITE_INTERNAL_API_TOKEN;
            const headers = {
                'X-Internal-Token': token,
                'Content-Type': 'application/json'
            };
    
            const url = `https://wsbbot-production.up.railway.app/stock/topstock/`;
            const response = await axios.get(url, { headers });
    
            const extractedSymbols = response.data.map(stock => stock.symbol);
            SetSymbol(extractedSymbols);
            
        } catch (err) {
            console.error('Error fetching top stocks:', err.response ? err.response.data : err.message);
        }
    };

        fetchStock();
  }, []);
    return { symbol };

  };


export default FetchTopStock;
