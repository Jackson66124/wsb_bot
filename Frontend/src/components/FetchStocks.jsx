import { useEffect, useState } from 'react';
import axios from 'axios';

const FetchStocks = () => {
    const [topTickers, setTopTickers] = useState([])
    const [topStock, setTopStock] = useState([]);
  
    useEffect(() => {
        axios.get('http://127.0.0.1:8000/top-stocks/', )
          .then(response => {
              const { top_tickers, top_stock } = response.data;
              setTopTickers(top_tickers);
              setTopStock(top_stock);
          })
          .catch(error => {
              console.error('Error fetching top stocks:', error);
          });
  }, []);
  return { topTickers, topStock };

  };

export default FetchStocks