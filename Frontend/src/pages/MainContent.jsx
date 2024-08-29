import React from 'react';
import StockCarousel from '../components/Carousel'
import TopStock from '../components/StockOfTheDay'
import ConnectAccount from '../components/ConnectAccount';
import StockDatepicker from '../components/StockDatepicker';
import FetchStocks from '../components/FetchStocks';
import '../styles/main.css'

const extra = {
  price: "$150",
  description: ' has been identified as the top stock of the day by our sentiment analysis bot. Our bot uses a deep learning model that ' +
  'has been trained on real data from r/wallstreetbets. Click the button below to connect your alpaca account and let our bot start trading for ' +
  'you automatically, every day!'
};

function MainContent() {
const { topStock } = FetchStocks();
let top_stock = topStock;
  return (
    <div className='mainContent'>
      <h2 className = "mainContent-title">
        Trending Stocks on r/wallstreetbets
      </h2>
      <StockCarousel/>
      <div>
            <TopStock stock={top_stock} price={extra.price} description={extra.description} />
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
