import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, InputAdornment, Snackbar, Alert } from '@mui/material';
import { FiUser, FiPhone, FiUserPlus } from 'react-icons/fi';
import { HiOutlineMail, HiOutlineLocationMarker } from 'react-icons/hi';
import { RiLockPasswordLine } from 'react-icons/ri';

import backgroundImg from '../../assets/images/cinema.jpg';

import './Register.css';

const Register = () => {
    const navigate = useNavigate();
    const [signUpCompleted, setSignUpCompleted] = useState(false);

    const initialUserState = {
        firstName: '',
        lastName: '',
        phoneNumber: '',
        address: '',
        email: '',
        passwordHash: ''
    };

    const [newUser, setNewUser] = useState(initialUserState);

    const onChangeHandler = (e: any) => {
        e.preventDefault();
        setNewUser({ ...newUser, [e.target.name]: e.target.value });
    };

    const onSignUpHandler = async (e: any) => {
        e.preventDefault();
    };

    return (
        <div>
            <div className="signup-container">
                <div className="signup-form">
                    <p className="signup-title">Register</p>
                    <p className="signup-text">Enter information and create your account</p>
                    <TextField
                        className="input-field"
                        id="outlined-basic"
                        label="First name"
                        variant="outlined"
                        name="firstName"
                        value={newUser.firstName}
                        onChange={onChangeHandler}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <FiUser />
                                </InputAdornment>
                            ),
                        }}
                    />
                    <TextField
                        className="input-field"
                        id="outlined-basic"
                        label="Last name"
                        variant="outlined"
                        name="lastName"
                        value={newUser.lastName}
                        onChange={onChangeHandler}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <FiUser />
                                </InputAdornment>
                            ),
                        }}
                    />
                    <TextField
                        className="input-field"
                        id="outlined-basic"
                        label="Phone number"
                        variant="outlined"
                        name="phoneNumber"
                        value={newUser.phoneNumber}
                        onChange={onChangeHandler}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <FiPhone />
                                </InputAdornment>
                            ),
                        }}
                    />
                    <TextField
                        className="input-field"
                        id="outlined-basic"
                        label="Address"
                        variant="outlined"
                        name="address"
                        value={newUser.address}
                        onChange={onChangeHandler}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <HiOutlineLocationMarker />
                                </InputAdornment>
                            ),
                        }}
                    />
                    <TextField
                        className="input-field"
                        id="outlined-basic"
                        label="Email"
                        variant="outlined"
                        name="email"
                        value={newUser.email}
                        onChange={onChangeHandler}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <HiOutlineMail />
                                </InputAdornment>
                            ),
                        }}
                    />
                    <TextField
                        className="input-field"
                        id="outlined-password-input"
                        label="Password"
                        type="password"
                        name="passwordHash"
                        value={newUser.passwordHash}
                        onChange={onChangeHandler}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <RiLockPasswordLine />
                                </InputAdornment>
                            ),
                        }}
                    />
                    <Button
                        className="signup-button"
                        variant="contained"
                        onClick={onSignUpHandler}
                        startIcon={<FiUserPlus />}
                    >
                        Register
                    </Button>
                </div>
                <div className="signup-background">
                    <img className="background-image" src={backgroundImg} alt="Background image" />
                    <Snackbar
                        open={signUpCompleted}
                        autoHideDuration={2000}
                        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                    >
                        <Alert variant="filled" severity="success" sx={{ width: '100%' }}>
                            Sign up successfully completed!
                        </Alert>
                    </Snackbar>
                </div>
            </div>
        </div>
    );
};

export default Register;