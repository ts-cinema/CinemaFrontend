import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import { FiLogIn } from 'react-icons/fi';

import './Login.css';

import backgroundImg from '../../assets/images/cinema.jpg';

const Login = () => {

    const [user, setUser] = useState({
        email: '',
        password: '',
    });

    const onChangeHandler = (e: any) => {
        e.preventDefault();
        setUser({ ...user, [e.target.name]: e.target.value });
    };
    
    return (
        <div>
            <div className="login-container">
                <div className="login-form">
                    <p className="login-title">Sign in</p>
                    <p className="login-text">Sign in to access your account</p>
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
                        startIcon={<FiLogIn />}
                    >
                        Sign in
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