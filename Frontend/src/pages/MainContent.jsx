import React from 'react';
import StockCarousel from '../components/Carousel'
import TopStock from '../components/StockOfTheDay'
import ConnectAccount from '../components/ConnectAccount';
import StockDatepicker from '../components/StockDatepicker';
import '../styles/main.css'
import FetchTopStock from '../components/FetchTopStock';

const extra = {
  price: "$150",
  description: ' has been identified as the top stock of the day by our sentiment analysis bot. Our bot uses a deep learning model that ' +
  'has been trained on real data from r/wallstreetbets. Click the button below to connect your alpaca account and let our bot start trading for ' +
  'you automatically, every day!'
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
            <TopStock 
              stock={stock} 
              price={extra.price} 
              description={extra.description} 
            />
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
