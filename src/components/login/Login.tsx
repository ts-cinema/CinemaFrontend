import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import { FiLogIn } from 'react-icons/fi';
import { useNavigate, useLocation } from 'react-router-dom';
import jwt_decode from 'jwt-decode';

import './Login.css';

import backgroundImg from '../../assets/images/cinema.jpg';
import { login } from '../../api/Auth';

const Login = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';

    const [user, setUser] = useState({
        email: '',
        password: '',
    });

    const onChangeHandler = (e: any) => {
        e.preventDefault();
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const onSignInHandler = async (e: any) => {
        e.preventDefault();
        login(user)
            .then((response) => {
                console.log("Response: " + response.data.accessToken);
                if (response.data.accessToken) {
                    const accessToken = response.data.accessToken;
                    const decoded: any = jwt_decode(accessToken);
                    const role = decoded?.role || '';
                    const user = decoded?.user_identifier || '';
                    localStorage.setItem('token', JSON.stringify(response.data.accessToken));
                    localStorage.setItem('user', user);
                    localStorage.setItem('role', role);
                    navigate(from, { replace: true });
                }
            })
            .catch((err) => console.log(err));
    };
    
    return (
        <div>
            <div className="login-container">
                <div className="login-form">
                    <p className="login-title">Log in</p>
                    <p className="login-text">Log in to access your account</p>
                    <TextField
                        className="input-field"
                        id="outlined-basic"
                        label="Email"
                        variant="outlined"
                        name="email"
                        value={user.email}
                        onChange={onChangeHandler}
                    />
                    <TextField
                        className="input-field"
                        id="outlined-password-input"
                        label="Password"
                        type="password"
                        name="password"
                        value={user.password}
                        onChange={onChangeHandler}
                    />
                    <Button
                        className="sign-in-button"
                        variant="contained"
                        onClick={onSignInHandler}
                        startIcon={<FiLogIn />}
                    >
                        Log in
                    </Button>
                </div>
                <div className="login-background">
                    <img className="background-image" src={backgroundImg} alt="Background image" />
                </div>
            </div>
        </div>
    );
};

export default Login;