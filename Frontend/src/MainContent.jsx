import React from 'react';
import StockCarousel from './Carousel'
import TopStock from './StockOfTheDay'

const topStock = {
  stock: "AAPL",
  price: "$150",
  description: "Apple has been identified as the top stock of the day by our sentiment analysis bot."
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
    </div>
  );
}

export default MainContent;
