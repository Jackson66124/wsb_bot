import React from 'react';
import StockCarousel from '../components/Carousel'
import TopStock from '../components/StockOfTheDay'
import ConnectAccount from '../components/ConnectAccount';
import StockDatepicker from '../components/StockDatepicker';
import '../styles/main.css'

const topStock = {
  stock: "AAPL",
  price: "$150",
  description: 'Apple has been identified as the top stock of the day by our sentiment analysis bot. Our bot uses a deep learning model that ' +
  'has been trained on real data from r/wallstreetbets. Click the button below to connect your alpaca account and let our bot start trading for ' +
  'you automatically, every day!'
};

function MainContent() {

  return (
    <div className='mainContent'>
      <h2 className = "mainContent-title">
        Trending Stocks on r/wallstreetbets
      </h2>
      <StockCarousel/>
      <div>
            <TopStock stock={topStock.stock} price={topStock.price} description={topStock.description} />
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
