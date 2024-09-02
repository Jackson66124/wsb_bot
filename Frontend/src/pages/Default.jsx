import React from 'react';
import StockCarousel from '../components/Carousel'
import StockDatepicker from '../components/StockDatepicker';
import '../styles/main.css'
import '../styles/Default.css'
import '../styles/TopStock.css'
import { Navigate, useNavigate } from 'react-router-dom';
import StockOfDay from '../components/StockOfDay';

const extra = {
  price: "$150",
  description: ' The stock above has been identified as today’s top stock by our sentiment analysis bot. Our bot leverages a deep learning model trained on real data from r/wallstreetbets. ' +
   'Click the button below to begin creating your account and connect it with Alpaca, allowing our bot to trade automatically on your behalf each day!'
};


function MainContent() {

    const navigate = useNavigate();

    const handleClick = (e) => {
        e.preventDefault();
        navigate('/login');
}
  return (
    <div className='mainContent'>
      <h2 className = "mainContent-title">
        Trending Stocks on r/wallstreetbets
      </h2>
      <StockCarousel/>
      <div>
        <div className="top-stock">
          <StockOfDay/>
            <p className="top-stock-description">The stock above has been identified as today’s top stock by our sentiment analysis bot. Our bot leverages a deep learning model trained on real data from r/wallstreetbets. 
            Click the button below to begin creating your account and connect it with Alpaca, allowing our bot to trade automatically on your behalf each day!</p>
        </div>
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
