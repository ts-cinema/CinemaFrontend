import { useState } from 'react';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, InputAdornment, Snackbar, Alert } from '@mui/material';
import { FiUser, FiPhone, FiUserPlus } from 'react-icons/fi';
import { HiOutlineMail, HiOutlineLocationMarker } from 'react-icons/hi';
import { RiLockPasswordLine } from 'react-icons/ri';
import { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import backgroundImg from '../../assets/images/cinema.jpg';
import { signUp } from '../../api/Auth';

import './Register.css';

const Register = () => {
    const navigate = useNavigate();
    const [signUpCompleted, setSignUpCompleted] = useState(false);
    const [date, setDate] = useState(new Date());
    const [value, setValue] = React.useState<Dayjs | null>(null);

    const initialUserState = {
        name: '',
        birth_date: new Date(),
        address: '',
        email: '',
        password: '',
        confirm_password: '' 
    };

    const [newUser, setNewUser] = useState(initialUserState);

    const onChangeHandler = (e: any) => {
        e.preventDefault();
        setNewUser({ ...newUser, [e.target.name]: e.target.value });
    };

    const onSignUpHandler = async (e: any) => {
        e.preventDefault();
        console.log("Value " + date)
        newUser.birth_date = date;

        signUp(newUser)
            .then(response => {
                if (response.status === 200) {
                    setNewUser({ ...initialUserState });
                    setSignUpCompleted(true);
                    setTimeout(() => {
                        navigate("/login")
                    }, 3000);
                }
            })
            .catch(err => console.log(err))
    };

    const setBirthDate = (birthDate: any) => {
        setDate(birthDate);
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
                        label="Name"
                        variant="outlined"
                        name="name"
                        value={newUser.name}
                        onChange={onChangeHandler}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <FiUser />
                                </InputAdornment>
                            ),
                        }}
                    />
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            className="picker"
                            label="Birth date"
                            value={value}
                            disableFuture
                            onChange={(newValue: any) => {
                                setValue(newValue);
                                setBirthDate(newValue)
                            }}
                            renderInput={(params: any) => <TextField {...params} />}
                        />
                    </LocalizationProvider>
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
                        name="password"
                        value={newUser.password}
                        onChange={onChangeHandler}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <RiLockPasswordLine />
                                </InputAdornment>
                            ),
                        }}
                    />
                    <TextField
                        className="input-field"
                        id="outlined-password-input"
                        label="Confirm password"
                        type="password"
                        name="confirm_password"
                        value={newUser.confirm_password}
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