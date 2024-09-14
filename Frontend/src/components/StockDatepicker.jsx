import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"
import { useState } from "react"
import '../styles/Datepicker.css'
import { FetchDatePickerStocks } from "../fetchComponents/FetchDatePickerStocks";
import '../styles/Connected.css'

const getDate = () => {
    const utc = new Date();
    const date = new Date(utc.getTime() -4 * 60 * 60 * 1000);
    const hours = new Date().getHours();
  if (hours < 12) {
    date.setDate(date.getDate() - 1);
  }
    return date.toISOString().split('T')[0];
  };

function StockDatepicker() {
    const [selectedDate, setSelectedDate] = useState(null);
    const [apiDate, setApiDate] = useState(getDate());
    const { symbols } = FetchDatePickerStocks(apiDate);

    const handleClick = (e, stock) => {
        e.preventDefault();
        window.open(`https://www.nasdaq.com/market-activity/stocks/${stock}`, '_blank', 'noopener,noreferrer');
    }

    const handleDateChange = (date) => {
        setSelectedDate(date);
        if (date) {
            const adjustedDate = new Date(date.getTime() - (date.getTimezoneOffset() * 60000));
            setApiDate(adjustedDate.toISOString().split('T')[0]);
        } else {
            setApiDate(null);
        }
    };
    
    const minDate = new Date("2024-09-03");
    const maxDate = new Date();

    return (
        <div className="stock-datepicker">
        <h1>Find Trending Stocks by Date on r/wallstreetbets</h1>
        <DatePicker
        selected={selectedDate}
        onChange={handleDateChange}
        dateFormat="MM/dd/yyyy"
        minDate={minDate}
        maxDate={maxDate}
        />
        <ul className="datepicker-list">
            {symbols.map((symbol, index) => (
                <li onClick={(e) => handleClick(e, symbol)} key={index}>${symbol}</li>
            ))}
        </ul>
        </div>
    );

}

export default StockDatepicker