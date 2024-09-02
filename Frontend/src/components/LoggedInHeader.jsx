import { Link } from 'react-router-dom'
import '../styles/Header.css'
import { useNavigate } from 'react-router-dom';

function Header() {
    const navigate = useNavigate();

    const handleClick = async (e) => {
        e.preventDefault();
        try {
            navigate("/")
        }
        catch (error) {
            alert(error)
        }
    }

    return(
    <div className="header">
        <header>
        <h1 className="header-title">
            <span onClick={handleClick} style={{ cursor: 'pointer' }}>
                    WSB Trader
            </span>
            <Link to="/logout">
            <button className="logout-button">
            Log Out
            </button>
            </Link>
            </h1>
        </header>
    </div>
    );
}

export default Header