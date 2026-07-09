import StockCarousel from "./Carousel";
import ConnectAccount from "./ConnectAccount";
import StockDatepicker from "./StockDatepicker";
import StockOfDay from "./StockOfDay";
import "../styles/Main.css";
import "../styles/TopStock.css";

function MainContent() {
  return (
    <div className="mainContent">
      <h2 className="mainContent-title">Trending Stocks on r/wallstreetbets</h2>
      <StockCarousel />
      <div>
        <div className="top-stock">
          <StockOfDay />
          <p className="top-stock-description">
            LOG IN SUCCESSFUL!
            <br />
            Click the button below to connect your Alpaca account to your WSB Trader account
            and let our bot start trading for you today!
          </p>
        </div>
      </div>
      <ConnectAccount />
      <StockDatepicker />
    </div>
  );
}

export default MainContent;
