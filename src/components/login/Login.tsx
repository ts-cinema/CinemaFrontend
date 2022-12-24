import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import { FiLogIn } from 'react-icons/fi';
import { useNavigate, useLocation } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import { cookieService } from '../../CookieService';
import Swal from "sweetalert2";

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
                if (response.data.accessToken) {
                    const accessToken = response.data.accessToken;
                    cookieService.setCookie(JSON.stringify({ token: accessToken }), 30);
                    navigate(from, { replace: true });
                }
            })
            .catch((err: any) => {
                const swalText = `<div style='color:whitesmoke'>You are unable to perform this action!</div>`;
                Swal.fire({
                    title: `<div style='color:whitesmoke'>An error occured!</div>`,
                    html: swalText,
                    icon: "error",
                    backdrop: true,
                    showConfirmButton: true,
                    confirmButtonColor: "#eb0028",
                    focusConfirm: false,
                    background: "#2C2C2C",
                });
            });
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