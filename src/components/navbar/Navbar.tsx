import * as React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import { logout } from '../../api/Auth';
import {cookieService} from "../../CookieService"
import IconButton from "@material-ui/core/IconButton";
import PersonIcon from '@material-ui/icons/Person';

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
        navigate('/movies');
    };

    return (
        <nav className="flex align-center">
            <p>
                <span>Cinema</span>
            </p>
            <ul>
                <li>
                    <Link to="/movies">Movies</Link>
                    
                    {!cookieService.getCookie() && (
                        <button className="btn-nav register" onClick={registerUser}>
                            Register
                        </button>
                    )}

                    {cookieService.getCookie() != null && cookieService.isAdminUser(cookieService.getCookie().token) 
                         && <Link to="/users/table">User List</Link>}

                    {cookieService.getCookie() != null && cookieService.isAdminUser(cookieService.getCookie().token) 
                         && <Link to="/movies/table">Movie List</Link>}

                    {cookieService.getCookie() != null && cookieService.isAdminUser(cookieService.getCookie().token) 
                         && <Link to="/projections/table">Projection List</Link>}

                    {!cookieService.getCookie() && (
                        <button className="btn-nav login" onClick={loginUser}>
                            Log In
                        </button>
                    )}

                    {cookieService.getCookie() != null && cookieService.getCookie().token && cookieService.isRegisteredUser(cookieService.getCookie().token) && (
                        <Link to="/profile">
                        <IconButton ><PersonIcon /></IconButton>
                    </Link>
                    )}

                    {cookieService.getCookie() != null && cookieService.getCookie().token && (
                        <button className="btn-nav logout" onClick={logoutUser}>
                            Log Out
                        </button>
                    )}
                </li>
            </ul>
        </nav>
    );
};
export default Navbar;