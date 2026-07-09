import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN } from "../constants";
import { ALPACA_AUTH_URL } from "../config";
import "../styles/ConnectAccount.css";

function ConnectAccount() {
  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();
    const token = localStorage.getItem(ACCESS_TOKEN);

    if (token) {
      window.location.href = `${ALPACA_AUTH_URL}&state=${encodeURIComponent(token)}`;
    } else {
      console.error("No JWT token found in localStorage");
      navigate("/login");
    }
  };

  return (
    <div className="connect-account">
      <button className="connect-account-button" onClick={handleClick}>
        Connect Your Account
      </button>
    </div>
  );
}

export default ConnectAccount;
