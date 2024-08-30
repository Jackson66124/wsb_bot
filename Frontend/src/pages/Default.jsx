import React from 'react';
import StockCarousel from '../components/Carousel'
import StockDatepicker from '../components/StockDatepicker';
import '../styles/main.css'
import '../styles/Default.css'
import '../styles/TopStock.css'
import FetchTopStock from '../fetchComponents/FetchTopStock';
import { Navigate, useNavigate } from 'react-router-dom';

const extra = {
  price: "$150",
  description: ' has been identified as today’s top stock by our sentiment analysis bot. Our bot leverages a deep learning model trained on real data from r/wallstreetbets. ' +
   'Click the button below to begin creating your account and connect it with Alpaca, allowing our bot to trade automatically on your behalf each day!'
};


function MainContent() {

    const navigate = useNavigate();

    const handleClick = (e) => {
        e.preventDefault();
        navigate('/login');
}
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
            <p className="top-stock-description">{stock + extra.description}</p>
        </div>
          </div>
        ))}
        </div>
        <div className='default-button-container'>
            <button className='default-button'onClick={handleClick}>Log In</button>
        </div>
        <div>
        <StockDatepicker/>
        </div>
    </div>
  );
}

export default MainContent;
