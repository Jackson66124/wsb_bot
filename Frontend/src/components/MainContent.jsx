import React from 'react';
import StockCarousel from '../components/Carousel'
import ConnectAccount from '../components/ConnectAccount';
import StockDatepicker from '../components/StockDatepicker';
import '../styles/main.css'
import '../styles/TopStock.css'
import FetchTopStock from '../fetchComponents/FetchTopStock';

const extra = {
  price: "$150",
  description: 'LOG IN SUCCSESFUL! Click the button below to connect your alpaca account to your WSB Trader account and let our bot start trading for you today!'
};

function MainContent() {
const { symbol } = FetchTopStock();
let top_stock = symbol;
  return (
    <div className='mainContent'>
      <h2 className = "mainContent-title">
        Trending Stocks on r/wallstreetbets
      </h2>
      <StockCarousel/>
      <div>
      {top_stock.map((stock, index) => (
          <div key={index}>
          <div className="top-stock">
            <h2>Top Stock of the Day</h2>
            <h3 className="top-stock-ticker">{stock}</h3>
            <p className="top-stock-price">{extra.price}</p>
            <p className="top-stock-description">LOG IN SUCCESSFUL!<br></br>Click the button below to connect your Alpaca account
               to your WSB Trader account and let our bot start trading for you today!</p>
        </div>
          </div>
        ))}
        </div>
        <div>
      <ConnectAccount/>
        </div>
        <div>
        <StockDatepicker/>
        </div>
    </div>
  );
}

export default MainContent;
