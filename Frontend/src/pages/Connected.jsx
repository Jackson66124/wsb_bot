import React from 'react';
import StockCarousel from '../components/Carousel'
import StockDatepicker from '../components/StockDatepicker';
import '../styles/Main.css'
import '../styles/TopStock.css'
import '../styles/ConnectAccount.css'
import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import StockOfDay from '../components/StockOfDay';
import { ACCESS_TOKEN } from '../constants';


function Connected() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const jwtToken = searchParams.get('jwt');

    if (jwtToken) {
      localStorage.setItem(ACCESS_TOKEN, jwtToken)
      window.history.replaceState({}, document.title, "/connected");
    }
  })

  const handleClick = (e, linkType) => {
    e.preventDefault();
  
    if (linkType === 'disconnect') {
        window.open("https://app.alpaca.markets/connect/417db213be83cf52f1eea3401059d617", '_blank', 'noopener,noreferrer');
    } else if (linkType === 'connect') {
        navigate('/home')
    }
  };

    return (
      <div className='mainContent'>
        <h2 className = "mainContent-title">
          Trending Stocks on r/wallstreetbets
        </h2>
        <StockCarousel/>
        <div>
          <div className="top-stock">
            <StockOfDay/>
              <p className="top-stock-description">ACCOUNT CONNECTED!<br></br> Your Alpaca account has been successfully connected to our sentiment analysis bot.
              The bot will now begin placing orders at 12pm every day that the stock market is open.</p>
          </div>
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