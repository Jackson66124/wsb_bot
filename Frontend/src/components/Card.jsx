import '../styles/CarouselCard.css'

function Card ({ stock, value }) {

    return (
        <div className="stock-card">
            <h3 className="stock-ticker">{stock}</h3>
            <p>{value}</p>
        </div>
    );
}

export default Card;