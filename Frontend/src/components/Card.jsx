import '../styles/CarouselCard.css'
import React from 'react';
import { LineChart, Line, ResponsiveContainer, YAxis } from 'recharts';


function Card ({ stock, value, historicalData }) {

    const latestPrice = historicalData[historicalData.length - 1].price;
    const oldestPrice = historicalData[0].price;
    const lineColor = latestPrice >= oldestPrice ? "green" : "red";

    const minPrice = Math.min(...historicalData.map(data => data.price));
    const maxPrice = Math.max(...historicalData.map(data => data.price));

    return (
        <div className="stock-card">
          <h3 className="stock-ticker">{stock}</h3>
          <p>{value}</p>
          <div style={{ width: '100%', height: '75px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart className='line-chart' data={historicalData}>
              <YAxis domain={[minPrice, maxPrice]} axisLine={false} tick={false} />
                <Line 
                  type="monotone" 
                  dataKey="price" 
                  stroke={lineColor} 
                  strokeWidth={2} 
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      );
    }
    
    export default Card;