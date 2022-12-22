import * as React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import { logout } from '../../api/Auth';

const Navbar = () => {
    const navigate = useNavigate();

    const loginUser = (e: any) => {
        e.preventDefault();
        navigate('/login');
    };

    const registerUser = (e: any) => {
        e.preventDefault();
        navigate('/register');
    };

    const logoutUser = (e: any) => {
        e.preventDefault();
        logout().catch((err) => console.log(err));
        navigate('/home');
    };

    return (
        <nav className="flex align-center">
            <p>
                <span>Cinema</span>
            </p>
            <ul>
                <li>
                    <Link to="/home">Home</Link>
                    {localStorage.getItem("role") == "registered_user" && <Link to="/reservation">Reservation</Link>}
                    {!localStorage.getItem("token") && (
                        <button className="btn register" onClick={registerUser}>
                            Register
                        </button>
                    )}
                    {!localStorage.getItem("token") && (
                        <button className="btn login" onClick={loginUser}>
                            Log In
                        </button>
                    )}
                    {localStorage.getItem("token") && (
                        <button className="btn logout" onClick={logoutUser}>
                            Log Out
                        </button>
                    )}
                </li>
            </ul>
        </nav>
    );
};
export default Navbar;