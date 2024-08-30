import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"
import { useState } from "react"
import '../styles/Datepicker.css'
import { FetchDatePickerStocks } from "../fetchComponents/FetchDatePickerStocks";

function StockDatepicker() {
    const [selectedDate, setSelectedDate] = useState(null);
    const [apiDate, setApiDate] = useState(new Date().toISOString().split('T')[0]);
    const { symbols } = FetchDatePickerStocks(apiDate);


    const handleDateChange = (date) => {
        setSelectedDate(date);
        if (date) {
            const adjustedDate = new Date(date.getTime() - (date.getTimezoneOffset() * 60000));
            setApiDate(adjustedDate.toISOString().split('T')[0]);
        } else {
            setApiDate(null);
        }
    };
    
    const minDate = new Date("2024-08-30");
    const maxDate = new Date();

    return (
        <div className="stock-datepicker">
        <h1>Date Picker</h1>
        <DatePicker
        selected={selectedDate}
        onChange={handleDateChange}
        dateFormat="MM/dd/yyyy"
        minDate={minDate}
        maxDate={maxDate}
        />
        <ul className="datepicker-list">
            {symbols.map((symbol, index) => (
                <li key={index}>{symbol}</li>
            ))}
        </ul>
        </div>
    );

}

export default StockDatepicker