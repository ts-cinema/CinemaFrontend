import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button, FormControl, InputAdornment, InputLabel,OutlinedInput } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import interceptionAxios from '../../api/InterceptionAxios';
import { cookieService } from '../../CookieService';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Profile.css'
import { RiLockPasswordLine } from 'react-icons/ri';
import Swal from 'sweetalert2';
import { HiOutlineMail } from 'react-icons/hi';
import { useState } from 'react';

const EditProfile = () => {

    const navigate = useNavigate();
    const location = useLocation();

    const initialUserState = {
        email: location.state.email,
        current_password: '',
        new_password: ''
    };

    const [newUser, setNewUser] = useState(initialUserState);
    const [error, setError] = useState(false);

    const onChangeHandler = (e: any) => {
        e.preventDefault();
        setNewUser({ ...newUser, [e.target.name]: e.target.value });
    };

    const editProfile = async() => {
        const accessToken = cookieService.getCookie()?.token;
        if (accessToken == null) {
          const swalText = `<div style='color:whitesmoke'>You don't have permissions to perform this action!</div>`;
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
        }
        else {          
            const config = {
              headers: { "Authorization": `Bearer ${accessToken}` }
            };
    
            const changedInfo = {
                email: newUser.email,
                current_password: newUser.current_password,
                new_password: newUser.new_password
            };
    
            await interceptionAxios.post(`api/v1/cinema/users/change-info`, changedInfo, config).then((res: any) => {
                const swalText = `<div style='color:whitesmoke'>You have successfully edited your profile!</div>`;
                Swal.fire({
                    title: `<div style='color:whitesmoke'>Success!</div>`,
                    html: swalText,
                    icon: "success",
                    backdrop: true,
                    showConfirmButton: true,
                    confirmButtonColor: "#eb0028",
                    focusConfirm: false,
                    background: "#2C2C2C",
                });
          }).catch((error: any) => {
            if (error?.response?.code !== 201) {
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
            }
          });
        }
        navigate('/profile');
    }

 
    return (
        <>
          <div>
              <h1>Edit Profile Information</h1>
  
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
                        label="Current password"
                        type="password"
                        name="current_password"
                        value={newUser.current_password}
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
                        label="New password"
                        type="password"
                        name="new_password"
                        value={newUser.new_password}
                        onChange={onChangeHandler}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <RiLockPasswordLine />
                                </InputAdornment>
                            ),
                        }}
                    />
  
              <div className="buttonSubmit">
                  <Button variant="contained" color="primary" onClick={editProfile}>Save</Button>
                  <ToastContainer/>
              </div>
  
          </div>
          </>
      );
}
export default EditProfile;