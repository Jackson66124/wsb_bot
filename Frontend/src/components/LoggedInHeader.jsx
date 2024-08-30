import { Link } from 'react-router-dom'
import '../styles/header.css'

function Header() {

    return(
    <div className="header">
        <header>
            <h1 className="header-title"><Link to='/connected' style={{ textDecoration: 'none', color: 'inherit' }}>WSB Trader</Link>
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