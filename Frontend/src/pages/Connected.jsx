import React from 'react';
import StockCarousel from '../components/Carousel'
import StockDatepicker from '../components/StockDatepicker';
import '../styles/main.css'
import '../styles/TopStock.css'
import '../styles/ConnectAccount.css'
import FetchTopStock from '../fetchComponents/FetchTopStock';
import { useNavigate } from 'react-router-dom';

const extra = {
  price: "$150",
};


function Connected() {
  const navigate = useNavigate();

  const handleClick = (e, linkType) => {
    e.preventDefault();
  
    if (linkType === 'disconnect') {
        window.open("https://app.alpaca.markets/connect/417db213be83cf52f1eea3401059d617", '_blank', 'noopener,noreferrer');
    } else if (linkType === 'connect') {
        navigate('/home')
    }
  };

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
              <p className="top-stock-description">ACCOUNT CONNECTED!<br></br> Your Alpaca account has been successfully connected to our sentiment analysis bot.
              The bot will now begin placing orders at 12pm every day that the stock market is open.</p>
          </div>
            </div>
          ))}
          </div>
          <div className='disconnect-button-container'>
              <button className='disconnect-button'onClick={(e) => handleClick(e, 'disconnect')}>Disconnect Account</button>
          </div>
          <div>
          <StockDatepicker/>
          </div>
          <div className='reconnect-account'>
            <p></p>Bot no longer making orders on your Alpaca account? 
            <button className='connect-account-button'onClick={(e) => handleClick(e, 'connect')}>Recconect it here!</button>
          </div>
      </div>
    );
}

export default Connected;