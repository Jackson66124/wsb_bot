import React from 'react'
import Slider from 'react-slick'
import Card from './Card'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import '../styles/CarouselCard.css'
import FetchTrendingStocks from './FetchTrendingStocks'

let stockValue = [99, 89, 87, 66.45, 45.34, 23.21]
let historicalData = [
  { time: '09:30', price: 175.23 },
  { time: '10:30', price: 176.45 },
  { time: '11:30', price: 177.12 },
  { time: '12:30', price: 176.78 },
  { time: '13:30', price: 176.54 },
  { time: '14:30', price: 174.45 },
  { time: '15:30', price: 173.89 },
  { time: '16:00', price: 173.22 },
];

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

const StockCarousel = () => {
  const { symbols } = FetchTrendingStocks();
  let stockTicker = symbols;

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
            {stockTicker.map((ticker, index) => (
              <div key={index}>
                <Card 
                  stock={`$${ticker}`} 
                  value={stockValue[index]} 
                  historicalData={historicalData} 
                />
              </div>
            ))}
          </Slider>
        </div>
      );
}

export default StockCarousel