import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"
import { useState } from "react"
import '../styles/Datepicker.css'

function StockDatepicker() {
    const [selectedDate, setSelectedDate] = useState(null);

    const handleDateChange = (date) => {
        setSelectedDate(date)
    };

    const minDate = new Date("2024-07-09");
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
        </div>
    );

}

export default StockDatepicker