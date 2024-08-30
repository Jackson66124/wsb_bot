import { Link } from 'react-router-dom'
import '../styles/header.css'
import { ACCESS_TOKEN } from '../constants';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Header() {
    const navigate = useNavigate();

    //set title to home or connected for connected users
    const handleClick = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem(ACCESS_TOKEN);
            const tokenCheckRes = await axios.get('http://127.0.0.1:8000/check-alpaca-token/', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (tokenCheckRes.data.has_alpaca_token) {
                navigate("/connected")
            } else {
                navigate("/home")
            }
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