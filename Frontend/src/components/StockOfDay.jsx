import FetchTopStock from '../fetchComponents/FetchTopStock';
import { useState, useEffect } from 'react';
import axios from 'axios';

const getStockData = async (symbol) => {
    const api_key = import.meta.env.VITE_FINNHUB_API_KEY  
    try {
        const response = await axios.get(`https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${api_key}`);
        const data = response.data;
        return { symbol, ...data }
    } catch (error) {
        console.error(`Error fetching data for ${symbol}:`, error)
        return null
    }
};

function StockOfDay() {
    const { symbol } = FetchTopStock();
    const [stockData, setStockData] = useState([]);
  
    useEffect(() => {
      const fetchStockData = async () => {
        const stockDataPromises = symbol.map(symbol => getStockData(symbol));
        const getData = await Promise.all(stockDataPromises);
        setStockData(getData.filter(data => data !== null));
      };
  
      fetchStockData();
    }, [symbol]);

    return (
        <div>
        {stockData.map((stock, index) => (
            <div key={index}>
            <div className="top-stock">
              <h2>Top Stock of the Day</h2>
              <h3 className="top-stock-ticker">{stock.symbol}</h3>
              <p className="top-stock-price">{'$' +stock.c}</p>
          </div>
            </div>
          ))}
          </div>
    )
}

export default StockOfDay