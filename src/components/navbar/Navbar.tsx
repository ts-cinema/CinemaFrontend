import * as React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
<<<<<<< HEAD
import IconButton from "@material-ui/core/IconButton";
import PersonIcon from '@material-ui/icons/Person';
=======
import { logout } from '../../api/Auth';
>>>>>>> 48570423701c2c7a8f6ad48cc433e84b66466a8b

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
<<<<<<< HEAD
                    <Link to="/login">Login</Link>
                    <Link to="/register">Register</Link>
                    <Link to="/movies">Movies</Link>
                    <Link to="/profile">
                        <IconButton ><PersonIcon /></IconButton>
                    </Link>
=======
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
>>>>>>> 48570423701c2c7a8f6ad48cc433e84b66466a8b
                </li>
            </ul>
        </nav>
    );
};
export default Navbar;