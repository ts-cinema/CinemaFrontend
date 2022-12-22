import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button, FormControl, InputAdornment, InputLabel,OutlinedInput } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Profile.css'

const EditProfile = () => {

    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);
  
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
    };

    let profile = {
        username: '',
        password: '',
        email: ''
    };

    function getUsername(val: any) {
        profile.username = val.target.value
    }

    function getPassword(val: any) {
        // za password sakriti sifru i slati mail za confirm????
        profile.password = val.target.value
    }

    function getEmail(val: any) {
        // submit email linkom? :(
        profile.email = val.target.value
    }

    const sendPutRequest = async() => {
      /*  await getMovieRequest();
        let id = localStorage.getItem('movie')
        await axios.put('http://localhost:8080/donation/update/' + id, donation ).then(function (response) {
            if(response.status == 200){
                toast.info("Updating...", {
                    position: toast.POSITION.BOTTOM_CENTER
                  });
            } 
        }).catch(function (error) {
            toast.error("Wrong info!", {
                position: toast.POSITION.BOTTOM_CENTER
              });
        
          });*/
    }

 
    return (
        <>
          <div>
              <h1>Edit Profile Information</h1>
  
              <Box component="form" sx={{'& .MuiTextField-root': { m: 1, width: '25ch' },}}>
                  <div className="formInputs">
                      <TextField label = "Username" multiline onChange={getUsername}/>
                  </div>
                  <div className="formInputs">
                      <TextField label="E-mail" multiline onChange={getEmail}/>
                  </div>
                  <div className="formInputs">
                    <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-password" onChange={getPassword}>Password</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password"
                            type={showPassword ? 'text' : 'password'}
                            endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                                >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                            }
                            label="Password"
                        />
                    </FormControl>
                  </div>
              </Box>
  
              <div className="buttonSubmit">
                  <Button variant="contained" color="primary" onClick={sendPutRequest}>Save</Button>
                  <ToastContainer/>
              </div>
  
          </div>
          </>
      );
}
export default EditProfile;