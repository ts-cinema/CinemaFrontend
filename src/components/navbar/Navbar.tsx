import * as React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import IconButton from "@material-ui/core/IconButton";
import PersonIcon from '@material-ui/icons/Person';

const Navbar = () => {
    const navigate = useNavigate();

    const loginUser = (e: any) => {
        e.preventDefault();
        navigate('/login');
    };

    return (
        <nav className="flex align-center">
            <p>
                <span>Cinema</span>
            </p>
            <ul>
                <li>
                    <Link to="/home">Home</Link>
                    <Link to="/login">Login</Link>
                    <Link to="/register">Register</Link>
                    <Link to="/movies">Movies</Link>
                    <Link to="/profile">
                        <IconButton ><PersonIcon /></IconButton>
                    </Link>
                </li>
            </ul>
        </nav>
    );
};
export default Navbar;