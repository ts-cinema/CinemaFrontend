import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './CreateMovie.css'

const EditMovie = () => {

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

    const getMovieRequest = async() => {
       /* console.warn("Saljem get movie request")
        let id = localStorage.getItem('movie')
        console.warn(id)
        await axios.get('http://localhost:8080/donation/' + id).then(function (response) {
            if(response.status == 200){
                toast.info("Getting...", {
                    position: toast.POSITION.BOTTOM_CENTER
                  });
            } 

            movie.title = response.data.payload.title
            movie.genre = response.data.payload.genre
            movie.releaseDate = response.data.payload.releaseDate
            movie.description = response.data.payload.description
        })*/
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
              <h1>Edit Movie</h1>
  
              <Box component="form" sx={{'& .MuiTextField-root': { m: 1, width: '25ch' },}}>
                  <div className="formInputs">
                      <TextField label = "Title" multiline onChange={getTitle}/>
                  </div>
                  <div className="formInputs">
                      <TextField label="Release Date" multiline onChange={getDate}/>
                  </div>
                  <div className="formInputs">
                      <TextField label="Genre" onChange={getGenre}/>
                  </div>
                  <div className="formInputs">
                      <TextField label="Description" onChange={getDescription}/>
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
export default EditMovie;