import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useDatePickerStocks } from "../hooks/useDatePickerStocks";
import { getTradingDate } from "../utils/date";
import "../styles/Datepicker.css";
import "../styles/Connected.css";

function StockDatepicker() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [apiDate, setApiDate] = useState(getTradingDate());
  const symbols = useDatePickerStocks(apiDate);

  const handleClick = (e, stock) => {
    e.preventDefault();
    window.open(
      `https://www.nasdaq.com/market-activity/stocks/${stock}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    if (date) {
      const adjustedDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
      setApiDate(adjustedDate.toISOString().split("T")[0]);
    } else {
      setApiDate(null);
    }
  };

  return (
    <div className="stock-datepicker">
      <h1>Find Trending Stocks by Date on r/wallstreetbets</h1>
      <DatePicker
        selected={selectedDate}
        onChange={handleDateChange}
        dateFormat="MM/dd/yyyy"
        minDate={new Date("2024-09-03")}
        maxDate={new Date()}
      />
      <ul className="datepicker-list">
        {symbols.map((symbol, index) => (
          <li onClick={(e) => handleClick(e, symbol)} key={index}>
            ${symbol}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default StockDatepicker;
