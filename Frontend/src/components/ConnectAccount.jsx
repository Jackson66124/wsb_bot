import '../styles/ConnectAccount.css'
import { ACCESS_TOKEN } from '../constants'
import { Navigate, useNavigate } from "react-router-dom";

const client_id = '417db213be83cf52f1eea3401059d617'
const redirect_uri = "https://wsbbot-production.up.railway.app/callback/"
const auth_url = `https://app.alpaca.markets/oauth/authorize?response_type=code&client_id=${client_id}&redirect_uri=${redirect_uri}&scope=trading`

const ConnectAccount = () => {
    const handleClick = (e) => {
        e.preventDefault();
        const token = localStorage.getItem(ACCESS_TOKEN);
        const auth_url_token = `${auth_url}&state=${encodeURIComponent(token)}`;
        if (token) {
            window.location.href = auth_url_token;
        } else {
            console.error("No JWT token found in localStorage");
            Navigate("/login")
        }
    };

    return (
        <div className="connect-account">
            <button className="connect-account-button" onClick={handleClick}>Connect Your Account</button>
        </div>
    );
}

export default ConnectAccount;