import { useEffect, useState } from 'react';
import axios from 'axios';

const FetchTopStock = () => {
    const [symbol, SetSymbol] = useState([]);

    useEffect(() => {
        const fetchStock = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/stock/topstock/', );
                console.log(response);
                const extractedSymbol = response.data.map(stock => stock.symbol);
                console.log(extractedSymbol);
                SetSymbol(extractedSymbol)

            } catch (err) {
                console.error('Error fetching top stocks:', err);
                }};

        fetchStock();
  }, []);
    return { symbol };

  };


export default FetchTopStock;
