import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './CreateMovie.css'



//const axios = require('axios').default;


    const CreateMovie = () => {

        let movie = {
            title: '',
            description: '',
            genre: '',
            releaseDate: '',
        };

        function getTitle(val: any) {
            movie.title = val.target.value;
            console.warn(movie.title);
        }

        function getDescription(val: any) {
            movie.description = val.target.value;
            console.warn(movie.description);
        }

        function getGenre(val: any) {
            movie.genre = val.target.value;
            console.warn(movie.genre);
        }

        function getDate(val: any) {
            movie.releaseDate = val.target.value;
            console.warn(movie.releaseDate);
        }

        const sendPostRequest = async () => {
            //donation.user.id = parseInt(localStorage.getItem('currentUserId'));

            //axios.post('http://localhost:8080/donation/user/create', user );

            /*await axios.post('http://localhost:8080/donation/donations', donation ).then(function (response) {
                if(response.status == 200){
                    toast.info("Creating...", {
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
                    <h1>Movie create</h1>

                    <Box component="form" sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' }, }}>
                        <div className="formInputs">
                            <TextField label="Title" multiline onChange={getTitle} />
                        </div>
                        <div className="formInputs">
                            <TextField label="Release Date" multiline onChange={getDate} />
                        </div>
                        <div className="formInputs">
                            <TextField label="Description" onChange={getDescription} />
                        </div>
                        <div className="formInputs">
                            <TextField label="Genre" onChange={getGenre} />
                        </div>
                    </Box>

                    <div className="buttonSubmit">
                        <Button variant="contained" color="success" onClick={sendPostRequest}>Save</Button>
                        <ToastContainer />
                    </div>

                </div>
            </>
        );
    };

export default CreateMovie;