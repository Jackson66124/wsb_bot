import Form from '../components/Form'
import { Link } from 'react-router-dom';
import "../styles/Form.css"

function Login() {
    return (
    <div>
        <Form route="token/" method="login"/>
        <div className='login-redirect'>
            <p>Do you need to create an account? <Link to="/create">Click here!</Link></p>
        </div>
    </div>
);    
}

export default Login