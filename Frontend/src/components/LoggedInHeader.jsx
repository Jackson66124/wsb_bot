import { Link, useNavigate } from "react-router-dom";
import "../styles/Header.css";

function LoggedInHeader() {
  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();
    navigate("/");
  };

  return (
    <div className="header">
      <header>
        <h1 className="header-title">
          <span onClick={handleClick} style={{ cursor: "pointer" }}>
            WSB Trader
          </span>
          <Link to="/logout">
            <button className="logout-button">Log Out</button>
          </Link>
        </h1>
      </header>
    </div>
  );
}

export default LoggedInHeader;
