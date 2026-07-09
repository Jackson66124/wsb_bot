import { useEffect, useState } from "react";
import { useTopStock } from "../hooks/useTopStock";
import { fetchStockQuote } from "../services/finnhub";
import { getTradingDate } from "../utils/date";

function StockOfDay() {
  const today = getTradingDate();
  const symbols = useTopStock(today);
  const [stockData, setStockData] = useState([]);

  useEffect(() => {
    const loadStockData = async () => {
      const results = await Promise.all(symbols.map((symbol) => fetchStockQuote(symbol)));
      setStockData(results.filter((data) => data !== null));
    };

    if (symbols.length > 0) {
      loadStockData();
    }
  }, [symbols]);

  return (
    <div>
      {stockData.map((stock, index) => (
        <div key={index}>
          <div className="top-stock">
            <h2>Top Stock of the Day</h2>
            <h3 className="top-stock-ticker">{stock.symbol}</h3>
            <p className="top-stock-price">${stock.c}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default StockOfDay;
