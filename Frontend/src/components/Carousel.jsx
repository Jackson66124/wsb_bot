import { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Card from "./Card";
import { useTrendingStocks } from "../hooks/useTrendingStocks";
import { fetchStockQuote } from "../services/finnhub";
import { getTradingDate } from "../utils/date";
import "../styles/CarouselCard.css";

function Arrow({ className, style, onClick }) {
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "black", borderRadius: "50%" }}
      onClick={onClick}
    />
  );
}

const sliderSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  initialSlide: 0,
  nextArrow: <Arrow />,
  prevArrow: <Arrow />,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

function StockCarousel() {
  const today = getTradingDate();
  const symbols = useTrendingStocks(today);
  const [stocksData, setStocksData] = useState([]);

  useEffect(() => {
    const loadStockData = async () => {
      const results = await Promise.all(symbols.map((symbol) => fetchStockQuote(symbol)));
      setStocksData(results.filter((data) => data !== null));
    };

    if (symbols.length > 0) {
      loadStockData();
    }
  }, [symbols]);

  const createHistoricalData = (stock) => [
    { price: stock.pc },
    { price: stock.o },
    { price: stock.l },
    { price: stock.h },
    { price: stock.c },
  ];

  return (
    <div className="carousel-container">
      <Slider {...sliderSettings}>
        {stocksData.map((stock, index) => (
          <div key={index}>
            <Card
              stock={`$${stock.symbol}`}
              value={`$${stock.c}`}
              historicalData={createHistoricalData(stock)}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default StockCarousel;
