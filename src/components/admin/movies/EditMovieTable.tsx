import { useState, useEffect } from 'react';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, InputAdornment, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import interceptionAxios from '../../../api/InterceptionAxios';
import backgroundImg from '../../../assets/images/cinema.jpg';
import { useLocation } from 'react-router-dom';
import {cookieService} from "../../../CookieService"
import jwt_decode from 'jwt-decode';
import './EditMovieTable.css';
import Swal from 'sweetalert2';
import { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const EditMovieTable = () => {
  const navigate = useNavigate();
  const location = useLocation();


  /* const config = {
      headers: { Authorization: `Bearer ${token.accessToken}` },
  }; */

  const initialItemState = {
      title: location.state.title,
      description: location.state.description,
      genre: location.state.genre,
      releaseDate: new Date(),
      coverUrl: location.state.coverUrl
  };

  const [newMovie, setNewMovie] = useState(initialItemState);

  const [date, setDate] = useState(new Date());
  const [value, setValue] = React.useState<Dayjs | null>(null);

  const setReleaseDate = (releaseDate: any) => {
    setDate(releaseDate);
  };


  const editMovie = async () => {
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
        const decoded: any = jwt_decode(accessToken);
      
        const config = {
          headers: { "Authorization": `Bearer ${accessToken}` }
        };

        const editedMovie = {
            id: location.state.movieId,
            title: newMovie.title, 
            description: newMovie.description,
            genre: newMovie.genre,
            release_date: location.state.releaseDate,
            cover_url: newMovie.coverUrl
        };

        await interceptionAxios.put(`api/v1/cinema/movies/${location.state.movieId}`, editedMovie, config).then((res: any) => {
          const swalText = `<div style='color:whitesmoke'>You have successfully edited movie!</div>`;
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
    navigate('/movies/table');

    return () => {
        //
    };
  };

  const onChangeHandler = (e: any) => {
      console.log(e.target.value, e.target.name);
      e.preventDefault();
      setNewMovie({ ...newMovie, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    
  });

  return (
      <div>
          <div className="add-equipment-container" style={{ marginTop: '5%' }}>
              <div className="add-equipment-form">
                  <p className="signup-title">Edit movie</p>
                  <p className="signup-text">Edit movie's information</p>
                  <TextField
                        className="input-field"
                        id="outlined-basic"
                        label="Title"
                        variant="outlined"
                        name="title"
                        value={newMovie.title}
                        onChange={onChangeHandler}
                        InputProps={{
                            startAdornment: <InputAdornment position="start"></InputAdornment>,
                        }}
                    />
                    <TextField
                        className="input-field"
                        id="outlined-basic"
                        label="Description"
                        variant="outlined"
                        name="description"
                        value={newMovie.description}
                        onChange={onChangeHandler}
                        InputProps={{
                            startAdornment: <InputAdornment position="start"></InputAdornment>,
                        }}
                    />
                    <TextField
                        className="input-field"
                        id="outlined-basic"
                        label="Genre"
                        variant="outlined"
                        name="genre"
                        value={newMovie.genre}
                        onChange={onChangeHandler}
                        InputProps={{
                            startAdornment: <InputAdornment position="start"></InputAdornment>,
                        }}
                    />
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            className="picker"
                            label="Release date"
                            value={value}
                            disableFuture
                            onChange={(newValue: any) => {
                                setValue(newValue);
                                setReleaseDate(newValue)
                            }}
                            renderInput={(params: any) => <TextField {...params} />}
                        />
                    </LocalizationProvider>
                    <TextField
                        className="input-field"
                        id="outlined-basic"
                        label="Cover image url"
                        variant="outlined"
                        name="coverUrl"
                        value={newMovie.coverUrl}
                        onChange={onChangeHandler}
                        InputProps={{
                            startAdornment: <InputAdornment position="start"></InputAdornment>,
                        }}
                    />
                  <Button className="equipment-button" variant="contained" onClick={editMovie}>
                      Save
                  </Button>
              </div>
              <div className="equipment-background">
                  <img className="background-image" src={backgroundImg} alt="Background image" />
              </div>
          </div>
      </div>
  );
}

export default EditMovieTable;