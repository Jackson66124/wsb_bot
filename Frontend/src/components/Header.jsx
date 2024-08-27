import { Link } from 'react-router-dom'
import '../styles/header.css'

function Header() {

    return(
    <div className="header">
        <header>
            <h1 className="header-title"><Link to='/' style={{ textDecoration: 'none', color: 'inherit' }}>WSB Trader</Link>
                    <Link to="/login">
                    <button className="login-button">
                    Log In
                  </button>
                  </Link>
                    </h1>
        </header>
    </div>
    );
}

export default Header