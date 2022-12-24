import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, InputAdornment, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import interceptionAxios from '../../api/InterceptionAxios';
import backgroundImg from '../../assets/images/cinema.jpg';
import { useLocation } from 'react-router-dom';
import {cookieService} from "../../CookieService"
import jwt_decode from 'jwt-decode';
import './Reservation.css';
import Swal from 'sweetalert2';

const Reservation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [projections, setProjections] = useState([]);

  /* const config = {
      headers: { Authorization: `Bearer ${token.accessToken}` },
  }; */

  const initialItemState = {
      name: '',
      description: '',
      quantity: '',
      projectionId: '',
  };

  const [newTicket, setNewTicket] = useState(initialItemState);

  function filterProjections(projection: any) {
    return projection.movie_id === location.state.movieId;
  }

  function getProjectionById(projection: any) {
    return projection.id === newTicket.projectionId;
  }

  const getProjections = async () => {

    await interceptionAxios.get(`api/v1/cinema/movieprojections`).then((res: any) => {
      setProjections(res.data.filter(filterProjections));
    });
    return () => {
        //
    };
  };

  const makeReservation = async () => {
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
        const newReservation = {
          name: location.state.movieName, 
          price: 5.0,
          quantity: newTicket.quantity,
          movie_projection_id: newTicket.projectionId,
          user_id: decoded.user_identifier
        };
      
        const config = {
          headers: { "Authorization": `Bearer ${accessToken}` }
        };

        await interceptionAxios.post(`api/v1/cinema/tickets`, newReservation, config).then((res: any) => {
          const swalText = `<div style='color:whitesmoke'>You have successfully reserved <b>${newReservation.quantity}</b> tickets!</div>`;
          Swal.fire({
              title: `<div style='color:whitesmoke'>Thank you for your reservation!</div>`,
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

    navigate('/movies');

    return () => {
        //
    };
  };

  const onChangeHandler = (e: any) => {
      e.preventDefault();
      setNewTicket({ ...newTicket, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    getProjections();
  });

  return (
      <div>
          <div className="add-equipment-container" style={{ marginTop: '5%' }}>
              <div className="add-equipment-form">
                  <p className="signup-title">Reserve ticket for selected movie</p>
                  <p className="signup-text">Choose projection date and number of tickets for reservation</p>
                  <FormControl className="select-form">
                      <InputLabel id="label">Projection date</InputLabel>
                      <Select
                          id="outlined-basic"
                          label="Projection"
                          variant="outlined"
                          name="projectionId"
                          value={newTicket.projectionId}
                          onChange={onChangeHandler}
                      >
                        {projections.map((projection: any) => (
                          <MenuItem value={projection.id.toString()}>
                            {projection.start_time.substring(0, 10)}  &nbsp; &nbsp; {projection.start_time.substring(11, projection.start_time.length - 4)}
                          </MenuItem>
                        ))}
                      </Select>
                  </FormControl>
                  <TextField
                        className="input-field"
                        id="outlined-basic"
                        label="Price"
                        variant="outlined"
                        name="price"
                        value={"5 KM"}
                        InputProps={{
                            startAdornment: <InputAdornment position="start"></InputAdornment>,
                        }}
                    />
                  <TextField
                      required
                      className="input-field"
                      id="outlined-basic"
                      label="Number of tickets"
                      variant="outlined"
                      name="quantity"
                      type="number"
                      value={newTicket.quantity}
                      onChange={onChangeHandler}
                      InputProps={{
                          startAdornment: <InputAdornment position="start"></InputAdornment>,
                          inputProps: { min: 0, max: 50 },
                      }}
                  />
                  <Button className="equipment-button" variant="contained" onClick={makeReservation}>
                      Reserve
                  </Button>
              </div>
              <div className="equipment-background">
                  <img className="background-image" src={backgroundImg} alt="Background image" />
              </div>
          </div>
      </div>
  );
}

export default Reservation;