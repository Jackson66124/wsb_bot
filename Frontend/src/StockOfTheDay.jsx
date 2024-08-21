

import React from 'react';

function TopStock({ stock, price, description }) {
    return (
        <div className="top-stock">
            <h2>Top Stock of the Day</h2>
            <h3 className="top-stock-ticker">{stock}</h3>
            <p className="top-stock-price">{price}</p>
            <p className="top-stock-description">{description}</p>
        </div>
    );
}

export default TopStock;