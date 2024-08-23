import React from 'react'
import Slider from 'react-slick'
import Card from './Card'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

let stockTicker = ["AAPL", "TSLA", "AMZN", "GOOGL", "MSFT", "GME"]
let stockValue = [99, 89, 87, 66.45, 45.34, 23.21]

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
        <div className = 'container'>
        <Slider {...settings}>
          <div>
          <h3><Card stock={`$${stockTicker[0]}`} value={stockValue[0]} /></h3>
          </div>
          <div>
            <h3><Card stock={`$${stockTicker[1]}`} value={stockValue[1]} /></h3>
          </div>
          <div>
          <h3><Card stock={`$${stockTicker[2]}`} value={stockValue[2]} /></h3>
          </div>
          <div>
          <h3><Card stock={`$${stockTicker[3]}`} value={stockValue[3]} /></h3>
          </div>
          <div>
          <h3><Card stock={`$${stockTicker[4]}`} value={stockValue[4]} /></h3>
          </div>
          <div>
          <h3><Card stock={`$${stockTicker[5]}`} value={stockValue[5]} /></h3>
          </div>
        </Slider>
        </div>
      );
}

export default StockCarousel