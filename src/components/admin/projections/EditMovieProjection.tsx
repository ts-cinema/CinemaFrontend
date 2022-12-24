import { useState, useEffect } from 'react';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, InputAdornment, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import interceptionAxios from '../../../api/InterceptionAxios';
import backgroundImg from '../../../assets/images/cinema.jpg';
import { useLocation } from 'react-router-dom';
import {cookieService} from "../../../CookieService"
import jwt_decode from 'jwt-decode';
import './../movies/EditMovieTable.css';
import Swal from 'sweetalert2';
import { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

const EditMovieProjection = () => {
  const navigate = useNavigate();
  const location = useLocation();


  /* const config = {
      headers: { Authorization: `Bearer ${token.accessToken}` },
  }; */

  const initialItemState = {
      start_time: new Date(),
      total_seats: location.state.totalSeats,
      available_seats: location.state.availableSeats,
      movie_id: ''
  };

  const [newProjection, setNewProjection] = useState(initialItemState);
  const [movies, setMovies] = useState([]);

  const [date, setDate] = useState(new Date());
  const [value, setValue] = React.useState<Dayjs | null>(null);

  const setProjectionDate = (projectionDate: any) => {
    setDate(projectionDate);
  };

  const getMovies = async () => {

    await interceptionAxios.get(`api/v1/cinema/movies`).then((res: any) => {
      setMovies(res.data);
    });
    return () => {
        //
    };
  };


  const editProjection = async () => {
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

        const modifiedProjection = {
            id: location.state.projectionId,
            start_time: new Date(date), 
            total_seats: newProjection.total_seats,
            available_seats: newProjection.available_seats,
            movie_id: location.state.movieId
        };

        console.log("Id " + location.state.projectionId);

        await interceptionAxios.put(`api/v1/cinema/movieprojections/${location.state.projectionId}`, modifiedProjection, config).then((res: any) => {
          const swalText = `<div style='color:whitesmoke'>You have successfully edited projection!</div>`;
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
    navigate('/projections/table');

    return () => {
        //
    };
  };

  const onChangeHandler = (e: any) => {
      console.log(e.target.value, e.target.name);
      e.preventDefault();
      setNewProjection({ ...newProjection, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    getMovies();
  });

  return (
      <div>
          <div className="add-equipment-container" style={{ marginTop: '5%' }}>
              <div className="add-equipment-form">
                  <p className="signup-title">Edit movie projection</p>
                  <p className="signup-text">Edit projection's information</p>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateTimePicker
                            className="picker"
                            label="Projection date"
                            value={value}
                            disablePast
                            onChange={(newValue: any) => {
                                setValue(newValue);
                                setProjectionDate(newValue)
                            }}
                            renderInput={(params: any) => <TextField {...params} />}
                        />
                    </LocalizationProvider>
                    <TextField
                        className="input-field"
                        id="outlined-basic"
                        label="Total number of seats"
                        variant="outlined"
                        name="total_seats"
                        type="number"
                        value={newProjection.total_seats}
                        onChange={onChangeHandler}
                        InputProps={{
                            startAdornment: <InputAdornment position="start"></InputAdornment>,
                            inputProps: { min: newProjection.available_seats, max: 50 },
                        }}
                    />
                    <TextField
                        className="input-field"
                        id="outlined-basic"
                        label="Number of available seats"
                        variant="outlined"
                        name="available_seats"
                        type="number"
                        value={newProjection.available_seats}
                        onChange={onChangeHandler}
                        InputProps={{
                            startAdornment: <InputAdornment position="start"></InputAdornment>,
                            inputProps: { min: 0, max: newProjection.total_seats },
                        }}
                    />
                  <Button className="equipment-button" variant="contained" onClick={editProjection}>
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

export default EditMovieProjection;