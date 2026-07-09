import { useNavigate } from "react-router-dom";
import StockCarousel from "../components/Carousel";
import StockDatepicker from "../components/StockDatepicker";
import StockOfDay from "../components/StockOfDay";
import "../styles/Main.css";
import "../styles/Default.css";
import "../styles/TopStock.css";

function Default() {
  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();
    navigate("/login");
  };

  return (
    <div className="mainContent">
      <h2 className="mainContent-title">Trending Stocks on r/wallstreetbets</h2>
      <StockCarousel />
      <div>
        <div className="top-stock">
          <StockOfDay />
          <p className="top-stock-description">
            The stock above has been identified as today&apos;s top stock by our sentiment
            analysis bot. Our bot leverages a deep learning model trained on real data from
            r/wallstreetbets. Click the button below to begin creating your account and connect
            it with Alpaca, allowing our bot to trade automatically on your behalf each day!
          </p>
        </div>
      </div>
      <div className="default-button-container">
        <button className="default-button" onClick={handleClick}>
          Log In
        </button>
      </div>
      <StockDatepicker />
    </div>
  );
}

export default Default;
