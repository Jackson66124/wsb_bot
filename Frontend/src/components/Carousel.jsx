import React, { useEffect, useState } from 'react'
import Slider from 'react-slick'
import Card from './Card'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import '../styles/CarouselCard.css'
import FetchTrendingStocks from '../fetchComponents/FetchTrendingStocks'
import axios from 'axios'

function Arrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", background: "black", borderRadius: "50%" }}
        onClick={onClick}
      />
    );
  }
 
  const getStockData = async (symbol) => {
    const api_key = import.meta.env.VITE_FINNHUB_API_KEY  
    try {
        const response = await axios.get(`https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${api_key}`);
        const data = response.data;
        return { symbol, ...data }
    } catch (error) {
        console.error(`Error fetching data for ${symbol}:`, error)
        return null
    }
};

const getDate = () => {
  const utc = new Date();
  const date = new Date(utc.getTime() - 4 * 60 * 60 * 1000);
  const hours = date.getHours();
if (hours < 12) {
  date.setDate(date.getDate() - 1);
}
  return date.toISOString().split('T')[0];
};

const StockCarousel = () => {
  const today = getDate();
  const { symbols } = FetchTrendingStocks({ date: today });
  const [stocksData, setStocksData] = useState([]);

  useEffect(() => {
    const fetchStockData = async () => {
      const stockDataPromises = symbols.map(symbol => getStockData(symbol));
      const stockData = await Promise.all(stockDataPromises);
      setStocksData(stockData.filter(data => data !== null));
    };

    fetchStockData();
  }, [symbols]);

  const createHistoricalData = (stock) => {
    return [
      { price: stock.pc }, 
      { price: stock.o },  
      { price: stock.l },   
      { price: stock.h },   
      { price: stock.c },   
    ];
  };

    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        initialSlide: 0,
        nextArrow: <Arrow/>,
        prevArrow: <Arrow/>,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1,
              infinite: true,
              dots: true
            }
          },
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
            }
          },
        ]
      };

      return (
        <div className='carousel-container'>
          <Slider {...settings}>
            {stocksData.map((stock, index) => (
              <div key={index}>
                <Card 
                  stock={`$${stock.symbol}`} 
                  value={'$' + stock.c} 
                  historicalData={createHistoricalData(stock)} 
                />
              </div>
            ))}
          </Slider>
        </div>
      );
}

export default StockCarousel